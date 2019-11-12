import { SequelizeAdapter } from 'casbin-sequelize-adapter';
import { Adapter, Helper, Model } from 'casbin';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { CasbinRule } from '../model/CasbinRule';

class CasbinSequelizeAdapter implements Adapter {
    private option: SequelizeOptions;
    private sequelize: Sequelize;

    constructor(option: SequelizeOptions) {
        this.option = option;
    }

    /**
     * newAdapter is the constructor.
     * @param option sequelize connection option
     */
    public static async newAdapter(option: SequelizeOptions) {
        const a = new CasbinSequelizeAdapter(option);
        await a.open();

        return a;
    }

    private async open() {
        this.sequelize = new Sequelize(this.option);
        await this.sequelize.authenticate();
        this.sequelize.addModels([CasbinRule]);
        await this.createTable();
    }

    public async close() {
        await this.sequelize.close();
    }

    private async createTable() {
        await this.sequelize.sync();
    }

    private loadPolicyLine(line: CasbinRule, model: Model) {
        const result =
            line.ptype +
            ', ' +
            [line.v0, line.v1, line.v2, line.v3, line.v4, line.v5]
                .filter(n => n)
                .join(', ');
        Helper.loadPolicyLine(result, model);
    }

    /**
     * loadPolicy loads all policy rules from the storage.
     */
    public async loadPolicy(model: Model) {
        const lines = await this.sequelize.getRepository(CasbinRule).findAll();

        for (const line of lines) {
            this.loadPolicyLine(line, model);
        }
    }

    private savePolicyLine(ptype: string, rule: string[]): CasbinRule {
        const line = new CasbinRule();

        line.ptype = ptype;
        if (rule.length > 0) {
            line.v0 = rule[0];
        }
        if (rule.length > 1) {
            line.v1 = rule[1];
        }
        if (rule.length > 2) {
            line.v2 = rule[2];
        }
        if (rule.length > 3) {
            line.v3 = rule[3];
        }
        if (rule.length > 4) {
            line.v4 = rule[4];
        }
        if (rule.length > 5) {
            line.v5 = rule[5];
        }

        return line;
    }

    /**
     * savePolicy saves all policy rules to the storage.
     */
    public async savePolicy(model: Model) {
        await this.sequelize.transaction(async tx => {
            // truncate casbin table
            await this.sequelize
                .getRepository(CasbinRule)
                .destroy({ where: {}, truncate: true, transaction: tx });

            const lines: CasbinRule[] = [];

            let astMap = model.model.get('p')!;
            for (const [ptype, ast] of astMap) {
                for (const rule of ast.policy) {
                    const line = this.savePolicyLine(ptype, rule);
                    lines.push(line);
                }
            }

            astMap = model.model.get('g')!;
            for (const [ptype, ast] of astMap) {
                for (const rule of ast.policy) {
                    const line = this.savePolicyLine(ptype, rule);
                    lines.push(line);
                }
            }

            await CasbinRule.bulkCreate(
                lines.map(l => l.get({ plain: true })),
                { transaction: tx }
            );
        });
        return true;
    }

    /**
     * addPolicy adds a policy rule to the storage.
     */
    public async addPolicy(sec: string, ptype: string, rule: string[]) {
        const line = this.savePolicyLine(ptype, rule);
        await line.save();
    }

    /**
     * removePolicy removes a policy rule from the storage.
     */
    public async removePolicy(sec: string, ptype: string, rule: string[]) {
        const line = this.savePolicyLine(ptype, rule);
        const where = {};

        Object.keys(line.get({ plain: true }))
            .filter(key => key !== 'id')
            .forEach(key => {
                // @ts-ignore
                where[key] = line[key];
            });

        await this.sequelize.getRepository(CasbinRule).destroy({ where });
    }

    /**
     * removeFilteredPolicy removes policy rules that match the filter from the storage.
     */
    public async removeFilteredPolicy(
        sec: string,
        ptype: string,
        fieldIndex: number,
        ...fieldValues: string[]
    ) {
        throw new Error('not implemented');
    }
}

export default CasbinSequelizeAdapter;
