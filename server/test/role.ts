import chai from 'chai';
const expect = require('chai').expect;
import chaiHttp from 'chai-http';
import { initConnect } from './index';
import connect from 'connect';
import * as http from 'http';

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

    it('test api/login with wrong username/password', async () => {
        let res = await req
            .post('/en/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'super'
            });
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res).to.have.cookie('koa:sess');
        expect(res.body.redirect === '/').to.be.true;
    });

    it('test api/login with right username/password', async () => {
        let res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('koa:sess');
        expect(res).to.be.json;
        expect(res.body.redirect === '/superadmin').to.be.true;
    });

    it('test /api/user/permissions with right superadmin/superadmin', async () => {
        let res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('koa:sess');
        expect(res).to.be.json;
        expect(res.body.redirect === '/superadmin').to.be.true;
        res = await req.get('/api/user/permissions');
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        res = await req
            .post('/api/user/logout')
            .type('json')
            .send();
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        res = await req.get('/api/user/permissions');
        expect(res).to.have.status(403);
    });

    it('get all roles', async () => {
        let res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req.get('/api/roles/?start=1&num=6');
        expect(res).to.have.status(200);
        expect(res).to.be.json;
    });

    it('delete a role', async () => {
        let res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req.delete('/api/roles/roles1');
        expect(res).to.have.status(200);
        expect(res).to.be.json;
    });

    it('add a role', async () => {
        let res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req.post('/api/roles/dataset2_adminR');
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        // expect(res.body.result).to.be.true
    });
});
