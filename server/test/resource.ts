import chai from 'chai';
const expect = require('chai').expect;
import chaiHttp from 'chai-http';
import { initConnect } from './index';
import connect from 'connect';
import * as http from 'http';
import Resource from '../model/Resource';

chai.use(chaiHttp);

describe('Resource API test', () => {
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

    it('test delete resource using restful api', async () => {
        let res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        // expect(res).to.have.cookie("koa:sess");
        res = await req.delete('/api/resource/2');
        // expect(res).to.have.status(200);
    });

    it('test edit a resource using restful api', async () => {
        let res;
        res = await req
            .post('/api/user/login')
            .type('json')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            });
        res = await req
            .put('/api/resource/5')
            .type('json')
            .send({
                name: 'r55',
                description: 'test resource 55',
                url: '/test/api/resource-group/55',
                action: 'POST'
            });
        expect(res).to.have.status(200);
    });
});
