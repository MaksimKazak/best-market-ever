import axios from 'axios';

class User {
  static async register(params) {
    let res = await axios.post( 'http://localhost:5000/api/user', params);
    return res.data || [];
  }
}

export default User;