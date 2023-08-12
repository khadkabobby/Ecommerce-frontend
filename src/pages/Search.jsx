import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout>
      <div className="text-center mt-3">
        <h1>Search Results</h1>
        <h4>
          {search?.results?.countTotal < 1
            ? `No products Found`
            : `Found ${search?.results?.countTotal} results`}
        </h4>

        <div className="d-flex flex-wrap mt-4">
          {search?.results?.products?.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`data:${p.photo.contentType};base64,${p.base64Image}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <div className="row">
                  <div className="">Price: Rs {p.price}</div>
                </div>
                <button className="btn btn-primary ms-1">See more</button>
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
          {console.log(search)}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
