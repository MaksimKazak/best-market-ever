import axios from 'axios';

class Operation {
  static async list(params) {
    let res = await axios.get( '/api/operation', { params });
    return res.data || [];
  }
}

export default Operation;