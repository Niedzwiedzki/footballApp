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
    let oneCompetionData = {};
    let url = `http://api.football-data.org/v2/competitions/${competition}/matches`;
    oneCompetionData.id = competition;
    try {
      const response = await r2(url, { headers }).response;
      const json = await response.json();
      oneCompetionData.matches = json;
      const competitionJSON = JSON.stringify(oneCompetionData);
      await fs.writeFileSync(
        `./competitions/${competition}/else.json`,
        competitionJSON
      );
    } catch (e) {
      console.log('error ' + e);
    }
  });
};

module.exports = updateJSONfiles;
