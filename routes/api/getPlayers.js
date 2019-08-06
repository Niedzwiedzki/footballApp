const express = require('express');
const router = express.Router();
const passport = require('passport')

//Load member model
const Member = require('../../models/Member')


// @route   GET /getPlayers
// @desc    get all players from group
// @access  Private
router.get('/getPlayers', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log(req.query)
    try {
        const group = await Group.findById(req.query.id)

        if(!group) {
            return res.status(400).send("This group doesn't exist")
        }
        const groupMembers = group.members
        const checkMembership = groupMembers.filter(member => {
            return member.email === req.user.email 
        });

        if(checkMembership.length === 0) {
            return res.status(400).send("You aren't a member of this group")
        }
        res.send(groupMembers)
            
    } catch (e) {
        res.status(400).send(e)
    }
}
)


module.exports = router;