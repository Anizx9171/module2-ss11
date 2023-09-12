import React, { useEffect, useState } from "react";
import { message, notification } from "antd";
export const FormEdit = ({ setStatusFormE, loadData, idE }) => {
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    from: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9171/products/${idE}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.status === 200) {
          notification.success({
            message: "cập nhật sản phẩm thành công",
          });
          setStatusFormE(false);
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetch(`http://localhost:9171/products/${idE}`)
      .then((response) => response.json())
      .then((response) => setProduct(response))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="form-container">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Tên sản phẩm
              </label>
              <input
                value={product.product_name}
                onChange={handleChange}
                name="product_name"
                type="text"
                className="form-control"
                id="productName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Giá
              </label>
              <input
                value={product.price}
                onChange={handleChange}
                name="price"
                type="number"
                className="form-control"
                id="price"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="from" className="form-label">
                Xuất xứ
              </label>
              <input
                onChange={handleChange}
                value={product.from}
                name="from"
                type="text"
                className="form-control"
                id="from"
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
              <button
                onClick={() => setStatusFormE(false)}
                type="button"
                className="btn btn-danger"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
