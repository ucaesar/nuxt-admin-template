const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const arr = require('../model/test');
import app from './index';

chai.use(chaiHttp);

describe('Role API test', () => {
    const server = app.listen(56556);

    it('test api/login with wrong username/password', async () => {
        console.log(arr[0]);
        const req = chai.request.agent(server);
        let res = await req
            .post('/en/api/user/login')
            .type('form')
            .send({
                username: 'superadmin',
                password: 'super'
            });
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res).to.have.cookie('koa:sess');
        expect(res.body.redirect === '/').to.be.true;
        req.close();
    });

    it('test api/login with right username/password', async () => {
        const req = chai.request.agent(server);
        let res = await req
            .post('/api/user/login')
            .type('form')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('koa:sess');
        expect(res).to.be.json;
        expect(res.body.redirect === '/superadmin').to.be.true;
        req.close();
    });

    it('test /api/user/permissions with right superadmin/superadmin', async () => {
        const req = chai.request.agent(server);
        let res = await req
            .post('/api/user/login')
            .type('form')
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
            .type('form')
            .send();
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        res = await req.get('/api/user/permissions');
        expect(res).to.have.status(403);
        req.close();
    });

    it('get all roles', async () => {
        const req = chai.request.agent(server);
        let res = await req
            .post('/api/user/login')
            .type('form')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req.get('/api/roles/?start=1&num=6');
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        req.close();
    });

    it('delete a role', async () => {
        const req = chai.request.agent(server);
        let res = await req
            .post('/api/user/login')
            .type('form')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req.delete('/api/roles/roles1');
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        req.close();
    });

    it('add a role', async () => {
        const req = chai.request.agent(server);
        let res = await req
            .post('/api/user/login')
            .type('form')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req.put('/api/roles/dataset2_adminR');
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        // expect(res.body.result).to.be.true
        req.close();
    });
});
