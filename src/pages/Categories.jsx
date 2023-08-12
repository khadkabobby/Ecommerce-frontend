import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
    const categories =useCategory();
  return (
    <Layout>
        <div className="container-fluid mt-3 mb-3">
            <div className="row">
                <div className="md-col-6 d-flex justify-content-between ms-auto">
                    {categories?.map((c)=>(
                        <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default Categories;
