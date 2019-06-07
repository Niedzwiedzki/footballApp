exports.delete_regain= function (token) {
    const expect = require('expect');
    const request = require('supertest')
    const { app } = require('../../server');
    const jwt = require('jsonwebtoken')
    const keys = require('../../config/testkeys')

    describe('deleting', () => {
        it('should delete member of group', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                let memberToDelete = {
                    "deletedFriend": "aaaaaa@op.pl",
                    "name": "Mistrzostwa World Cup"
                }
                request(app)
                    .delete('/deletemember')
                    .set("Authorization", `Bearer ${token}`)
                    .send(memberToDelete)
                    
                    .expect(200)

                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        }
                    Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(1);
                            done();
                        }).catch((e) => done(e))
                    })
            })


        })



        it('should not delete a user from a group that do not exist ', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                let memberToDelete = {
                    "deletedFriend": "aaaaaa@op.pl",
                    "name": "Mistrzostwa World Cup 2019"
                }
                request(app)
                    .delete('/deletemember')
                    .set("Authorization", `Bearer ${token}`)
                    .send(memberToDelete)
                    
                    .expect(400)

                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        }
                        expect(res.body.group).toBe('this group do not exist')
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(2);
                            done();
                        }).catch((e) => done(e))
                    })
            })


        })


        it('should not delete a yourself', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                let memberToDelete = {
                    "deletedFriend": "kuban@op.pl",
                    "name": "Mistrzostwa World Cup"
                }
                request(app)
                    .delete('/deletemember')
                    .set("Authorization", `Bearer ${token}`)
                    .send(memberToDelete)
                    
                    .expect(400)

                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        }
                        expect(res.body.group).toBe('you cannot remove yourself')
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(2);
                            done();
                        }).catch((e) => done(e))
                    })
            })


        })

        it('should not delete a user that is not a member', (done) => {
            Member.findById('5cf3878dfc9fea2f9c7bb10f').then((member) => {
                const payload = { id: member.id, member: member.name }
                const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: "12h" });
                let memberToDelete = {
                    "deletedFriend": "jakub.niedzwiedzki1990@gmail.com",
                    "name": "Mistrzostwa World Cup"
                }
                request(app)
                    .delete('/deletemember')
                    .set("Authorization", `Bearer ${token}`)
                    .send(memberToDelete)
                    
                    .expect(400)

                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        }
                        expect(res.body.group).toBe('jakub.niedzwiedzki1990@gmail.com is not a member of this group')
                        Group.findById('5cf38839ae919f21b0710547').then((group) => {
                            expect(group.members.length).toBe(2);
                            done();
                        }).catch((e) => done(e))
                    })
            })


        })

        })
}