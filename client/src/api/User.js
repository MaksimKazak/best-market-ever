import axios from 'axios';

class User {
  static async register(params) {
    let res = await axios.post( '/api/user', params);
    return res.data || [];
  }

  static async login(params) {
    let res = await axios.post( '/api/user/login', params);
    return res.data || [];
  }
}

export default User;