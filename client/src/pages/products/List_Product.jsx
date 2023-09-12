import React, { useEffect, useState } from "react";
import { formatMoney } from "../../utils/fomat";
import { FormPage } from "../../components/admin/manager-products/FormPage";
import { FormEdit } from "../../components/admin/manager-products/FormEdit";

export default function List_Product() {
  // Gọi API lấy thông tin tất cả sản phẩm
  const [products, setProducts] = useState([]);
  const [idE, setIdE] = useState(null);
  const [statusForm, setStatusForm] = useState(false);
  const [statusFormE, setStatusFormE] = useState(false);
  const loadData = () => {
    fetch("http://localhost:9171/products")
      .then((response) => response.json())
      .then((response) => setProducts(response))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    loadData();
  }, []);

  /**
   * @param {*} formatMoney Hàm fomat tiền tệ từ số hoặc chuỗi số sang định dạng vnd
   * @param {*} handleDelete Hàm xóa sản phẩm theo id của product
   * Author: Anizx9171 (11/9/2023)
   */

  const handleDelete = (id) => {
    fetch(`http://localhost:9171/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status == 200) {
          loadData();
        }
      })

      .catch((error) => console.log(error));
  };
  const handleEdit = (id) => {
    setIdE(id);
    setStatusFormE(!statusFormE);
  };
  return (
    <>
      {statusForm && (
        <FormPage setStatusForm={setStatusForm} loadData={loadData} />
      )}
      {statusFormE && (
        <FormEdit
          setStatusFormE={setStatusFormE}
          loadData={loadData}
          idE={idE}
          setIdE={setIdE}
        />
      )}
      <div className="container-product">
        <button
          className="btn btn-outline-primary"
          onClick={() => setStatusForm(!statusForm)}
        >
          Thêm
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Product From</th>
            <th scope="col" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((e, i) => (
            <tr key={e.id}>
              <th scope="row">{i + 1}</th>
              <td>{e.product_name}</td>
              <td>{formatMoney(e.price)}</td>
              <td>{e.from}</td>
              <td>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleEdit(e.id)}
                >
                  sửa
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(e.id)}
                >
                  xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
