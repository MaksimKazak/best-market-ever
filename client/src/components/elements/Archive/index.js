import React from 'react';
import Archive from './Archive';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  products: state.products
});

export default connect(mapStateToProps)(React.memo(Archive));