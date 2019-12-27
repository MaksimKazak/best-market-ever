import Operations from './Operations';
import { connect } from "react-redux";

const mapStateToProps = state => ({
  user: state.user,
  products: state.products
});

export default connect(mapStateToProps)(Operations);