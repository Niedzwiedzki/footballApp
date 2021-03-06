exports.register_login = function() {
    const expect = require('expect');
    const request = require('supertest')
    const { app } = require('../../server');


    describe('member testing', () => {
        it('should register a new member', (done) => {
            let member = {
                name: "test1",
                email: "test1@test1.com",
                password: "1954"
            }
            request(app)
                .post('/register')
                .send(member)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.name).toBe('test1')
                    if (err) {
                        return done(err)
                    }
    
                    Member.find({ email: "test1@test1.com" }).then((members) => {
                        expect(members.length).toBe(1);
                        expect(members[0].name).toBe("test1");
                        done();
                    }).catch((e) => done(e))
                })
        })
    
        it('should not register a new member', (done) => {
            let member = {
                name: "test1",
                email: "test1@test1.com"
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
                        expect(members[0].name).toBe("Kuba3");
                        expect(members[1].name).toBe("Jakub");
                        expect(members[2].name).toBe("kubs");
                        expect(members[3].name).toBe("Tomek");
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
                        expect(members[0].name).toBe("Kuba3");
                        expect(members[1].name).toBe("Jakub");
                        expect(members[2].name).toBe("kubs");
                        expect(members[3].name).toBe("Tomek");
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
