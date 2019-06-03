const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const passport = require('passport');
const { sendInvitationEmail } = require('../../emails/account');
const r2 = require('r2');

//Load member model
const Member = require('../../models/Member');
const Group = require('../../models/Group');

// @route   GET /availablecompetitions
// @desc    Get available competitions
// @access  Private
router.get(
  '/availablecompetitions',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const url = 'http://api.football-data.org/v2/competitions';
    const headers = keys.footballAPIToken;
    const availableCompetitions = [];
    try {
      const response = await r2(url, { headers }).response;
      const json = await response.json();
      json.competitions.forEach(competition =>
        availableCompetitions.push(competition.id, competition.name)
      );
      res.send(availableCompetitions);
    } catch (e) {
      res.send(e);
    }
  }
);

// @route   POST /newgroup
// @desc    Create new group
// @access  Private
router.post(
  '/newgroup',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const to = req.body.invitedFriends;
    const competitionId = req.body.competitionId;
    const url = `http://api.football-data.org/v2/competitions/${competitionId}/matches`;
    const headers = keys.footballAPIToken;

    //Checking for availability of competition - limited access
    const availableCompetitions = [
      2000,
      2001,
      2002,
      2003,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2021
    ];
    if (!availableCompetitions.includes(competitionId)) {
      return res
        .status(400)
        .json({ group: 'You cannot organize a group for this competitions' });
    }

    const newMember = {
      name: req.user.name,
      email: req.user.email,
      _id: req.user._id,
      bets: []
    };

    try {
      const group = await Group.findOne({
        admin: req.user._id,
        name: req.body.name
      });
      if (group) {
        return res.status(400).json({ group: 'group already exists' });
      }


      const newGroup = new Group({
        competitionId: req.body.competitionId,
        name: req.body.name,
        admin: req.user._id,
        invitedFriends: to,
        members: newMember
      });

      const admin = await Member.findById(req.user.id);
      admin.adminGroups.push(newGroup._id);

      await newGroup.save();
      await admin.save();
      //Invite Friends
      console.log(to);
      if (newGroup.invitedFriends.length > 0) {
        await sendInvitationEmail(to, req.body.name, newGroup._id);
      }
      res.send(newGroup);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// @route   POST /invitenewmembers
// @desc    invite new member
// @access  Private
router.post(
  '/invitenewmembers',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const to = req.body.invitedFriends;
    try {
      const group = await Group.findOne({
        admin: req.user._id,
        name: req.body.name
      });

      if (!group) {
        return res.status(400).json({ group: 'this group do not exist' });
      }
      console.log(group.members)
      // checking if new users are already in group
      const memberAlreadyIn = [];

      await group.members.forEach(e1 =>
        to.forEach(e2 => {
          if (e1.email === e2) {
            memberAlreadyIn.push(e2);
          }
        })
      );

      if (memberAlreadyIn.length > 0) {
        return res.status(400).json({ group: `${memberAlreadyIn.toString().replace(',', ' and ')} already in group` });
      }
      console.log(to);
      await sendInvitationEmail(to, req.body.name, group._id);
      group.invitedFriends = group.invitedFriends.concat(to);
      await group.save();
      res.send(group);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;
