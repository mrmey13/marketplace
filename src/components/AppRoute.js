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
import AllProducts from "./AllProducts/AllProducts";
import ApproveProduct from "./AllProducts/ApproveProduct";
import ProductDetail from "./ProductList/ProductDetail";

const styles = (theme) => ({
  tableContainer: {
    height: 320,
  },
});

export class AppRoute extends Component {
  constructor(props) {
    super(props);
    // console.log("AppRoute props", props);
  }
  render(props) {
    const { t, i18n } = this.props;
    return (
      <ToastProvider autoDismissTimeout={5000} placement="bottom-center">
        <Route exact path="/" component={() => DashboardArea(t, i18n)} />
        <Route exact path="/shop_view" component={() => ShopView(t, i18n)} />
        <Route exact path="/products" component={() => ProductList(t, i18n)} />
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
          path="/product_detail"
          component={() => ProductDetail(t, i18n)}
        />

        <Route
          exact
          path="/shop/setting"
          component={() => ShopSetting(t, i18n)}
        />

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

        {/* <Route
          exact
          path="/approve-product/:productId"
          component={ApproveProduct}
        /> */}
      </ToastProvider>
    );
  }
}

const DashboardArea = (t, i18n) => (
  <div>
    <Typography component="div" className={styles.tableContainer}>
      {/* E-Training Home */}
      {t("app_route.dashboard")}
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
