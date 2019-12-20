import axios from 'axios';

class Product {
  static async list(params) {
    let res = await axios.get( '/api/product', { params });
    return res.data || [];
  }
}

export default Product;