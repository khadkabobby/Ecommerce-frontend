import React from "react";
import Layout from "../components/Layout/Layout";
import ContactUsImage from "../assets/images/contactus.jpeg";

const Policy = () => {
  return (
    <Layout title="Policy | Bobcom">
      <div className="contactpage">
        <div className="image">
          <img src={ContactUsImage} alt="contact image" />
        </div>
        <div className="contact__details">
          <h1 className="heading">privacy policy</h1>
          <p>add privacy policy Lorem ipsum dolor sit.</p>
          <div className="details">
            <p>add privacy policy Lorem ipsum dolor sit.</p>
            <p>add privacy policy Lorem ipsum dolor sit.</p>
            <p>add privacy policy Lorem ipsum dolor sit.</p>
            <p>add privacy policy Lorem ipsum dolor sit.</p>
            <p>add privacy policy Lorem ipsum dolor sit.</p>
            <p>add privacy policy Lorem ipsum dolor sit.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
