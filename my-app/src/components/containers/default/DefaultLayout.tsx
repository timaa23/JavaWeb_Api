import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Loader from "../../common/loader/Loader";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
  const { category, product } = useTypedSelector((store) => store);
  return (
    <>
      {(category.categoryList.loading ||
        category.category.loading ||
        product.productList.loading ||
        product.product.loading) && <Loader />}
      <DefaultHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default DefaultLayout;
