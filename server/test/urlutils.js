const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const urlWithoutLocale = require('../lib/utils').urlWithoutLocale

chai.use(chaiHttp)

describe('url utils test', () => {
    it('get rid of locale prefix', () => {
        const url1 = '/en/abc/def'
        const url2 = '/en/'
        const u1 = urlWithoutLocale(url1)
        const u2 = urlWithoutLocale(url2)
        expect(u1 === '/abc/def').to.be.true
        expect(u2 === '/').to.be.true
    })
})
