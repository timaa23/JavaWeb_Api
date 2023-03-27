import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Loader from "../../common/loader/Loader";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
  const category = useTypedSelector((store) => store.category.categoryList);
  const product = useTypedSelector((store) => store.product.product);
  const productList = useTypedSelector((store) => store.product.productList);
  const user = useTypedSelector((store) => store.user);
  return (
    <>
      {category.loading &&
      product.loading &&
      productList.loading &&
      user.loading ? (
        <Loader />
      ) : null}
      <DefaultHeader />
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default DefaultLayout;
