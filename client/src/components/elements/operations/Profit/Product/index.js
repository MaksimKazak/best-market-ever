import Product from './Product';
import React from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  user: state.user
});

export default React.memo(connect(mapStateToProps)(Product));