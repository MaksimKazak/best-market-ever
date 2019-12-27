import RecentActivities from './RecentActivities';
import { connect } from "react-redux";

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(RecentActivities);