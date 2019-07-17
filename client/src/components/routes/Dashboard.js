import React, { Fragment, useState } from 'react';
import Ball from '../staticElements/Ball'
import CompetitionGroup from '../group/CompetitionGroup'
import NewGroupForm from '../group/NewGroupForm'

const Dashboard = () => {

    const [groupData, setGroupData] = useState({
        groups: [
            {
                name: "Mistrzostwa",
                id: "asfasxcvxcd234rq4rf"
            },
            {
                name: "Mistrzostwa u Janka",
                id: "aasd234rq3214rf"
            },
            {
                name: "Liga w pracy",
                id: "asfwwwd234r434q4rf"
            },
            {
                name: "Gramy razem",
                id: "asfwwwd2d34rq4rf"
            },
            {
                name: "Champions League",
                id: "asfwwwd234rq4rf"
            }
        ]

    })
    let { groups } = groupData;

    const [competitionData, setCompetitionData] = useState({
        competition: [
            {
                name: "World Cup",
                id: "2001"
            },
            {
                name: "Champions League",
                id: "2002"
            },
            {
                name: "EURO",
                id: "2003"
            },
            {
                name: "UEFA",
                id: "2004"
            },
            {
                name: "COPA AMERICA",
                id: "2006"
            }
        ]

    })

    let { competition } = competitionData;



    const [formData, setFormData] = useState({
        selectedCompetition: null,
        invitedFriends: [],
        newFriend: ''
    })

    let { selectedCompetition, invitedFriends, newFriend } = formData;

    const selectCompetition = (e) => {
        setFormData({ ...formData, selectedCompetition: e.target.value })
    }

    const NewMemberEmail = (e) => {
        setFormData({ ...formData, newFriend: e.target.value })
    }

    const addMember = () => {
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const checkEmail = emailPattern.test(String(newFriend).toLowerCase());
        if (checkEmail){
            const updatedFriends = invitedFriends;
            updatedFriends.push({name: newFriend})
            setFormData({ ...formData, newFriend: '', invitedFriends: updatedFriends})
        } else {
            console.log("doesn't work")  
        }  
    }
    const removeFromList = (friend) => {
        const friendRemoved = invitedFriends.filter(person => {
            return person.name != friend
        })
        setFormData({ ...formData, invitedFriends: friendRemoved})
    }



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
                <NewGroupForm 
                competitions={competition} 
                select={selectCompetition} 
                email={newFriend} 
                newMember={NewMemberEmail} 
                add={addMember} 
                newMembers={invitedFriends}
                deleteInvitation={removeFromList}
                />
            </div>
            <div className="col-sm-6">
                <Ball />
            </div>
        </Fragment>
      );



  };
  
  export default Dashboard;