import React, { useState } from "react";

export default function FormAdd({ setFormA }) {
  const [gender, setGender] = useState(0);
  const [user, setUser] = useState({
    user_name: "",
    address: "",
    email: "",
    dateOfBith: "",
    password: "",
  });
  const listUser = [
    {
      id: 0,
      title: "Nam",
    },
    {
      id: 1,
      title: "Nữ",
    },
    {
      id: 2,
      title: "Khác",
    },
  ];
  return (
    <>
      <div className="container-1">
        <form className="form-container">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Thêm mới tài khoản</h3>
            <button
              type="button"
              onClick={() => setFormA(false)}
              className="btn btn-secondary"
            >
              X
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">Tên</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <div className="d-flex gap-3">
              {listUser.map((genders) => (
                <div className="form-check" key={genders.id}>
                  <input
                    checked={genders.id === gender}
                    onChange={() => setGender(genders.id)}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                  />
                  <label className="form-check-label">{genders.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày sinh</label>
            <input type="date" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input type="password" className="form-control" />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button type="submit" className="btn btn-secondary">
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
