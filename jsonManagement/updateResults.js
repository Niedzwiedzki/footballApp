const fs = require('fs');
const Group = require('../models/Group');

const updateResults = () => {

};

const verifyOldResults = async () => {

  try {
    const competitions = fs.readdirSync('./competitions');
    const matchesToCheck = {};
    competitions.forEach(competition => {
      let oneCompetition = fs.readFileSync(`./competitions/${competition}/finished.json`, 'utf8')
      matchesToCheck[competition] = JSON.parse(oneCompetition)
    });

    const groups = await Group.find();
    groups.forEach(group => {
      group.members.forEach(member => {
        member.bets.forEach(bet => {
          if (bet.status == 'finished') {
            let relatedMatch = matchesToCheck[group.competitionId].filter((match) => {
              return match.id == bet.id
            })
            let relatedMatchResult = relatedMatch[0].result.fullTime

            //veryfing winner
            let winnerReal = relatedMatchResult.homeTeam - relatedMatchResult.awayTeam
            let winnerBet = bet.homeTeam - bet.awayTeam

            if (bet.homeTeam == relatedMatchResult.homeTeam && bet.awayTeam == relatedMatchResult.awayTeam) {
              console.log('3 points!')
              console.log(bet)
              console.log(relatedMatchResult)
            } else if ((winnerReal > 0 && winnerBet > 0) || (winnerReal < 0 && winnerBet < 0) || (winnerReal == 0 && winnerBet == 0)) {
              console.log('1 point!')
              console.log(bet)
              console.log(relatedMatchResult)
            } else {
              console.log('0 point')
              console.log(bet)
              console.log(relatedMatchResult)
            }

          }
        })
      })
    })
  } catch (e) {
    console.log(e)
  }

};

module.exports = { updateResults, verifyOldResults };
