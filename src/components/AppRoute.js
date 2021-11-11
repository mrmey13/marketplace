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
import ApproveProduct from "./AllProducts/ApproveProduct";
import Attribute from "./Administration/AttributeManage/Attribute";
import AttributeManage from "./Administration/AttributeManage/AttributeManage";
import AllProducts from "./AllProducts/AllProducts";
import SellerProducts from "./SellerProducts/SellerProducts";
import ProductDetail from "./ProductList/ProductDetail";
import MyAccount from "./MyAccount/MyAccount";
import MyAddress from "./MyAccount/MyAddress";

import HomePage from "./HomePage/HomePage";
import ProductListHomePage from "./HomePage/ProductListHomePage";
import SellerProduct from "./SellerProducts/SellerProduct"
import ProductListCategory from "./HomePage/ProductListCategory";
import EditProduct from "./Product/EditProduct";
import ShopProductDetail from "./ProductList/ShopProductDetail";
import MyPassword from "./MyAccount/MyPassword";
import ShopDashboard from "./HomePage/ShopDashboard";

import Cart from "./Cart/Cart";
import BusinessInsights from "./DataAnalysis/BusinessInsights";
import BankAccounts from "./Finance/BankAccounts";
import ShopInfo from "./ShopInfo/ShopInfo";
import PlaceOrder from "./Cart/PlaceOrder";
import Payment from "./Cart/Payment";

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
        <Route exact path="/shop" component={() => ShopDashboard(t, i18n)} />
        <Route exact path="/shop_view" component={() => ShopView(t, i18n)} />
        <Route
          exact
          path="/seller/products"
          component={() => ProductList(t, i18n)}
        />
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
          path="/shop/setting"
          component={() => ShopSetting(t, i18n)}
        />
        <Route
          exact
          path="/seller/product_detail/:productId"
          component={() => ShopProductDetail(t, i18n)}
        />
        <Route
          exact
          path="/product_detail/:productId"
          component={ProductDetail}
        />

        <Route path="/my_account" component={() => MyAccount(t, i18n)} />
        <Route exact path="/user/address" component={MyAddress} />
        <Route exact path="/user/password" component={MyPassword} />

        {/* Administration */}
        <Route path="/attribute/list" component={Attribute} />
        <Route path="/attribute/config" component={AttributeManage} />

        {/* Product */}
        <Route path="/product/new" component={CreateProduct} />

        {/* Finance */}
        <Route path="/finance/wallet/card" component={BankAccounts} />

        {/* Data Analysis */}
        <Route exact path="/datacenter/:title" component={BusinessInsights} />
        <Route exact path="/datacenter/:title/:tab" component={BusinessInsights} />

        {/* Settings */}
        <Route path="/settings/address" component={MyAddresses} />

        <Route path="/product/category" component={ProductCategoryArea} />

        <Route
          // exact
          path="/product-list/:type"
          component={() => AllProductsArea(t, i18n)}
        />

        {/* <Route
          // exact
          path="/seller-product-list/:type"
          component={() => SellerProductsArea(t, i18n)}
        /> */}

        <Route
          // exact
          path="/product/list/:status"
          component={SellerProduct}
        />

        <Route
          // exact
          path="/product/edit/:productId"
          component={EditProduct}
        />

        {/* Shop (buyer) */}
        <Route exact path="/shop-detail/:shopCode" component={ShopInfo} />

        <Route exact path="/cart" component={Cart} />
        <Route exact path="/place-order" component={PlaceOrder} />
        <Route exact path="/payment" component={Payment} />
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
