import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import AdminMenu from "../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product`
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getAllProducts();
    }
    fetchData();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="text-center">
              <h1>All Products</h1>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link
                    to={`/dashboard/admin/update-product/${p.slug}`}
                    key={p._id}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`data:${p.photo.contentType};base64,${p.base64Image}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <div className="row">
                          <div className="">Price: Rs {p.price}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Products;
