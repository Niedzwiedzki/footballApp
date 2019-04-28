const express = require('express');
const router = express.Router();
const passport = require('passport')

//Load member model
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

// @route   GET /shownextmatches
// @desc    Show next matches
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


// @route   GET /showfinishedmatches
// @desc    Show finished matches
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

// @route   POST /predictresults
// @desc    Show finished matches
// @access  Private
router.post('/predictresults', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const groupId = req.body.group
    const predictions = req.body.predictions
    try {
        const group = await Group.findById(groupId)
        if(!group) {
            return res.status(400).json({group: 'this group do not exist'})
        }
        //check membership
        let membership = false



        group.members.forEach((member) => {
            if(member._id.toString() === req.user._id.toString() ){
                membership = true;

                member.bets = member.bets.filter((bet) => {
                    return bet.id !== predictions.id
                })

                return member.bets.push(predictions)
            }
        })
        if(!membership) {
            return res.status(400).json({group: 'You are not a member of this group'})
        }
        await group.markModified("members")
        await group.save()
        res.send(group)

    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;