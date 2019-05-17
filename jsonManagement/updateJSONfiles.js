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
    2021
  ];

  const headers = keys.footballAPIToken;
  availableCompetitions.forEach(async competition => {
    let elseMatches = [];
    let finishedMatches = [];
    let in_playMatches = [];
    let scheduledMatches = [];

    let url = `http://api.football-data.org/v2/competitions/${competition}/matches`;
    try {
      let response = await r2(url, { headers }).response;
      let json = await response.json();
      let matches = json.matches;

      if (matches !== undefined) {
        json.matches.forEach(match => {
          if (match.status == 'SCHEDULED') {
            scheduledMatches.push(match);
          } else if (match.status == 'FINISHED') {
            finishedMatches.push(match);
          } else if (match.status == 'IN_PLAY') {
            in_playMatches.push(match);
          } else {
            elseMatches.push(match);
          }
        });
      } else {
        console.log(`${competition} isn't available`);
      }
      await fs.writeFileSync(
        `./competitions/${competition}/else.json`,
        JSON.stringify(elseMatches)
      );
      await fs.writeFileSync(
        `./competitions/${competition}/finished.json`,
        JSON.stringify(finishedMatches)
      );
      await fs.writeFileSync(
        `./competitions/${competition}/in_play.json`,
        JSON.stringify(in_playMatches)
      );
      await fs.writeFileSync(
        `./competitions/${competition}/scheduled.json`,
        JSON.stringify(scheduledMatches)
      );
    } catch (e) {
      console.log('error ' + e);
    }
  });
  console.log('updated');
};

module.exports = updateJSONfiles;
