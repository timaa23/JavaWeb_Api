import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import { ICategoryItem } from "./store/types";

const CategoryList = () => {
  const { list } = useTypedSelector((store) => store.category);
  const dispatch = useDispatch();
  useEffect(() => {
    http.get<Array<ICategoryItem>>("api/categories").then((resp) => {
      dispatch({ type: "CATEGORY_LIST", payload: resp.data });
    });
  });
  const data = list.map((category) => (
    <tr className="bg-white border-b" key={category.id}>
      <td className="px-6 py-4">{category.id}</td>
      <td className="px-6 py-4">{category.name}</td>
    </tr>
  ));
  return (
    <>
      <div
        className="relative overflow-x-auto"
        style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}
      >
        <table className="w-6/12 text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryList;
