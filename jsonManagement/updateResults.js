// const fs = require('fs');
// const Group = require('../models/Group');

// const verifyOldResults = () => {

// };

// const updateResults = async () => {

//   try {
//     // const competitions = fs.readdirSync('./competitions');
//     // const matchesToCheck = {};
//     // competitions.forEach(competition => {
//     //   let oneCompetition = fs.readFileSync(`./competitions/${competition}/matches.json`, 'utf8')
//     //   matchesToCheck[competition] = JSON.parse(oneCompetition)
//     // });

//     const groups = await Group.find({competitionId: competition});
//     groups.forEach(group => {
//       group.members.forEach(member => {
//         member.bets.forEach(bet => {
//           if (bet.status == 'scheduled') {
//             let relatedMatch = currentMatches.filter((match) => {
//               return match.id == bet.id
//             })
//             if (relatedMatch[0].status != "SCHEDULED") {
//               let relatedMatchResult = relatedMatch[0].score.fullTime
//               //veryfing winner
//               let winnerReal = relatedMatchResult.homeTeam - relatedMatchResult.awayTeam
//               let winnerBet = bet.homeTeam - bet.awayTeam

//               if (bet.homeTeam == relatedMatchResult.homeTeam && bet.awayTeam == relatedMatchResult.awayTeam) {
//                 console.log('3 points!')
//                 console.log(bet)
//                 console.log(relatedMatchResult)
//               } else if ((winnerReal > 0 && winnerBet > 0) || (winnerReal < 0 && winnerBet < 0) || (winnerReal == 0 && winnerBet == 0)) {
//                 console.log('1 point!')
//                 console.log(bet)
//                 console.log(relatedMatchResult)
//               } else {
//                 console.log('0 point')
//                 console.log(bet)
//                 console.log(relatedMatchResult)
//               }
//               if (relatedMatch[0].status == "FINISHED") {
//                 bet.status = 'finished';
//               }
//             }
//           }
//         })
//       })
//     })

//   } catch (e) {
//     console.log(e)
//   }

// };

// module.exports = { updateResults, verifyOldResults };
