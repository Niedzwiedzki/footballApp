const express = require('express');
const router = express.Router();
const keys = require('../../config/keys')
const passport = require('passport')
const {sendInvitationEmail, sendGoodbyeEmail} = require('../../emails/account')
const r2 = require("r2");

//Load member model
const Member = require('../../models/Member')
const Group = require('../../models/Group')

// @route   POST /invitenewmembers
// @desc    invite new member
// @access  Private
router.get('/shownextmatches', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const groupId = req.body.group
    try {
        const group = await Group.findById(groupId)
        if(!group) {
            return res.status(400).json({group: 'this group do not exist'})
        }

        //check membership
        let membership = false
        group.members.forEach((member) => {
            if(member._id.toString() === req.user._id.toString() ){
                return membership = true;
            }
        })

        if(!membership) {
            return res.status(400).json({group: 'You are not a member of this group'})
        }
        const scheduledMatches = group.matches.filter(match => {
            return match.status === "SCHEDULED"
        })
        res.send(scheduledMatches)
    } catch(e){
        res.status(400).send(e)
    }
})

// @route   POST /invitenewmembers
// @desc    invite new member
// @access  Private
router.get('/showfinishedmatches', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const groupId = req.body.group
    try {
        const group = await Group.findById(groupId)
        if(!group) {
            return res.status(400).json({group: 'this group do not exist'})
        }

        //check membership
        let membership = false
        group.members.forEach((member) => {
            if(member._id.toString() === req.user._id.toString() ){
                return membership = true;
            }
        })

        if(!membership) {
            return res.status(400).json({group: 'You are not a member of this group'})
        }
        const finishedMatches = group.matches.filter(match => {
            return match.status === "FINISHED"
        })
        res.send(finishedMatches)
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;