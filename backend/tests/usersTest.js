const app = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /users", () => {
      // Test to get all users
      it("should get all users", (done) => {
           chai.request(app)
               .get('/users')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('array');
                   done();
                });
       });
  });
});
