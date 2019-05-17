const chai = require('chai')

const chaiHttp = require('chai-http')

const app = require('../../server/index')

chai.use(chaiHttp)
chai.should()

describe('Users',()=>{
    describe('GET /api/users/test', ()=>{
        
        it('shoud get message', (done)=>{
            chai.request(app)
            .get('/api/users/test')
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })

        })
    })
})