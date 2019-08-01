import React from 'react';



const AvailableCompetition = (props) => {
  return (
    <option value={props.id}>{props.competition}</option>
  );
};

export default AvailableCompetition;