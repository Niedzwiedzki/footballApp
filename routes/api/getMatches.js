const express = require('express');
const router = express.Router();
const passport = require('passport')
const fs = require('fs')

//Load member model
const Member = require('../../models/Member')


// @route   GET /getPlayers
// @desc    get all players from group
// @access  Private
router.get('/getMatches', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {

        const matches = await fs.readFileSync(`./competitions/_${req.query.competitionId}/matches.json`);
        const matchesParsed = JSON.parse(matches.toString())
        const matchesFiltred = {}
        matchesFiltred.finished = matchesParsed.matches.filter(match => {
            return match.status === "FINISHED"
        })
        matchesFiltred.scheduled = matchesParsed.matches.filter(match => {
            return match.status === "SCHEDULED"
        })
        res.send(matchesFiltred)
            
    } catch (e) {
        res.status(400).send(e)
    }
}
)


module.exports = router;