import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import Loader from "../../common/loader/Loader";
import AdminHeader from "./AdminHeader";
import { useEffect } from "react";

const AdminLayout = () => {
  const { category, product } = useTypedSelector((store) => store);
  const { isAuth, user } = useTypedSelector((store) => store.user);
  const navigate = useNavigate();

  let isAdmin = false;

  if (isAuth && user) {
    isAdmin = user.roles.includes("admin");
  }

  useEffect(() => {
    if (!isAdmin) navigate("/login");
  }, []);

  return (
    <>
      {(category.categoryList.loading ||
        category.category.loading ||
        product.productList.loading ||
        product.product.loading) && <Loader />}
      <AdminHeader />

      <main>{isAdmin && <Outlet />}</main>
    </>
  );
};
export default AdminLayout;
