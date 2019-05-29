let mongoose = require("mongoose");
let Member = require('../models/Member');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Members', () => {
    beforeEach((done) => { //Before each test we empty the database
        Member.deleteMany()
        let testMember = {
            name: "testMember",
            email: "testMember@testMember.com",
            password: "1784"
        }
        chai.request(server)
            .post('/register')
            .send(testMember)
            .end()
        done();                  
    });



  describe('register', () => {
      it('should register a new member', (done) => {
        let member = {
            name: "chuj",
            email: "chuj@chuj.com",
            password: "1954"
        }
            chai.request(server)
                .post('/register')
                .send(member)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
                });
            });

      it('missing email', (done) => {
        let member = {
            name: "chuj",
            password: "1954"
        }
            chai.request(server)
                .post('/register')
                .send(member)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
                });
            });

      it('Cannot register twice', (done) => {

        let member = {
            name: "testMember",
            email: "testMember@testMember.com",
            password: "1784"
        }
            chai.request(server)
                .post('/register')
                .send(member)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
                });
            });

            


      });
  });
