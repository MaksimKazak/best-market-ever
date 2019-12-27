import Cookies from 'js-cookie';
import axios from 'axios';
import UserApi from '../../api/User';
import { actions } from './userSlice';
import { toast } from "react-toastify";

const login = () => (dispatch) => {
  let token = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    return UserApi.current()
      .then(
        res => dispatch(actions.setUser(res.user)),
        err => err.response && toast(err.response.data.message)
      );
  }
  return Promise.resolve();
};

export default login;