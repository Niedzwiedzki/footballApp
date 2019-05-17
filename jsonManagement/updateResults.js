const fs = require('fs');

const verifyOldResults = () => {

};

const updateResults = () => {
  const competitions = fs.readdirSync('./competitions');
  const matchesToCheck = {};
  competitions.forEach(competition => {
    let oneCompetition = fs.readFileSync(`./competitions/${competition}/scheduled.json`, 'utf8')
    matchesToCheck[competition] = JSON.parse(oneCompetition)
    console.log(matchesToCheck)
  });
};

module.exports = { updateResults, verifyOldResults };
