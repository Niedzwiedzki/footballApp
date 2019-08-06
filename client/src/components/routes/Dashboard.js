import React, { Fragment, useState, useEffect } from 'react';
import Ball from '../staticElements/Ball'
import CompetitionGroup from '../group/CompetitionGroup'
import NewGroupForm from '../group/NewGroupForm'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import axios from '../../axios';

const Dashboard = (state) => {

        useEffect(() => {
                state.getGroups(state.token)
                state.getCompetitions(state.token)
        }, [])





    const [formData, setFormData] = useState({
        selectedCompetition: '',
        invitedFriends: [],
        newFriend: '',
        invalidEmail: null,
        newGroupName: ''
    })

    let { selectedCompetition, invitedFriends, newFriend, invalidEmail, newGroupName } = formData;

    const updateName = (e) => {
        setFormData({ ...formData, newGroupName: e.target.value })
    }

    const selectCompetition = (e) => {
        setFormData({ ...formData, selectedCompetition: e.target.value })

    }

    const NewMemberEmail = (e) => {
        setFormData({ ...formData, newFriend: e.target.value })
    }

    const addMember = () => {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const checkEmail = emailPattern.test(String(newFriend).toLowerCase());
        if (checkEmail){
            const updatedFriends = [...invitedFriends];
            updatedFriends.push({name: newFriend})
            setFormData({ ...formData, newFriend: '', invitedFriends: updatedFriends, invalidEmail: null})
        } else {
        setFormData({ ...formData, invalidEmail: <p className="alert alert-danger space">
            <strong>Invalid Email</strong>
            </p> })
        
        
        }  
    }
    const removeFromList = (friend) => {
        const friendRemoved = invitedFriends.filter(person => {
            return person.name !== friend
        })
        setFormData({ ...formData, invitedFriends: friendRemoved})
    }

    const submitForm = (e) => {
        e.preventDefault();
        const invitedFriendsArray = invitedFriends.map(function(friend){
            return friend.name

        })
        const groupData = {
            invitedFriends: invitedFriendsArray,
            competitionId: Number(selectedCompetition),
            name: newGroupName
        }
        axios.post('/newgroup', groupData, 
        {headers: {
            "Authorization" : state.token,
            "Content-Type" : "application/json"
          }
        }
        )
        .then(response => {
            console.log(response)
            setFormData({ selectedCompetition: '', invitedFriends: [],newFriend: '',invalidEmail: null, newGroupName: '' })})
        .catch(err => {
            console.log(err.response)
        })
    }

    const select = (id) => {
        state.setGroup(id)
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
                    key={item.id}
                    status={item.admin}
                    selectGroup={() => select(item.id)}
                    />;
                })
                }
                </div>
                <hr className="space"/>
                <button type="button" className="btn btn-primary btn-lg" data-toggle="collapse" data-target="#newgroup">Create new group</button>
                <NewGroupForm 
                competitions={state.competitions}
                name={newGroupName}
                changeName={updateName}
                alertMessage={invalidEmail}
                select={selectCompetition}
                selection={selectedCompetition} 
                email={newFriend} 
                newMember={NewMemberEmail} 
                add={addMember} 
                newMembers={invitedFriends}
                deleteInvitation={removeFromList}
                submit={submitForm}
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
      groups: state.getGroups.groups,
      loggedIn: state.authentication.authStatus,
      token: state.authentication.token,
      competitions: state.getCompetitions.competitions
    }
  }


  
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getGroups: (token) => dispatch(actionTypes.getGroups(token)),
      getCompetitions: (token) => dispatch(actionTypes.getCompetitions(token)),
      setGroup: (id) => dispatch(actionTypes.setGroup(id))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);