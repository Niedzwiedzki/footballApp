const express = require('express');
const router = express.Router();
const passport = require('passport')
const fs = require('fs')


// @route   GET /getMatchesAndPlayers
// @desc    get all players from group
// @access  Private
router.get('/getMatchesAndPlayers', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        //prepare players
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
        //prepare matches
        const matches = await fs.readFileSync(`./competitions/_${req.query.competitionId}/matches.json`);
        const matchesParsed = JSON.parse(matches.toString())
        const matchesFiltred = {}
        const oneMember = group.members.filter(member => {
            return member._id == req.user.id
        })

        const matchesWithBet = matchesParsed.matches.map(match => {
            let bet = {homeTeam: '', awayTeam: ''}
            let betStatus = 'empty'
            const matchingBet = oneMember[0].bets.filter(bet => {
                return bet.id === match.id
            })

        //veryfing the score of prediction
        const matchingResult = oneMember[0].results.filter(result => {
                return result.id === match.id
            })
            let result = 0 
            if(matchingResult[0] && matchingResult[0].score == 1){
                result = 1
            } else if(matchingResult[0] && matchingResult[0].score == 3){
                result = 3
            }

            if(matchingBet.length > 0){
                bet = {homeTeam: matchingBet[0].homeTeam, awayTeam: matchingBet[0].awayTeam},
                betStatus = 'full'
            }
            return {
                ...match,
                bet,
                betStatus,
                betScore: result
            }
        })
        matchesFiltred.finished = matchesWithBet.filter(match => {
            return match.status === "FINISHED"
        })
        matchesFiltred.scheduled = matchesWithBet.filter(match => {
            return match.status === "SCHEDULED"
        })
        
        matchesFiltred.inPLay = matchesWithBet.filter(match => {
            return match.status === "IN_PLAY" || match.status === "PAUSED"
        })

        const matchesToSend = {finished: matchesFiltred.finished, scheduled: matchesFiltred.scheduled, inPlay: matchesFiltred.inPLay}


        // send player and matches
        res.send({matchesToSend, groupMembers})
            
    } catch (e) {
        res.status(400).send(e)
    }
}
)



module.exports = router;