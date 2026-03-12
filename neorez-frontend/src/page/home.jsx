import React from "react";
import Hero from "../components/home/hero";
import Components from "../components/components";
import Navbar from "../components/layout/navbar";
import Faq from "../components/home/faq";
import Howitwork from "../components/home/howitwork";
import Templates from "../components/home/templates";
import UserReview from "../components/home/userReview";
import Pricing from "../components/home/pricing";
import Blog from "../components/home/blog";
import Features from "../components/home/features";
import Footer from "../components/layout/footer";
import SingleBlog from "./singleBlog";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.data && user.data.role === "Admin";
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Howitwork />
      <Templates />
      <UserReview />
      {!isAdmin && <Pricing />}
      <Blog />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
