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
        const groups = member.memberGroups
        if(groups.length === 0) {
            return res.status(400).json({groups: "You aren't a member of any group"})
        }
        res.send(groups)
            
    } catch (e) {
        res.status(400).send(e)
    }
}
)

module.exports = router;