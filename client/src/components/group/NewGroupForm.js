import React from 'react';
import AvailableCompetition from './availableCompetition/AvailableCompetition'
import NewMember from './newMember/NewMember'


const NewGroupForm = (props) => {
  return (
    <div id="newgroup" className="collapse">
    <form onSubmit={props.submit}>
      <div className="form-group space" > 
        <label htmlFor="sel0">Name:</label>
        <input type="text" className="form-control" id="sel0" value={props.name} onChange={props.changeName}/>
      </div>
      <div className="form-group space" >
        <label htmlFor="sel1">Select competition:</label>
        <select onChange={props.select} value={props.selection} className="form-control" id="sel1">
        <option value='' disabled hidden>Choose here</option>
        {
          props.competitions.map(function(item){
              return <AvailableCompetition
              competition={item.name}
              id={item.id}
              key={item.id}/>;
          })
        }
    </select>
   </div>
   <label htmlFor="members">Invite members:</label>
   <div className="input-group mb-3">
      <input type="email" className="form-control" id="members" value={props.email} onChange={props.newMember}/>
      <div id="addButton" className="input-group-prepend">
          <span className="input-group-text" onClick={props.add}>+</span>
      </div>
   </div>
    {
     props.alertMessage
    }
   <button type="submit" className="btn btn-primary">Create and invite</button>
  </form>
  <ul className="list-group list-group-flush members">
        {
          props.newMembers.map(function(member, index){
              return <NewMember 
              email={member.name}
              key={index}
              removeMember={() => props.deleteInvitation(member.name)} />;
          })
        }
    </ul>
  </div> 
  );
};

export default NewGroupForm;