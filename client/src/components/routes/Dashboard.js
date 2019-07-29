import React, { Fragment, useState, useEffect } from 'react';
import Ball from '../staticElements/Ball'
import CompetitionGroup from '../group/CompetitionGroup'
import NewGroupForm from '../group/NewGroupForm'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index'

const Dashboard = (state) => {

        useEffect(() => {
        if(state.groups.length === 0) {
            state.getGroups()
        }
        })


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
            return person.name !== friend
        })
        setFormData({ ...formData, invitedFriends: friendRemoved})
    }



    return (
        <Fragment>
            <div className="col-sm-6 height-lg">
                <h3>Your groups</h3>
                <div className="flex-container">
                {
                state.groups.map(function(item){
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
  
  const mapStateToProps = state => {
    return {
      groups: state.getGroups.groups
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {
      getGroups: () => dispatch(actionTypes.getGroups())
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);