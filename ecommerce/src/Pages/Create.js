import React, { Fragment } from "react";
import Create from "../components/Create/Create";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const CreatePage = () => {
  return (
    <Fragment>
      <Header />
      <Create />
      <Footer />
    </Fragment>
  );
};

export default CreatePage;
