const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

//Load member model
const Member = require('../../models/Member')
const Group = require('../../models/Group')


// @route   POST /login:id
// @desc    Login as invated member
// @access  Public

router.post('/login/:id', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userAlreadyIn = [];

    try {
        const group = await Group.findById(req.params.id)
        console.log(group)
        group.members.forEach((member) => {if(member.email === email){
            userAlreadyIn.push(email)
        }})
        if(!group) {
            return res.status(400).json({group: 'this group do not exist'})
        }
        if (userAlreadyIn.length > 0){
            return res.status(400).json({group: 'You are already member if this group'}) 
        }
        if (!group.invitedFriends.includes(email)){
            return res.status(400).json({group: 'You are not invited to join this group'}) 
        }

        const member = await Member.findOne({email})
        // check for member
        if(!member) {
            return res.status(404).json({email: 'Member not found'})
        } 

        // check password
        const isMatch = await bcrypt.compare(password, member.password);
        if(isMatch){
            //Member matched

            const payload = { id: member.id, mamber: member.name } // create JWT payload

            //Sign Token
            const token = await jwt.sign(payload, keys.secretOrKey, {expiresIn: "12h"});

            group.members.push({
                "name" : member.name,
                "email" : member.email,
                "_id" : member._id,
                "bets" : []
            })

            member.memberGroups.push(group._id)
            
            await member.save()
            await group.save()

            res.send({success: true, token: 'Bearer ' + token})

        } else {
            return res.status(400).json({password: "Password incorrect"})
        }
    } catch (e) {
        res.status(400).send(e)
    }
})


// @route   POST /register:id
// @desc    Resgitser as invated member
// @access  Public
router.post('/register/:id', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userAlreadyIn = [];

    try {
        const group = await Group.findById(req.params.id)
        group.members.forEach((member) => {if(member.email === email){
            userAlreadyIn.push(email)
        }})
        if(!group) {
            return res.status(400).json({group: 'this group do not exist'})
        }
        if (userAlreadyIn.length > 0){
            return res.status(400).json({group: 'You are already member if this group'}) 
        }
        if (!group.invitedFriends.includes(email)){
            return res.status(400).json({group: 'You are not invited to join this group'}) 
        }

        const member = await Member.findOne({email: email})
        if(member) {
            return res.status(400).json({email: 'Email aready exists'})
        } else {
            const newMember = new Member({
                name: name,
                email: email,
                password: password, 
                memberGroups: req.params.id.split()
            });
            // hashing the password
           
            await bcrypt.genSalt(10, (e, salt) => {
                bcrypt.hash(newMember.password, salt, (e, hash) => {
                    if(e) throw e;
                    newMember.password = hash;
                    newMember.save()
                        .then((member) => {group.members.push({
                            "name" : member.name,
                            "email" : member.email,
                            "_id" : member._id,
                            "bets" : []
                        })
                        group.save()
                            .then(group => res.json(group.members))
                            .catch(e => console.log(e))
                    })
                })
            })
        }

    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;