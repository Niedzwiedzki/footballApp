import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';


const Joining = (state) => {
  let welcome = null;
    state.logout();
    useEffect(() => {
        if(window.location.href.includes("invitation")){
          const url_string = window.location.href
          const url = new URL(url_string);
          const group = url.searchParams.get("group");
              state.checkGroup(group)
        } 
      }, [])

      welcome = <h1 className="subtitle">Join group: {state.groupToJoin.name}</h1>
      return (
        <Fragment>{welcome}</Fragment>
        
        );
};

const mapStateToProps = state => {
    return {
      groupToJoin: state.getGroups.groupToJoin
    }
  }

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionTypes.logout()),
    checkGroup: (groupId) => dispatch(actionTypes.lookForGroup(groupId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Joining);