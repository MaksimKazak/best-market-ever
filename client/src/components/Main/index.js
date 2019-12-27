import Main from './Main';
import React from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  user: state.user
});

export default  React.memo(connect(mapStateToProps)(Main));