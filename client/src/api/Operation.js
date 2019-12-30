import axios from 'axios';

class Operation {
  static async list(params) {
    let res = await axios.get( '/api/operation', { params });
    return res.data || [];
  }

  static async profit(params) {
    let res = await axios.get( '/api/operation/profit', { params });
    return res.data || [];
  }

  static async recentActivities(params) {
    let res = await axios.get( '/api/operation/recent-activities', { params });
    return res.data || [];
  }
}

export default Operation;