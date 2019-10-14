const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const app = require('./index')

chai.use(chaiHttp)

describe('Role API test', () => {
    const server = app.listen(56556)

    it('test api/login with wrong username/password', async () => {
        const req = chai.request.agent(server)
        let res = null
        res = await req
            .post('/en/api/login')
            .type('form')
            .send({
                username: 'superadmin',
                password: 'super'
            })
        expect(res).to.have.status(401)
        expect(res).to.be.json
        expect(res.body.redirect === '/').to.be.true
        req.close()
    })

    it('test api/login with wrong username/password', async () => {
        const req = chai.request.agent(server)
        let res = null
        res = await req
            .post('/api/login')
            .type('form')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            })
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body.redirect === '/superadmin').to.be.true
        req.close()
    })
    
    it('get all roles', async () => {
        const req = chai.request.agent(server)
        let res = null
        res = await req
            .post('/adminlogin')
            .type('form')
            .send({
                username: 'superadmin',
                password: 'superadmin'
            })
        // expect(res).to.have.cookie("koa:sess");
        res = await req.get('/api/role/')
        expect(res).to.have.status(200)
        expect(res).to.be.json
        req.close()
    })
})
