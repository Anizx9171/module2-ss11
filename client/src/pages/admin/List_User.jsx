import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import FormAdd from "../../components/admin/manager-user/FormAdd";
export const List_User = () => {
  const [users, setUsers] = useState([]);
  const [formA, setFormA] = useState(false);
  const loadData = () => {
    axios
      .get("http://localhost:9171/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    loadData();
  }, []);

  const handelDelete = (id) => {
    axios
      .delete(`http://localhost:9171/users/${id}`)
      .then((response) => {
        if (response.status == 200) {
          notification.success({
            message: "Xóa thành công",
          });
        }
      })
      .catch((error) => console.log(error));
    loadData();
  };
  return (
    <>
      {formA && <FormAdd setFormA={setFormA} />}
      <div>
        <button className="btn btn-primary" onClick={() => setFormA(true)}>
          Thêm mới
        </button>
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Giới tính</th>
              <th className="text-center">Ngày sinh</th>
              <th className="text-center">Địa chỉ</th>
              <th className="text-center">Email</th>
              <th className="text-center">Password</th>
              <th className="text-center" colSpan={2}>
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.user_name}</td>
                <td>{e.Gender == 0 ? "Nam" : "Nữ"}</td>
                <td>{e.dateOfBith}</td>
                <td>{e.address}</td>
                <td>{e.email}</td>
                <td>{e.password}</td>
                <td>
                  <button className="btn btn-warning">Sửa</button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handelDelete(e.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
