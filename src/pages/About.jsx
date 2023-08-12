import React from "react";
import Layout from "../components/Layout/Layout";
import Aboutus from "../assets/images/about.jpeg";

const About = () => {
  return (
    <Layout title="About us | Bobcom">
      <div className="about">
        <div className="about__image">
          <img src={Aboutus} alt="About img" />
        </div>
        <div className="about__details">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quis, cum, corrupti corporis tempore dignissimos porro quas vitae enim temporibus eos dolores, possimus culpa a sapiente? Illum, omnis nam. Recusandae maiores esse aut reprehenderit unde? Debitis cupiditate, odit, tempore placeat vitae sapiente numquam dolore omnis animi quaerat qui voluptatum nam?
        </div>
      </div>
    </Layout>
  );
};

export default About;
