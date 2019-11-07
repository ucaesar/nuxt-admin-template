import chai from 'chai';
const expect = require('chai').expect;
import chaiHttp from 'chai-http';
import { initConnect } from './index';
import connect from 'connect';
import * as http from 'http';
import { sequelize, connectdb } from '../db';
import ResourceGroup from '../model/ResouceGroup';
import Role from '../model/Role';
import User from '../model/User';
import RoleUser from '../model/RoleUser';

chai.use(chaiHttp);

describe('ResourceGroup API test', () => {
    let app;
    let server: http.Server;
    let req: ChaiHttp.Agent;

    before(async function() {
        app = connect();
        await initConnect(app);
        server = app.listen(56556);
        // await connectdb(sequelize);
    });

    after(async function() {
        server.close();
    });

    beforeEach(function() {
        req = chai.request.agent(server);
    });

    afterEach(function() {
        req.close();
    });

    it('test get root group', async () => {
        let groot = await ResourceGroup.findOne({
            where: {
                id: 1
            }
        });
        expect(groot).not.to.be.null;
        if (groot) expect((groot as ResourceGroup).id).to.equals(1);
    });

    it('test get all top resource groups of root group', async () => {
        let groot = await ResourceGroup.findOne({
            where: {
                id: 1
            }
        });
        expect(groot).not.to.be.null;
        if (groot !== null) {
            let children = await groot.$get('children');
            expect(!children).to.be.false;
            if (children) {
                expect((children as ResourceGroup[]).length).to.be.above(0);
            }
        }
    });

    it('test get parent group of top1-1 resource group', async () => {
        let gtop11 = await ResourceGroup.findOne({
            where: {
                id: 2
            }
        });
        expect(gtop11).not.to.be.null;
        if (gtop11 !== null) {
            let parentg = await gtop11.$get('parent');
            expect(!parentg).to.be.false;
            if (parentg) {
                expect((parentg as ResourceGroup).id).to.equals(1);
            }
        }
    });

    it('test add sub1-1 group to top1-1 group', async () => {
        if (
            !(await ResourceGroup.findOne({
                where: { groupname: 'sub1-1' }
            }))
        ) {
            let groot = await ResourceGroup.findOne({
                where: {
                    id: 2
                }
            });
            let sub11 = await ResourceGroup.create({
                groupname: 'sub1-1',
                description: 'sub1 1'
            });
            await (groot as ResourceGroup).$add('children', sub11);
        }
    });

    it('test add top1-4 group to root group', async () => {
        let res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req
            .post('/api/resource-group/1/children')
            .type('json')
            .send({
                groupname: 'top1-4',
                description: 'top1 4'
            });
    });

    it('test delete a group', async () => {
        let delgroup = (await ResourceGroup.findOne({
            where: {
                groupname: 'sub1-1'
            }
        })) as ResourceGroup;
        await delgroup.destroy()
    });

    // it('test get users of role1', async () => {
    //     let role1 = await Role.findOne({
    //         where: {
    //             id: 1
    //         }
    //     });
    //     expect(role1).not.to.be.null;
    //     let user1 = await User.findOne({
    //         where: {
    //             id: '52567820-d8f0-11e9-9b42-17e9ff6339c6'
    //         }
    //     });
    //     expect(user1).not.to.be.null;
    //     if (role1) {
    //         expect((role1 as Role).id).to.equals(1);
    //         let users = await role1.$get('users');
    //         expect(!users).to.be.false;
    //     }
    // });
});
