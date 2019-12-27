import ProductApi from '../../api/Product';
import { actions } from './productsSlice';
import { toast } from "react-toastify";

const loadProducts = () => (dispatch) => {
  return ProductApi.list()
    .then(
      products => dispatch(actions.setProducts(products)),
      err => err.response && toast(err.response.data.message)
    );
};

export default loadProducts;