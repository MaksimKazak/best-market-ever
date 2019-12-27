import Users from './Users';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(Users));