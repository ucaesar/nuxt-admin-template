import {Table, Column, Model} from 'sequelize-typescript';

@Table({tableName: 'casbin_rule', timestamps: false})
export class CasbinRule extends Model<CasbinRule> {
    @Column
    public ptype: string;

    @Column
    public v0: string;

    @Column
    public v1: string;

    @Column
    public v2: string;

    @Column
    public v3: string;

    @Column
    public v4: string;

    @Column
    public v5: string;
}