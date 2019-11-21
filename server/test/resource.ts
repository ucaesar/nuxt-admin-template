import chai from 'chai';
const expect = require('chai').expect;
import chaiHttp from 'chai-http';
import { initConnect } from './index';
import connect from 'connect';
import * as http from 'http';
import Resource from '../model/ResourceResourceGroup';

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

    // it('test add resource using restful api', async () => {
    //     let res = await req
    //         .post('/api/user/login')
    //         .type('json')
    //         .send({
    //             username: 'superadmin',
    //             password: 'superadmin'
    //         });
    //     // expect(res).to.have.cookie("koa:sess");
    //     res = await req
    //         .post('/api/resource/')
    //         .type('json')
    //         .send({
    //             name: 'r5',
    //             description: 'test resource 5',
    //             url: '/api/resource-group/5',
    //             action: 'GET'
    //         });
    //     expect(res).to.have.status(200);
    // });
});
