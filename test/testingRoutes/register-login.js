exports.register_login = function() {
    const expect = require('expect');
    const request = require('supertest')
    const { app } = require('../../server');

    describe('member testing', () => {
        it('should register a new member', (done) => {
            let member = {
                name: "chuj",
                email: "chuj@chuj.com",
                password: "1954"
            }
            request(app)
                .post('/register')
                .send(member)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.name).toBe('chuj')
                    if (err) {
                        return done(err)
                    }
    
                    Member.find({ email: "chuj@chuj.com" }).then((members) => {
                        expect(members.length).toBe(1);
                        expect(members[0].name).toBe("chuj");
                        done();
                    }).catch((e) => done(e))
                })
        })
    
        it('should not register a new member', (done) => {
            let member = {
                name: "chuj",
                email: "chuj@chuj.com"
            }
            request(app)
                .post('/register')
                .send(member)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err)
                    }
                    Member.find().then((members) => {
                        expect(members.length).toBe(3);
                        done();
                    }).catch((e) => done(e))
                })
        })
    
        it('should not register the same member twice', (done) => {
            let member = {
                "name": "Kuba3",
                "email": "blablabla@blavla.com",
                "password": "test1"
            }
            request(app)
                .post('/register')
                .send(member)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err)
                    }
                    Member.find().then((members) => {
                        expect(members.length).toBe(3);
                        done();
                    }).catch((e) => done(e))
                })
        })
    
        it('should login a user', (done) => {
            let member = {
                "email": "blablabla@blavla.com",
                "password": "test1"
            }
            request(app)
                .post('/login')
                .send(member)
                .expect(200)
                    
                .end((err, res) => {
                    expect(res.body.success).toBe(true)
                    if (err) {
                        return done(err)
                    }
                })
            done();
        })
    
    
        it('should not login', (done) => {
            let member = {
                "email": "blablabla@blavla.com",
                "password": "test"
            }
            request(app)
                .post('/login')
                .send(member)
                .expect(400)
                .end((err, res) => {
                    expect(res.body.password).toBe("Password incorrect")
                    if (err) {
                        return done(err)
                    }
                })
            done();
        })
    })
}
