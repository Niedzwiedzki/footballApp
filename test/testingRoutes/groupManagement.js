exports.groupManagement = function (token) {
    const expect = require('expect');
    const request = require('supertest')
    const { app } = require('../../server');
    const jwt = require('jsonwebtoken')
    const keys = require('../../config/testkeys')

    describe('group testing', () => {

        // use only if needed
        // it('should get available competitions', (done) => {
        //     Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
        //         const payload = { id: member.id, member: member.name }
        //         const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
        //         request(app)
        //             .get('/availablecompetitions')
        //             .set("Authorization", `Bearer ${token}`)
        //             .expect(200)

        //             .end((err, res) => {
        //                 if (err) {
        //                     return done(err)
        //                 }
        //                     expect(res.body).toBeA(Array)
        //                 done()
        //             })
        //     })


        // })


        it('should not get available competitions', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                request(app)
                    .get('/availablecompetitions')
                    .set("Authorization", `Bearer ${token}a`)
                    .expect(401)

                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        }
                        done()
                    })
            })


        })


        it('should create a new group', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                const group = {
                    competitionId: 2001,
                    name: "Mistrzostwa"
                }
                request(app)
                    .post('/newgroup')
                    .set("Authorization", `Bearer ${token}`)
                    .send(group)
                    .expect(200)

                    .end((err, res) => {
                        expect(res.body.members[0].email).toBe('kuban@op.pl')
                        if (err) {
                            return done(err)
                        }
                        done()
                    })
            })


        })


        it('should not create a duplicate group', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                const group = {
                    competitionId: 2001,
                    name: "Mistrzostwa World Cup"
                }
                request(app)
                    .post('/newgroup')
                    .set("Authorization", `Bearer ${token}`)
                    .send(group)
                    .expect(400)

                    .end((err, res) => {
                        expect(res.body.group).toBe('group already exists')
                        if (err) {
                            return done(err)
                        }
                        done()
                    })
            })
        })


        it('should not create a group with no name', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                const group = {
                    competitionId: 2001
                }
                request(app)
                    .post('/newgroup')
                    .set("Authorization", `Bearer ${token}`)
                    .send(group)
                    .expect(400)

                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        }
                        done()
                    })
            })
        })


        it('should not invite a member', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                const invitation = {
                    name: "Mistrzostwa World Cup",
                    invitedFriends: ["aaaaaa@op.pl"]
                }
                request(app)
                    .post('/invitenewmembers')
                    .set("Authorization", `Bearer ${token}`)
                    .send(invitation)
                    .expect(400)

                    .end((err, res) => {
                        expect(res.body.group).toBe('aaaaaa@op.pl already in group')
                        if (err) {
                            return done(err)
                        }
                        done()
                    })
            })
        })


        it('should not invite a member if not authenticated', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                const invitation = {
                    name: "Mistrzostwa World Cup",
                    invitedFriends: ["kuba12345@op.pl"]
                }
                request(app)
                    .post('/invitenewmembers')
                    .set("Authorization", `Bearer ${token}e`)
                    .send(invitation)
                    .expect(401)

                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        }
                        done()
                    })
            })
        })


        it('should not invite a for a group that do not exist', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                const invitation = {
                    name: "Mistrzostwa World Cup!",
                    invitedFriends: ["kuba12345@op.pl"]
                }
                request(app)
                    .post('/invitenewmembers')
                    .set("Authorization", `Bearer ${token}`)
                    .send(invitation)
                    .expect(400)

                    .end((err, res) => {
                        expect(res.body.group).toBe('this group do not exist')
                        if (err) {
                            return done(err)
                        }
                        done()
                    })
            })
        })

        //sending email test - to be used only if really needed
        // it('should invite a new member', (done) => {
        //     Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
        //         const payload = { id: member.id, member: member.name }
        //         const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
        //         const invitation = {
        //             name: "Mistrzostwa World Cup",
        //             invitedFriends: ["jakub.niedzwiedzki1990@gmail.com"]
        //         }
        //         request(app)
        //             .post('/invitenewmembers')
        //             .set("Authorization", `Bearer ${token}`)
        //             .send(invitation)
        //             .expect(200)

        //             .end((err, res) => {
        //                 if (err) {
        //                     return done(err)
        //                 }
        //                 done()
        //             })
        //     })
        // })

    })
}