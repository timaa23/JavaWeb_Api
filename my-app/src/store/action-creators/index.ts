import * as CategoryActionCreators from "../../components/category/store/actions";
import * as ProductActionCreators from "../../components/product/store/actions";
import * as AuthActionCreators from "../../components/auth/store/actions";
import * as UserActionCreators from "../../components/user/store/actions";
const actions = {
  ...CategoryActionCreators,
  ...ProductActionCreators,
  ...AuthActionCreators,
  ...UserActionCreators,
};
export default actions;
