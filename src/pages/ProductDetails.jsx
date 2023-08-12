import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const { slug } = useParams();
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-product/${slug}`
      );
      if (data?.success) {
        setProduct(data?.product);
        product &&
          getSimilarProducts(data?.product._id, data?.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    slug && getSingleProduct();
  }, [slug]);

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/similar-products/${pid}/${cid}`
      );
      if (data?.success) {
        setRelatedProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container-fluid mt-2">
        <div className="col-md-6">
          <img
            src={`data:${product?.photo?.contentType};base64,${product?.base64Image}`}
            className="card-img-top"
            alt={product?.name}
            height="400"
            width="350px"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ${product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          <h6>Shipping: {product?.shipping ? "Available" : "Not available"}</h6>
          <button className="btn btn-secondary">Add to cart</button>
        </div>

        <div className="row mt-3 mb-3">
          <h5>Related Products</h5>
          {relatedProducts.length < 1 && <h3>No similar Products found</h3>}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
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
                    See More
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
    </Layout>
  );
};

export default ProductDetails;
