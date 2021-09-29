import React from "react";
import CategoryHomePage from "./CategoryHomePage";
import ProductListHomePage from "./ProductListHomePage";
function HomePage() {
  return (
    <div
      className="container home-page-container d-flex justify-content-center flex-column"
      style={{ minWidth: "1420px" }}
    >
      <CategoryHomePage />
      <ProductListHomePage />
    </div>
  );
}

export default HomePage;
