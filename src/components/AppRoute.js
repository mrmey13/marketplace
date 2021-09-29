import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import cs from "../const";
import ShopView from "../components/ShopView/ShopView";
import { getRole, getFunctionRoles } from "../service";
import { ToastProvider } from "react-toast-notifications";
import { useTranslation, withTranslation } from "react-i18next";
import ShopProfile from "./ShopProfile/ShopProfile";
import ShopSetting from "./ShopSettings/ShopSetting";

import MyAddresses from "./settings/MyAdresses";
import CreateProduct from "./Product/CreateProduct";
import ProductList from "./ProductList/ProductList";
import ProductCategory from "./ProductCategory/ProductCategory";
import ApproveProduct from './AllProducts/ApproveProduct';
import Attribute from "./Administration/AttributeManage/Attribute";
import AttributeManage from "./Administration/AttributeManage/AttributeManage";
import AllProducts from "./AllProducts/AllProducts";
import SellerProducts from "./SellerProducts/SellerProducts";
import ProductDetail from "./ProductList/ProductDetail";
import MyAccount from "./MyAccount/MyAccount";

import HomePage from "./HomePage/HomePage";
import ProductListHomePage from "./HomePage/ProductListHomePage";
import ProductListCategory from "./HomePage/ProductListCategory";
import EditProduct from "./Product/EditProduct";

const styles = (theme) => ({
  tableContainer: {
    height: 320,
  },
});

export class AppRoute extends Component {
  render(props) {
    const { t, i18n } = this.props;
    return (
      <ToastProvider autoDismissTimeout={5000} placement="bottom-center">
        <Route exact path="/" component={() => HomePage(t, i18n)} />
        <Route exact path="/shop_view" component={() => ShopView(t, i18n)} />
        <Route exact path="/products" component={() => ProductList(t, i18n)} />
        <Route
          exact
          path="/category/:name/:id"
          component={() => ProductListCategory(t, i18n)}
        />
        <Route
          // exact
          path="/shop/profile"
          component={() => ShopProfileArea(t, i18n)}
        />

        <Route
          exact
          path="/shop/setting"
          component={() => ShopSetting(t, i18n)}
        />
        <Route
          exact
          path="/product_detail/:productId"
          component={() => ProductDetail(t, i18n)}
        />

        <Route exact path="/my_account" component={() => MyAccount(t, i18n)} />

        {/* Administration */}
        <Route exact path="/attribute/list" component={Attribute} />
        <Route exact path="/attribute/config" component={AttributeManage} />

        {/* Product */}
        <Route exact path="/product/new" component={CreateProduct} />

        {/* Settings */}
        <Route exact path="/settings/address" component={MyAddresses} />

        <Route exact path="/product/category" component={ProductCategoryArea} />

        <Route
          // exact
          path="/product-list/:type"
          component={() => AllProductsArea(t, i18n)}
        />

        <Route
          // exact
          path="/seller-product-list/:type"
          component={() => SellerProductsArea(t, i18n)}
        />

        <Route
          // exact
          path="/product/edit/:productId"
          component={EditProduct}
        />
      </ToastProvider>
    );
  }
}

const DashboardArea = (t, i18n) => (
  <div>
    <Typography component="div" className={styles.tableContainer}>
      {/* E-Training Home */}
      {/* {t("app_route.dashboard")} */}
      <HomePage />
    </Typography>
  </div>
);

const ShopProfileArea = (t, i18n) => (
  <div>
    <Typography component="div" className={styles.tableContainer}>
      {/* E-Training Home */}
      {t("app_route.shop-profile")}
      <ShopProfile />
    </Typography>
  </div>
);

const ProductCategoryArea = (props) => (
  <div>
    <Typography component="div" className={styles.tableContainer}>
      ProductCategory
      {/* {t("app_route.shop-profile")} */}
      <ProductCategory {...props} />
    </Typography>
  </div>
);

const AllProductsArea = (t, i18n) => (
  <div>
    <Typography component="div" className={styles.tableContainer}>
      {/* ProductCategory */}
      {/* {t("app_route.shop-profile")} */}
      <AllProducts />
    </Typography>
  </div>
);

const SellerProductsArea = (t, i18n) => (
  <div>
    <Typography variant="h5" gutterBottom component="h2">
      {t("all_products.title")}
    </Typography>
    <div className={styles.tableContainer}>
      <SellerProducts />
    </div>
  </div>
);

// const ShopSetting = (t, i18n) => (
//   <div>
//     <Typography component="div" className={styles.tableContainer}>
//       {/* E-Training Home */}
//       {/* {t("app_route.shop-profile")} */}
//       <ShopSetting/>
//     </Typography>
//   </div>
// );

export default withTranslation()(AppRoute);
