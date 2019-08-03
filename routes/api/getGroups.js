const express = require('express');
const router = express.Router();
const passport = require('passport')

//Load member model
const Member = require('../../models/Member')


// @route   GET /getGroups
// @desc    get all your groups
// @access  Private
router.get('/getGroups', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const member = await Member.findOne({email: req.user.email})
        const memberGroups = member.memberGroups
        const adminGroups = member.adminGroups
        groups = memberGroups.map((group)=>{
            if (adminGroups.includes(group.id)){
                return {
                    id: group.id,
                    name: group.name,
                    admin: true
                }
            } else {
                return {
                    id: group.id,
                    name: group.name,
                    admin: false
                }  
            }
        })
        if(groups.length === 0) {
            return res.status(400).json({groups: "You aren't a member of any group"})
        }
        res.send(groups)
            
    } catch (e) {
        res.status(400).send(e)
    }
}
)



// @route   GET /lookForGroup
// @desc    Look for group to join
// @access  Public
router.get('/lookForGroup', async (req, res) => {
    console.log(req.query)
    try {
        const group = await Group.findById(req.query.group)
        if(!group) {
            return res.status(400).json({groups: "Unfortunatelly there is no group to join"})
        }
        res.send(group)
            
    } catch (e) {
        res.status(400).send(e)
    }
}
)

module.exports = router;