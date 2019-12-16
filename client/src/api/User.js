import axios from 'axios';

class User {
  static async register(params) {
    let res = await axios.post( '/api/user', params);
    return res.data || [];
  }

  static async login(params) {
    let res = await axios.post( 'http://localhost:5000/api/user/login', params); // TODO: remove absolute path and fix /api/user/login POST request with proxy
    return res.data || [];
  }
}

export default User;