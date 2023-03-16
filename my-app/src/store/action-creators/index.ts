import * as CategoryActionCreators from "../../components/category/store/actions";
import * as ProductActionCreators from "../../components/product/store/actions";
const actions = {
  ...CategoryActionCreators,
  ...ProductActionCreators,
};
export default actions;
