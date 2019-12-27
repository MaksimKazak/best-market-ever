import Profit from './Profit';
import React from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  user: state.user,
  products: state.products
});

export default React.memo(connect(mapStateToProps)(Profit));