const fs = require('fs');
const r2 = require('r2');
const keys = require('../config/keys');

const updateJSONfiles = () => {
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
    2021,
    3000
  ];

  const headers = keys.footballAPIToken;
  availableCompetitions.forEach(async competition => {


    let url = `http://api.football-data.org/v2/competitions/${competition}/matches`;
    try {
      let response = await r2(url, { headers }).response;
      let json = await response.json();
      let matches = json;
      if (matches.matches) {
        await fs.writeFileSync(
          `./competitions/_${competition}/matches.json`,
          JSON.stringify(matches)
        );

          
        const groups = await Group.find({competitionId: competition});
        groups.forEach(async group => {
          let groupToUpdate = await Group.findById(group._id);
          groupToUpdate.members.forEach(member => {
            member.bets.forEach(bet => {
              if (bet.status == 'finished') {
                let relatedMatch = matches.matches.filter((match) => {
                  return match.id == bet.id
                })
                if (relatedMatch.length > 0 && relatedMatch[0].status == "FINISHED") {
                  let relatedMatchResult = relatedMatch[0].score.fullTime
                  //veryfing winner
                  let winnerReal = relatedMatchResult.homeTeam - relatedMatchResult.awayTeam
                  let winnerBet = bet.homeTeam - bet.awayTeam
                  let result;
                  if (bet.homeTeam == relatedMatchResult.homeTeam && bet.awayTeam == relatedMatchResult.awayTeam) {
                    result = 3;
                  } else if ((winnerReal > 0 && winnerBet > 0) || (winnerReal < 0 && winnerBet < 0) || (winnerReal == 0 && winnerBet == 0)) {
                    result = 1;
                  } else {
                    result = 0;
                  }
                  member.results.push({homeTeam: bet.homeTeam, awayTeam: bet.awayTeam, status: relatedMatch[0].status, score: result, id:relatedMatch[0].id})
                }
              }
            })
          })
          await groupToUpdate.markModified('members');
          await groupToUpdate.save();
        })




      } else {
        console.log(`${competition} cannot download data`)
      }

    } catch (e) {
      console.log('error ' + e);
    }
  });
  console.log('updated');
};

module.exports = updateJSONfiles;

