const express = require('express');
const router = express.Router();
const passport = require('passport')
const {sendGoodbyeEmail} = require('../../emails/account')

//Load member model
const Member = require('../../models/Member')
const Group = require('../../models/Group')


// @route   POST /invitenewmembers
// @desc    invite new member
// @access  Private
router.delete('/deletemember', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const to = req.body.deletedFriend
    let index 
    try {
        const group = await Group.findOne({admin: req.user._id, name: req.body.name})
        const member = await Member.findOne({email: "aaaaaa@op.pl"})
        if(!group) {
            return res.status(400).json({group: 'this group do not exist'})
        }
        if(req.user.email === to) {
            return res.status(400).json({group: 'you cannot remove yourself'})
        }
        // checking if new users are already in group
        const memberAlreadyIn = [];
        await group.members.forEach(e1=> {
            if(e1.email === to) {
                memberAlreadyIn.push(e1.email)
                index = group.members.indexOf(e1)
            } 
            
        })

        if(memberAlreadyIn.length === 0) {
            return res.status(400).json({group: `${to} is not a member of this group`})
        }
        
        group.members.splice(index, 1)

        member.memberGroups.filter(gr => {
            return gr != to
        })

        await sendGoodbyeEmail(to, req.body.name)
        await member.save()
        await group.save()
        res.send(group)
            
    } catch (e) {
        res.status(400).send(e)
    }
}
)

module.exports = router;