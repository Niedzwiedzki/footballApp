import React, { Fragment, useState } from 'react';
import Ball from '../staticElements/Ball'
import CompetitionGroup from '../group/CompetitionGroup'
import NewGroupForm from '../group/NewGroupForm'

const Dashboard = () => {

    const [groupData, setFormData] = useState({
        groups: [
            {
                name: "Mistrzostwa",
                id: "asfasd234rq4rf"
            },
            {
                name: "Mistrzostwa u Janka",
                id: "aasd234rq4rf"
            },
            {
                name: "Liga w pracy",
                id: "asfwwwd234rq4rf"
            },
            {
                name: "Gramy razem",
                id: "asfwwwd234rq4rf"
            },
            {
                name: "Champions League",
                id: "asfwwwd234rq4rf"
            }
        ]

    })
    let { groups } = groupData;

    return (
        <Fragment>
            <div className="col-sm-6 height-lg">
                <h3>Your groups</h3>
                <div className="flex-container">
                {
                groups.map(function(item, index){
                    return <CompetitionGroup
                    name={item.name}
                    key={item.id}/>;
                })
                }
                </div>
                <hr className="space"/>
                <button type="button" className="btn btn-primary btn-lg" data-toggle="collapse" data-target="#newgroup">Create new group</button>
                <NewGroupForm />
            </div>
            <div className="col-sm-6">
                <Ball />
            </div>
        </Fragment>
      );



  };
  
  export default Dashboard;