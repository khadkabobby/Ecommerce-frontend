import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout title="go back - page not found">
      <div className="notfoundpage">
        <h1>404</h1>
        <p>Oops ! Page Not Found</p>
        <Link to="/">
          <button>Go Back to Home page</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
