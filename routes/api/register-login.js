const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

//Load member model
const Member = require('../../models/Member')

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
                        .catch(e => res.status(400).send(e))
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

module.exports = router;