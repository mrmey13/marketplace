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
        <Route exact path="/shop/profile" component={() => ShopProfileArea(t, i18n)} />
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
      <ShopProfile/>
    </Typography>
  </div>
);

export default withTranslation()(AppRoute);
