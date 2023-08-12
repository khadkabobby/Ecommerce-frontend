import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import AdminMenu from "../components/Layout/AdminMenu";
import { Select } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState(false);

  const navigate = useNavigate();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  const handleCreateButton = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      console.log(productData);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/create-product`,
        productData
      );
      {
        data && console.log(data);
      }
      if (data?.success) {
        setTimeout(() => {
          toast.success(data.message);
        }, 2000);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating product");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 mt-2">
            <h4>Create Product</h4>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 d-flex"
                onChange={(value) => {
                  setCategory(value);
                }}
                style={{ cursor: "pointer" }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id} className="m-1">
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write a prduct name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Write description of the product"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Write a price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Write quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <Select
                bordered={false}
                placeholder="Select shipping"
                size="large"
                showSearch
                className="form-select mb-3 d-flex"
                value={shipping}
                onChange={(value) => {
                  setShipping(value);
                }}
                style={{ cursor: "pointer" }}
              >
                <Option value={false} className="m-1">
                  No
                </Option>
                <Option value={true} className="m-1">
                  Yes
                </Option>
              </Select>
            </div>
            <div className="mb-3 text-center w-75">
              <button className="btn btn-primary" onClick={handleCreateButton}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateProduct;
