import Portfolio from './Portfolio';
import {connect} from "react-redux";
import React from "react";

const mapStateToProps = state => ({
  user: state.user,
  products: state.products
});


export default connect(mapStateToProps)(React.memo(Portfolio));