import React from 'react';



const NewGroupForm = (props) => {
  return (
    <div id="newgroup" className="collapse">
    <form>
      <div className="form-group space" >
        <label for="sel1">Select competition:</label>
        <select className="form-control" id="sel1">
          <option>Champions League</option>
          <option>World Cup</option>
          <option>Copa America</option>
          <option>Premier League</option>
    </select>
   </div>
   <label for="members">Invite members:</label>
   <div className="input-group mb-3">
      <input type="text" className="form-control" id="members"/>
      <div className="input-group-prepend">
          <span className="input-group-text">+</span>
      </div>
   </div>
   <button type="submit" className="btn btn-primary">Create and invite</button>
  </form>
  <ul className="list-group list-group-flush members">
      <li className="list-group-item">jakub.niedzwiedzki@gmail.com</li>
      <li className="list-group-item">test@test.com</li>
      <li className="list-group-item">kuban@op.pl</li>
    </ul>
  </div> 
  );
};

export default NewGroupForm;