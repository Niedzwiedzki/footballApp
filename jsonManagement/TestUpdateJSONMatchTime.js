const fs = require('fs');
const Group = require('../models/Group');

const TestUpdateJSONMatchTime = async () => {
  // const availableCompetitions = [2000, 2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021];

  // var checkCloseMatches = (match) => {
  //   let matchDate = new Date(match.utcDate);
  //   let currentDate = new Date()
  //   let timeDifference = matchDate.getTime() - currentDate.getTime()
  //   return timeDifference < 600000 && match.status != "FINISHED" && match.status != "AWARDED"
  // }
  // const headers = keys.footballAPIToken;

  // availableCompetitions.forEach(async competition => {
    // let oneCompetition = fs.readFileSync(`./competitions/_${competition}/matches.json`, 'utf8')
    // let competitionJSON = JSON.parse(oneCompetition)
    // let currentMatches = competitionJSON.matches.filter(checkCloseMatches)
    // if (currentMatches.length > 0) {
      // let url = `http://api.football-data.org/v2/competitions/${competition}/matches`;
      try {
        let json = fs.readFileSync(`competitions/_3000/matches.json`);
        let matches = JSON.parse(json);
        const groups = await Group.find({competitionId: "3000"});
        groups.forEach(async group => {
          let groupToUpdate = await Group.findById(group._id);
          groupToUpdate.members.forEach(member => {
            member.bets.forEach(bet => {
              if (bet.status == 'scheduled') {
                let relatedMatch = matches.matches.filter((match) => {
                  return match.id == bet.id
                })
                if (relatedMatch[0].status != "SCHEDULED") {
                  let relatedMatchResult = relatedMatch[0].score.fullTime
                  //veryfing winner
                  let winnerReal = relatedMatchResult.homeTeam - relatedMatchResult.awayTeam
                  let winnerBet = bet.homeTeam - bet.awayTeam
                  let result;
                  if (bet.homeTeam == relatedMatchResult.homeTeam && bet.awayTeam == relatedMatchResult.awayTeam) {
                    console.log('3 points!')
                    console.log(bet)
                    console.log(relatedMatchResult)
                    result = 3;
                  } else if ((winnerReal > 0 && winnerBet > 0) || (winnerReal < 0 && winnerBet < 0) || (winnerReal == 0 && winnerBet == 0)) {
                    console.log('1 point!')
                    console.log(bet)
                    console.log(relatedMatchResult)
                    result = 1;
                  } else {
                    console.log('0 point')
                    console.log(bet)
                    console.log(relatedMatchResult)
                    result = 0;
                  }
                  if (relatedMatch[0].status == "FINISHED") {
                    bet.status = 'finished';
                  }
                  member.results[relatedMatch[0].id] = {homeTeam: bet.homeTeam, awayTeam: bet.awayTeam, status: relatedMatch[0].status, score: result}
                }
              }
            })
          })
          await groupToUpdate.markModified('members');
          await groupToUpdate.save();
        })
        
      } catch (e) {
        console.log('error ' + e);
      }
    // }

  // });

};

module.exports = TestUpdateJSONMatchTime;