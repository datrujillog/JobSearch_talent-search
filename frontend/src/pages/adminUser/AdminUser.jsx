import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ModalUser from "../../components/ModalUser";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { AuthContext } from "../../context/auth/authContext";
import { errormesage, successMessage } from "../../helpers/alertMessages";
import { createErrorMessage } from "../../helpers/responseErrorMessage";

export const AdminUser = () => {
  const { user } = useContext(AuthContext);
  const [loading, setloading] = useState(true);
  const [users, setUsers] = useState([]);
  const options = { headers: { Authorization: `Bearer ${user.token}` } };
  const [userEdit, setuserEdit] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const getUsers = async () => {
    setloading(true);
    try {
      const { data: response } = await axios.get(`user/`, options);
      setUsers(response.data);
    } catch (error) {
      setloading(false);
      console.error(error);
      const responseError = createErrorMessage(error);
      errormesage(responseError);
    }
    setloading(false);
  };

  const handleChangeStatus = async (id,status) => {
    setloading(true);
    try {
      const { data: response } = await axios.put(`/user/${id}`,{status:!status}, options);
      setloading(false);
      successMessage(response.message);
      getUsers();
    } catch (error) {
      console.error(error);
      const responseError = createErrorMessage(error);
      errormesage(responseError);
      setloading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <section className="admin-user mt-5">
        <h1 className="text-center">Admin users</h1>
        <table className="table table-dark table-hover text-center mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ROLE</th>
              <th scope="col">ESTATUS</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((element, index) => (
              <tr key={element._id}>
                <th scope="row">{index + 1}</th>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.role}</td>
                <td>{element.status ? "ACTIVE" : "INACTIVE"}</td>
                <td>
                  <div className="actions d-flex w-100 justify-content-evenly">
                    <button
                      className="btn btn-outline-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        setuserEdit(element);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    {element._id !== user.id && (
                      <button
                        className={`btn btn-outline-${element.status ? "danger":"success"}`}
                        onClick={() => {
                          handleChangeStatus(element._id,element.status);
                        }}
                      >
                        {element.status ? (
                          <i className="fa-solid fa-trash-can"></i>
                        ) : (
                          <i className="fa-solid fa-circle-check"></i>
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <ModalUser userEdit={userEdit} options={options} getUsers={getUsers} />
    </>
  );
};
