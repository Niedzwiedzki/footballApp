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
      } else {
        console.log("cannot download data")
      }

    } catch (e) {
      console.log('error ' + e);
    }
  });
  console.log('updated');
};

module.exports = updateJSONfiles;

