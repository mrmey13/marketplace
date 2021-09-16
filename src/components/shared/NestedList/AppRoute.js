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
import { getRole, getFunctionRoles } from "../service";
import { ToastProvider } from "react-toast-notifications";
import { useTranslation, withTranslation } from "react-i18next";

const styles = (theme) => ({
    tableContainer: {
      height: 320,
    },
});