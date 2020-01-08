import Cookies from 'js-cookie';
import axios from 'axios';
import UserApi from '../../api/User';
import { actions, initialUser } from './userSlice';
import { toast } from "react-toastify";
import dbPromise from '../../idb';

const login = () => async dispatch => {
  let token = Cookies.get('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    return await UserApi.current()
      .then(
        res => dispatch(actions.setUser(res.user)),
        err => err.response && toast(err.response.data.message)
      );
  }
  const user = await getUserFromIdb();
  return user && dispatch(actions.setUser(user));
};

const logout = () => dispatch => {
  UserApi.logout().then(() => {
    Cookies.remove('token');
    dispatch(actions.setUser(initialUser));
  });
};

const getUserFromIdb = async () => {
  const db = await dbPromise;
  return await db.get('user', 'user');
};

export { login, logout };