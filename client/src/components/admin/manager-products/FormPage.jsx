import React, { useState } from "react";
import { message, notification } from "antd";
export const FormPage = ({ setStatusForm, loadData }) => {
  const [product, setProduct] = useState({
    product_name: "",
    price: "",
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
    fetch("http://localhost:9171/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.status === 201) {
          notification.success({
            message: "Thêm mới sản phẩm thành công",
          });
          setStatusForm(false);
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };
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
                name="from"
                type="text"
                className="form-control"
                id="from"
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm mới
              </button>
              <button
                onClick={() => setStatusForm(false)}
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
