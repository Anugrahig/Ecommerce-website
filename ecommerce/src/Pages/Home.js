import React from "react";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Posts from "../components/Posts/Posts";
import ShopybyCategory from "../components/ShopybyCategory/ShopybyCategory";
import Slider from "../components/Slider/Slider";

const Home = () => {
  return (
    <div>
      <Header />
      <ShopybyCategory />
      <Banner />
      <Slider />
      <Footer />
    </div>
  );
};

export default Home;
