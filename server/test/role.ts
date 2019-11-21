import chai from 'chai';
const expect = require('chai').expect;
import chaiHttp from 'chai-http';
import { initConnect } from './index';
import connect from 'connect';
import * as http from 'http';
import Role from '../model/Role';

chai.use(chaiHttp);

describe('Role API test', () => {
    let app;
    let server: http.Server;
    let req: ChaiHttp.Agent;

    before(async function() {
        app = connect();
        await initConnect(app);
        server = app.listen(56556);
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

    // it('test api/login with wrong username/password', async () => {
    //     let res = await req
    //         .post('/en/api/user/login')
    //         .type('json')
    //         .send({
    //             username: 'superadmin',
    //             password: 'super'
    //         });
    //     expect(res).to.have.status(401);
    //     expect(res).to.be.json;
    //     expect(res).to.have.cookie('koa:sess');
    //     expect(res.body.redirect === '/').to.be.true;
    // });

    // it('test api/login with right username/password', async () => {
    //     let res = await req
    //         .post('/api/user/login')
    //         .type('json')
    //         .send({
    //             username: 'superadmin',
    //             password: 'superadmin'
    //         });
    //     expect(res).to.have.status(200);
    //     expect(res).to.have.cookie('koa:sess');
    //     expect(res).to.be.json;
    //     expect(res.body.redirect === '/superadmin').to.be.true;
    // });

    // it('test /api/user/permissions with right superadmin/superadmin', async () => {
    //     let res = await req
    //         .post('/api/user/login')
    //         .type('json')
    //         .send({
    //             username: 'superadmin',
    //             password: 'superadmin'
    //         });
    //     expect(res).to.have.status(200);
    //     expect(res).to.have.cookie('koa:sess');
    //     expect(res).to.be.json;
    //     expect(res.body.redirect === '/superadmin').to.be.true;
    //     res = await req.get('/api/user/permissions');
    //     expect(res).to.have.status(200);
    //     expect(res).to.be.json;
    //     res = await req
    //         .post('/api/user/logout')
    //         .type('json')
    //         .send();
    //     expect(res).to.have.status(200);
    //     expect(res).to.be.json;
    //     res = await req.get('/api/user/permissions');
    //     expect(res).to.have.status(403);
    // });

    // it('get all roles', async () => {
    //     let res = await req
    //         .post('/api/user/login')
    //         .type('json')
    //         .send({
    //             username: 'superadmin',
    //             password: 'superadmin'
    //         });
    //     // expect(res).to.have.cookie("koa:sess");
    //     res = await req.get('/api/roles/?start=1&num=6');
    //     expect(res).to.have.status(200);
    //     expect(res).to.be.json;
    // });

    // it('delete a role', async () => {
    //     let res = await req
    //         .post('/api/user/login')
    //         .type('json')
    //         .send({
    //             username: 'superadmin',
    //             password: 'superadmin'
    //         });
    //     // expect(res).to.have.cookie("koa:sess");
    //     res = await req.delete('/api/roles/roles1');
    //     expect(res).to.have.status(200);
    //     expect(res).to.be.json;
    // });

    it('add a role using restful api', async () => {
        let res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req
            .post('/api/role/')
            .type('json')
            .send({
                rolename: 'r6_R',
                description: 'role 6'
            });
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        // expect(res.body.result).to.be.true
    });

    it('add role-role relation test', async () => {
        let r1 = await Role.findOne({
            where: { id: 1 }
        });
        let r2 = await Role.findOne({
            where: { id: 2 }
        });
        let r3 = await Role.findOne({
            where: { id: 3 }
        });
        if (r1 && r2 && r3) {
            await r3.$add('parents', [r1, r2]);
        }
    });

    it('get parents role test', async () => {
        let r3 = await Role.findOne({
            where: { id: 3 }
        });
        if (r3) {
            let rs = await r3.$get('parents');
            if (rs) {
                // console.log(rs);
            }
        }
    });
});
