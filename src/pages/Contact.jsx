import React from "react";
import Layout from "../components/Layout/Layout";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephoneInbound, BsHeadset } from "react-icons/bs";
import ContactUsImage from "../assets/images/contactus.jpeg";

const Contact = () => {
  return (
    <Layout title="Contact us | Bobocom">
      <div className="contactpage">
        <div className="image">
          <img src={ContactUsImage} alt="contact image" />
        </div>
        <div className="contact__details">
          <h1 className="heading">contact us</h1>
          <p>
            Any query and info about product feel free ot call anytime we 24X7
            available.
          </p>
          <div className="details">
            <p>
              <AiOutlineMail /> : www.help@bobcom.com
            </p>
            <p>
              <BsTelephoneInbound /> : 01-4545454
            </p>
            <p>
              <BsHeadset /> : 1601 123456789
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
