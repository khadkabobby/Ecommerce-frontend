import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
const CatProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const { slug } = useParams();
  const navigate = useNavigate();
  //get category wise product
  const getCategoryProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/category-product/${slug}`
      );
      if (data?.success) {
        setCategory(data.category);
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    slug && getCategoryProduct();
  }, [slug]);

  return (
    <Layout>
      <div className="container-fluid mt-3 mb-3">
        <h2 className="text-center"> Category - {category?.name}</h2>
        <h6 className="text-center">{products.length} results found</h6>
        <div className="row">
          <div className="md-col-9">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`data:${p.photo.contentType};base64,${p.base64Image}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <div className="row">
                      <div className="">Price: Rs {p.price}</div>
                    </div>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      See more
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success(`product added into cart successfully`);
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CatProduct;
