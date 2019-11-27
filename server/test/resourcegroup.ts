import chai from 'chai';
const expect = require('chai').expect;
import chaiHttp from 'chai-http';
import { initConnect } from './index';
import connect from 'connect';
import * as http from 'http';
import { sequelize, connectdb } from '../db';
import ResourceGroup from '../model/ResourceGroup';
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

    it('test add top1-4 group to root group using restful api', async () => {
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
        await delgroup.destroy();
    });

    it('test add a group which has children', async () => {
        let groot = await ResourceGroup.findOne({
            where: {
                id: 1
            }
        });
        let top15 = await ResourceGroup.create({
            groupname: 'top1-5',
            description: 'top1 5'
        });
        await (groot as ResourceGroup).$add('children', top15);
        let sub51 = await ResourceGroup.create({
            groupname: 'sub5-1',
            description: 'sub5 1'
        });
        await (top15 as ResourceGroup).$add('children', sub51);
    });

    it('test delete a group which has children', async () => {
        let delgroup = (await ResourceGroup.findOne({
            where: {
                groupname: 'top1-5'
            }
        })) as ResourceGroup;
        await delgroup.destroy();
    });

    it('test add a group which has children using restful api', async () => {
        let res;
        res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        res = await req
            .post('/api/resource-group/1/children')
            .type('json')
            .send({
                groupname: 'top1-6',
                description: 'top1 6',
                resources: []
            });
        const topid = res.body.id;
        expect(res).to.have.status(200);
        res = await req
            .post('/api/resource-group/' + topid + '/children')
            .type('json')
            .send({
                groupname: 'sub6-1',
                description: 'sub6 1',
                resources: []
            });
        const subid = res.body.id;
        expect(res).to.have.status(200);
        res = await req.delete('/api/resource-group/' + topid);
        expect(res).to.have.status(200);
    });

    it('test add a resource to a group using restful api', async () => {
        let res;
        res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        res = await req
            .post('/api/resource-group/8/resource')
            .type('json')
            .send({
                resources: [{ id: '3' }, { id: '5' }]
            });
        expect(res).to.have.status(200);
    });

    it('test delete a resource to a group using restful api', async () => {
        let res;
        res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        res = await req
            .delete('/api/resource-group/8/resource')
            .type('json')
            .send({
                resources: [{ id: '3' }, { id: '5' }]
            });
        expect(res).to.have.status(200);
    });

    it('test edit a group using restful api', async () => {
        let res;
        res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        res = await req
            .put('/api/resource-group/8')
            .type('json')
            .send({
                groupname: 'top1-4newname',
                description: 'top1 4 new name',
                resources: [{ id: '1' }, { id: '3' }, { id: '5' }]
            });
        expect(res).to.have.status(200);
    });
});
