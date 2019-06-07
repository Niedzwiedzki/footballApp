exports.invited = function (token) {
    const expect = require('expect');
    const request = require('supertest')
    const { app } = require('../../server');

    describe('invited testing', () => {
        it('should not accept not invited user (login)', (done) => {
            let member = {
                "email": "blablabla@blavla.com",
                "password": "test1"
            }
               
                request(app)
                    .post('/login/5cf38839ae919f21b0710547')
                    .send(member)
                    .expect(400)

                    .end((err, res) => {
                        expect(res.body.group).toBe('You are not invited to join this group')
                        if (err) {
                            return done(err)
                        }
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(2);
                            done();
                        }).catch((e) => done(e))
                    })
            })


        it('should not accept a user for group that do not exists (login)', (done) => {
            let member = {
                "email": "jakub.niedzwiedzki1990@gmail.com",
                "password": "barcelona2019"
            }
                
                request(app)
                    .post('/login/5cf38839ae919f21b0710548')
                    .send(member)
                    .expect(400)

                    .end((err, res) => {
                        expect(res.body.group).toBe('this group do not exist')
                        if (err) {
                            return done(err)
                        }
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(2);
                            done();
                        }).catch((e) => done(e))
                    })
            })


        it('should not accept a user who is already a member (login)', (done) => {
            let member = {
                "email": "aaaaaa@op.pl",
                "password": "test1"
            }
                
                request(app)
                    .post('/login/5cf38839ae919f21b0710547')
                    .send(member)
                    .expect(400)

                    .end((err, res) => {
                        expect(res.body.group).toBe('You are already member of this group')
                        if (err) {
                            return done(err)
                        }
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(2);
                            done();
                        }).catch((e) => done(e))
                    })
            })


        it('should not accept a user a with wrong password (login)', (done) => {
            let member = {
                "email": "jakub.niedzwiedzki1990@gmail.com",
                "password": "barcelona2018"
            }
                
                request(app)
                    .post('/login/5cf38839ae919f21b0710547')
                    .send(member)
                    .expect(400)

                    .end((err, res) => {

                        if (err) {
                            return done(err)
                        }
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(2);
                            done();
                        }).catch((e) => done(e))
                    })
            })

        it('should accept user (login)', (done) => {
            let member = {
                "email": "jakub.niedzwiedzki1990@gmail.com",
                "password": "barcelona2019"
            }
                
                request(app)
                    .post('/login/5cf38839ae919f21b0710547')
                    .send(member)
                    .expect(200)

                    .end((err, res) => {

                        if (err) {
                            return done(err)
                        }
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(3);
                            done();
                        }).catch((e) => done(e))
                    })
            })


        it('should not accept not invited user (login)', (done) => {
            let member = {
                "email": "blablabla@blavla.com",
                "password": "test1"
            }
                
                request(app)
                    .post('/login/5cf38839ae919f21b0710547')
                    .send(member)
                    .expect(400)

                    .end((err, res) => {
                        expect(res.body.group).toBe('You are not invited to join this group')
                        if (err) {
                            return done(err)
                        }
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(2);
                            done();
                        }).catch((e) => done(e))
                    })
            })
            it('should not accept not invited user (register)', (done) => {
                let member = {
                    "name": "Kubix",
                    "email": "notinvited@gmail.com",
                    "password": "test1"
                }
                   
                    request(app)
                        .post('/register/5cf38839ae919f21b0710547')
                        .send(member)
                        .expect(400)
    
                        .end((err, res) => {
                            expect(res.body.group).toBe('You are not invited to join this group')
                            if (err) {
                                return done(err)
                            }
                            Group.findById('5cf38839ae919f21b0710547').then((group) => {
                                expect(group.members.length).toBe(2);
                                done();
                            }).catch((e) => done(e))
                        })
                })


            it('should not accept a user for group that do not exists (register)', (done) => {
                let member = {
                    "name": "Kubix",
                    "email": "jakubtest.niedzwiedzkitest1990@gmail.com",
                    "password": "test1"
                }
                    
                    request(app)
                        .post('/register/5cf38839ae919f21b0710548')
                        .send(member)
                        .expect(400)
    
                        .end((err, res) => {
                            expect(res.body.group).toBe('this group do not exist')
                            if (err) {
                                return done(err)
                            }
                            Group.findById('5cf38839ae919f21b0710547').then((group) => {
                                expect(group.members.length).toBe(2);
                                done();
                            }).catch((e) => done(e))
                        })
                })

            it('should not accept already registered user (register)', (done) => {
                let member = {
                    "name": "Kubaaa7",
                    "email": "jakub.niedzwiedzki1990@gmail.com",
                    "password": "barcelona2019"
                }
                    
                    request(app)
                        .post('/register/5cf38839ae919f21b0710547')
                        .send(member)
                        .expect(400)
    
                        .end((err, res) => {
                            expect(res.body.email).toBe('Email aready exists')
                            if (err) {
                                return done(err)
                            }
                            Group.findById('5cf38839ae919f21b0710547').then((group) => {
                                expect(group.members.length).toBe(2);
                                done();
                            }).catch((e) => done(e))
                        })
                })

                

            it('should accept invited user (register)', (done) => {
                let member = {
                    "name": "Kubix",
                    "email": "jakubtest.niedzwiedzkitest1990@gmail.com",
                    "password": "test1"
                }
                    
                    request(app)
                        .post('/register/5cf38839ae919f21b0710547')
                        .send(member)
                        .expect(200)
    
                        .end((err, res) => {
                            if (err) {
                                return done(err)
                            }
                            Group.findById('5cf38839ae919f21b0710547').then((group) => {
                                expect(group.members.length).toBe(3);
                                done();
                            }).catch((e) => done(e))
                        })
                })


        })
}