const express = require('express');
const router = express.Router();
const passport = require('passport');
const fs = require('fs');

//Load member model
const Group = require('../../models/Group');

// @route   POST /invitenewmembers
// @desc    invite new member
// @access  Private
router.get('/shownextmatches', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const groupId = req.body.group;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(400).json({ group: 'this group do not exist' });
    }

    //check membership
    let membership = false;
    let searchedMember;
    group.members.forEach(member => {
      if (member._id.toString() === req.user._id.toString()) {
        searchedMember = member;
        return (membership = true);
      }
    });
    if (!membership) {
      return res
        .status(400)
        .json({ group: 'You are not a member of this group' });
    }
    console.log('ok')
    const allMatches = fs.readFileSync(`./competitions/_${group.competitionId}/matches.json`, 'utf8')
    const allMatchesParsed = JSON.parse(allMatches)
    const scheduledMatches = allMatchesParsed.matches.filter(match => {
      return match.status === 'SCHEDULED';
    });
    // show your predictions
    // scheduledMatches.forEach(match => {
    //   searchedMember.bets.forEach(bet => {
    //     if (match.id == bet.id) {
    //       match.yourPrediction = bet;
    //     }
    //   });
    // });

    res.send(scheduledMatches);
  } catch (e) {
    res.status(400).send(e);
  }
}
);

// @route   GET /showfinishedmatches
// @desc    Show finished matches
// @access  Private
router.get(
  '/showfinishedmatches',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const groupId = req.body.group;
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(400).json({ group: 'this group do not exist' });
      }
      //check membership
      let membership = false;
      let searchedMember;
      group.members.forEach(member => {
        if (member._id.toString() === req.user._id.toString()) {
          searchedMember = member;
          return (membership = true);
        }
      });
      if (!membership) {
        return res
          .status(400)
          .json({ group: 'You are not a member of this group' });
      }

      const allMatches = fs.readFileSync(`./competitions/_${group.competitionId}/matches.json`, 'utf8')
      const allMatchesParsed = JSON.parse(allMatches)
      const finishedMatches = allMatchesParsed.matches.filter(match => {
        return match.status === 'FINISHED';
      });

      // show your predictions
      // finishedMatches.forEach(match => {
      //   searchedMember.bets.forEach(bet => {
      //     if (match.id == bet.id) {
      //       match.yourPrediction = bet;
      //     }
      //   });
      // });

      res.send(finishedMatches);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// @route   POST /predictresults
// @desc    Show finished matches
// @access  Private
router.post(
  '/predictresults',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log(req.body.id, req.body.homeBet, req.body.awayBet, req.body.group, req.user._id)
    const groupId = req.body.group;
    const predictions = {
      id: req.body.id,
      homeTeam: req.body.homeBet,
      awayBet: req.body.awayBet,
      status: "scheduled"
    }
    // const predictions = req.body.predictions;
    // predictions.status = "scheduled"
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(400).json({ group: 'this group do not exist' });
      }
      //check membership
      let membership = false;

      group.members.forEach(member => {
        if (member._id.toString() === req.user._id.toString()) {
          membership = true;

          member.bets = member.bets.filter(bet => {
            return bet.id !== predictions.id;
          });

          return member.bets.push(predictions);
        }
      });
      if (!membership) {
        return res.status(400).json({ group: 'You are not a member of this group' });
      }
      const allMatches = fs.readFileSync(`./competitions/_${group.competitionId}/matches.json`, 'utf8');
      const parsedMatches = JSON.parse(allMatches)
      const scheduledMatches = parsedMatches.matches.filter(match => {
        return match.status == "SCHEDULED" && match.id == predictions.id
      })
      if (!scheduledMatches) {
        return res
          .status(400)
          .json({ group: 'You cannot bet for finished matches' });
      }
      
      await group.markModified('members');
      await group.save();
      res.send(group);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;
