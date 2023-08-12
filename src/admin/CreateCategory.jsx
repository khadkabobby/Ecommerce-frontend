import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import AdminMenu from "../components/Layout/AdminMenu";
import CategoryForm from "../components/forms/CategoryForm";
import { toast } from "react-hot-toast";
import { Modal } from "antd";
import axios from "axios";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selected, setSelected] = useState(null);

  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/category/delete-category/${id}`
      );
      console.log(data);
      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while deleting");
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();

    console.log(selected);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/category/update-category/${selected}`,
        { name: updateName }
        );
        console.log(data);
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
        setVisible(false);
        setUpdateName("");
        setSelected(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while editingdddd");
    }
  };

  const handleCategoryForm = async (e) => {
    e.preventDefault();
    console.log("handleCategoryForm called");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/category/create-category`,
        { name: categoryName }
      );
      console.log(data);
      if (data?.success) {
        toast.success("Category created successfully");
        setCategoryName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while creating new categories");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4> Manage Category</h4>
            <div className="p-3">
              <CategoryForm
                handleCategoryForm={handleCategoryForm}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
              />
            </div>
            {/* table */}
            <table className="table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Catagories</th>
                  <th scope="col" colSpan="2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, index) => (
                  <tr key={c._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{c.name}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdateName(c.name);
                          setSelected(c._id);
                          console.log(selected);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger ms-2"
                        onClick={() => handleDeleteCategory(c._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            footer={null}
            onCancel={() => setVisible(false)}
            open={visible}
          >
            <CategoryForm
              categoryName={updateName}
              setCategoryName={setUpdateName}
              handleCategoryForm={handleEditCategory}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
