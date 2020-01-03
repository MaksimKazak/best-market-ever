import axios from 'axios';

class Operation {
  static async list(params) {
    let res = await axios.get( '/api/operation', { params });
    return res.data || [];
  }

  static async profit(params) {
    let res = await axios.get( 'http://localhost:5000/api/operation/profit', { params }); //TODO: fix proxy
    return res.data || [];
  }

  static async recent(params) {
    let res = await axios.get( 'http://localhost:5000/api/operation/recent', { params }); //TODO: fix proxy
    return res.data || [];
  }

  static async create(params) {
    let res = await axios.post( '/api/operation', params);
    return res.data || [];
  }
}

export default Operation;