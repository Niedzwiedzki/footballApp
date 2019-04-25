const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const {sendInvitationEmail} = require('../../emails/account')
const request= require('request')

//Load member model
const Member = require('../../models/Member')
const Group = require('../../models/Group')

// @route   POST /register
// @desc    Register member
// @access  Public

router.post('/register', async (req, res) => {
    

    try {
        const member = await Member.findOne({email: req.body.email})
        if(member) {
            return res.status(400).json({email: 'Email aready exists'})
        } else {
            const newMember = new Member({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            
            // hashing the password

            await bcrypt.genSalt(10, (e, salt) => {
                bcrypt.hash(newMember.password, salt, (e, hash) => {
                    if(e) throw e;
                    newMember.password = hash;
                    newMember.save()
                        .then(member => res.json(member))
                        .catch(e => console.log(e))
                })

            })
        }
    } catch (e) {
        res.status(400).send(e)
    }


})

// @route   POST /login
// @desc    Login member
// @access  Public

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
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
            res.send({success: true, token: 'Bearer ' + token})

        } else {
            return res.status(400).json({password: "Password incorrect"})
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

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
                    })
                        
                        .catch(e => console.log(e))
                })
            })
        }
        res.send({msg: "succes"}) 
    } catch(e){
        res.status(400).send(e)
    }
})

// @route   GET /availablecompetitions
// @desc    Get available competitions
// @access  Private
router.get('/availablecompetitions', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const url = 'http://api.football-data.org/v2/competitions'
    const header = keys.footballAPIToken
    const availableCompetitions = []
    try {
        await request({url, json: true, header}, (error, response) =>{
            response.body.competitions.forEach((competition) => availableCompetitions.push(competition.id, competition.name) )
            res.send(availableCompetitions);
        })
    } catch(e){
        res.send(e)
    }

})

// @route   POST /newgroup
// @desc    Create new group
// @access  Private
router.post('/newgroup', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const to = req.body.invitedFriends

    const newMember = {
        name: req.user.name,
        email: req.user.email,
        _id: req.user.id,
        bets: []
    }

    const newGroup = new Group({
        id: req.body.id,
        name: req.body.name,
        admin: req.user._id,
        invitedFriends: to,
        members: newMember
    });


    try {
        const group = await Group.findOne({admin: req.user._id, name: req.body.name})
        if(group) {
            return res.status(400).json({group: 'group already exists'})
        }
        console.log(newGroup)
        await newGroup.save()
        //Invite Friends
        // await sendInvitationEmail(to, req.body.name, newGroup._id)
        res.send({msg: "succes"})
    } catch(e){
        res.status(400).send(e)
    }

})


// @route   POST /invitenewmembers
// @desc    invite new member
// @access  Private
router.post('/invitenewmembers', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const to = req.body.invitedFriends
    try {
        const group = await Group.findOne({admin: req.user._id, name: req.body.name})
        if(!group) {
            return res.status(400).json({group: 'this group do not exist'})
        }

        // checking if new users are already in group
        const memberAlreadyIn = [];
        await group.members.forEach(e1=>to.forEach((e2) => {
            if(e1 === e2) {
                memberAlreadyIn.push(e1)
            }
        }))

        if(memberAlreadyIn.length > 0){
            return res.status(400).json({group: `${memberAlreadyIn.toString().replace(',', ' and ')} already in group`})
        }

        // await sendInvitationEmail(to, req.body.name, group._id)
        group.invitedFriends = group.invitedFriends.concat(to)
        await group.save();
        res.send({msg: "succes"})
    } catch(e){
        res.status(400).send(e)
    }
})


module.exports = router;