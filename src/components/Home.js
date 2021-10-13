import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "../components/ProductList/Product.css";
import Color from "../theme/color";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import DragIndicator from "@material-ui/icons/DragIndicator";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ToastProvider } from "react-toast-notifications";


import { useParams } from "react-router";
import cs from "../const";
import { openInNewTab } from "../const";
import color from "../theme/color";

// import ChangePassword from "./auth/ChangePassword";
import NestedList from "./shared/NestedList/NestedList";
import { menu } from "./menu.js";
import AppRoute from "./AppRoute";

import { useTranslation, withTranslation } from "react-i18next";
import { getRole, isSoloUser, getUser } from "../service";
import { Grid, Menu } from "@material-ui/core";

const URL = cs.BaseURL + "/user/detail";
const revokeTokenURL = cs.BaseURL + "/api/auth/logout";
const drawerWidth = 250;
const lngs = {
  en: { nativeName: "language.english" },
  vi: { nativeName: "language.vietnamese" },
};
const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
      backgroundColor: "#F5F5F5",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
  root: {
    height: "100vh",
    maxHeight: "100vh",
    display: "flex",
    marginTop: 0,
    paddingTop: 10,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: color.tanhide,
    display: "flex",
    justifyContent: "space-between",
  },
  toolbarHeader: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-end",
    justifyContent: "center",
    padding: "0 2px",
    ...theme.mixins.toolbar,
  },
  username: {
    marginRight: 1,
    // paddingLeft: 5,
    // paddingRight: 5,
    textAlign: "right",
    fontWeight: 550,
    fontSize: 11,
  },
  avatar: {
    marginRight: 6,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    // marginTop: '-10px',
    maxHeight: "100vh",
    overflow: "scroll",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    paddingTop: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflow: "auto",
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing(2),
  },
  logo: {
    margin: 20,
    width: 100,
  },
  listItemText: {
    fontSize: "0.2rem",
  },
  notfound: {
    display: "flex",
    justifyContent: "center",
  },
  footer: {
    paddingTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  customMenuPopover: {
    // take note of !important because default z-index is applied inline
    zIndex: "1900 !important"
  },
  input1: {
    height: 5,
    width: 150
  },
  input2: {
    height: 20,
    fontSize: "3em"
  }
});

const NavbarTitle = ({ title }) => {
  return (
    <Link
      variant="h5"
      color="inherit"
      noWrap
      style={{
        flexGrow: 1,
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        width: "30px",
      }}
      to="/"
    >
      {title}
    </Link>
  );
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      open: true,
      showChangePassword: false,
      anchorEl: null   
    };
    
    this.handleShowChangePassword = this.handleShowChangePassword.bind(this);
    this.handleCloseChangePassword = this.handleCloseChangePassword.bind(this);
    //this.loadData();
  }

  loadData() { }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    // this.setState({ open: false });
  };

  handleLogOut = () => {
    let queryString = `${revokeTokenURL}`;
    fetch(queryString, {
      method: "GET",
      // body: JSON.stringify({}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(cs.System_Code + "-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();       
      })
      .catch(() => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      });
  };

  handleShowChangePassword = () => {
    this.setState({ showChangePassword: true });
  };

  handleCloseChangePassword = () => {
    this.setState({ showChangePassword: false });
  };

  render() {
    console.log ("This is Home");
    const { classes, t, i18n } = this.props;
    var username = "";
    var user = localStorage.getItem(cs.System_Code + "-user");
    var token = localStorage.getItem(cs.System_Code + '-token');
    if (user) username = JSON.parse(String(user)).fullname;
    if (!username && user) username = JSON.parse(String(user)).name;
    console.log(getRole());
    console.log(isSoloUser());
    return (
      <div>
        {/* <Router> */}
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                this.state.open &&
                getRole() != cs.Role_Solo_Buyer &&
                window.location.pathname != "/products" &&
                !window.location.pathname.includes("/product_detail") 
                //&& classes.appBarShift
              )}
            >
              <Toolbar
                disableGutters={!this.state.open}
                className={classes.toolbar}
              >
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>

                {/* <NavbarTitle title={"MARKETPLACE"} /> */}
                <div>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    SALESPLUS
                  </Link>
                </div>


                 {/* search bar */}
                { (
                  <form
                    className="search-form d-flex "
                    style={{ backgroundColor: "white", alignItems: "center" }}
                  >
                    <input
                      className="form-control search-input"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      style={{ border: "none", width: "400px" }}
                    />
                    <button
                      className="btn btn-light btn-search"
                      style={{
                        border: "none",
                        fontSize: "20px",
                        backgroundColor: Color.tanhide,
                        margin: "2px",
                        color: "white",
                      }}
                    >
                      <ion-icon name="search-outline"></ion-icon>
                    </button>
                  </form>
                )}
                {getRole() == cs.Role_Solo_Buyer && (
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-none bg-transparent cart-button text-white dropbtn"
                      style={{
                        fontSize: "35px",
                        paddingTop: "15px",
                        position: "relative",
                        width: "fit-content",
                        height: "fit-content",
                      }}
                    >
                      <span
                        class="position-absolute  start-25 translate-middle px-2 py-1 bg-danger border border-light"
                        style={{
                          fontSize: "10px",
                          borderRadius: "5px",
                          width: "fit-content",
                          height: "fit-content",
                          zIndex: 1,
                          top: "40",
                        }}
                      >
                        1
                      </span>
                    <a href="/cart">
                      <ion-icon name="cart-outline"></ion-icon>
                    </a>
                    </button>
                    <div
                      className="icon-popover"
                      style={{
                        fontSize: "30px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <ion-icon name="caret-up-outline"></ion-icon>
                    </div>
                    <div class="dropdown-content">
                      <div className="m-3">Sản Phẩm Mới Thêm</div>
                      <Link
                        class="d-flex align-items-center product-item-cart"
                        to="/"
                      >
                        <div class="flex-shrink-0">
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                            alt="..."
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          This is some content from a media component.
                        </div>
                      </Link>
                      <Link
                        class="d-flex align-items-center product-item-cart"
                        to="/"
                      >
                        <div class="flex-shrink-0">
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                            alt="..."
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          This is some content from a media component.
                        </div>
                      </Link>
                      <Link
                        class="d-flex align-items-center product-item-cart"
                        to="/"
                      >
                        <div class="flex-shrink-0">
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                            alt="..."
                          />
                        </div>
                        <div class="flex-grow-1 ms-3">
                          This is some content from a media component.
                        </div>
                      </Link>
                      <div className="d-flex flex-row justify-content-end">
                        <Button
                          className="button-view-cart"
                          component={Link}
                          to="/"
                          style={{
                            backgroundColor: Color.tanhide,
                            margin: "10px",
                          }}
                        >
                          {" "}
                          Xem Giỏ Hàng{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ display: "flex" }}>
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"                    
                      onClick={(e) => {
                        this.setState({ anchorEl: e.target })
                      }}
                      color="inherit"
                    >
                      <DragIndicator />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(this.state.anchorEl)}
                      onClose={() => this.setState({ anchorEl: null })}
                    >
                      <MenuItem onClick={() => {
                        // this.setState({ anchorEl: null });
                        // window.location.href = cs.ShopUrl;
                        openInNewTab (cs.ShopUrl);
                      }}>Bán hàng với Salesplus</MenuItem>

                      <MenuItem onClick={() => {
                        openInNewTab (cs.HRUrl);
                      }}>HR Management</MenuItem>
                      <MenuItem onClick={() => {
                        openInNewTab (cs.EtrainingUrl);
                      }}>eTraining</MenuItem>
                    </Menu>
                  </div>

                  {/* {token && (<Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginTop: "5px"
                    }}
                  >
                    <Button
                      color="inherit"
                      iconStyle={{
                        height: 200,
                        width: 200,
                        fontSize: "48px",
                      }}
                      aria-label="Đăng xuất"
                      onClick={this.handleLogOut}
                    >
                      <span style={{ marginLeft: 10 }}>
                        {t("commons.button.logout")}
                      </span>
                    </Button>
                  </Link>)} */}
                  {token && <>
                      <Button
                        color="inherit"
                        onClick={(e) => {
                          this.setState({ anchorProfile: e.target })
                        }}
                        size="small"
                        sx={{ ml: 2 }}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontSize: "14px"
                        }}
                      >
                        <Avatar style={{ width: "30px", height: "30px" }} /> <span style={{ marginLeft: 10 }}>
                          {getUser()}
                        </span>
                      </Button>
                      <Menu
                        anchorEl={this.state.anchorProfile}
                        open={Boolean(this.state.anchorProfile)}
                        onClose={() => this.setState({ anchorProfile: null })}
                        // style={{ marginTop: "42px" }}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'botton',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem>
                          <Link
                            to="/my_account"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <span>
                              {t("app_route.profile")}
                            </span>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/user/address"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <span>
                              {t("app_route.address")}
                            </span>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/user/password"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <span>
                              {t("commons.button.change_password")}
                            </span>
                          </Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                          <Link
                            onClick={this.handleLogOut}
                            to="/shop/login"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <span>
                              {t("commons.button.logout")}
                            </span>
                          </Link>
                        </MenuItem>
                      </Menu>
                    </>
                    }


                  {!token && (<Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginTop: "5px"
                    }}
                  >
                    <Button
                      color="inherit"
                      iconStyle={{
                        height: 200,
                        width: 200,
                        fontSize: "48px",
                      }}
                      aria-label="Đăng ký"
                    >
                      <span style={{ marginLeft: 10 }}>
                        {t("commons.button.signup")}
                      </span>
                    </Button>
                  </Link>)}    

                  {/* button đăng nhập     */}
                  {!token && (<Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      marginTop: "5px"
                    }}
                  >
                    <Button
                      color="inherit"
                      iconStyle={{
                        height: 200,
                        width: 200,
                        fontSize: "48px",
                      }}
                      aria-label="Đăng nhập"
                    >
                      <span style={{ marginLeft: 10 }}>
                        {t("commons.button.login")}
                      </span>
                    </Button>
                  </Link>)}                 
                </div>
              </Toolbar>
            </AppBar>
            <main className={classes.content}> 
              <div className={classes.appBarSpacer} />
              <AppRoute />
             
            </main>
          </div>
        {/* </Router> */}

        <div className={classes.footer}>
          <div >
            {Object.keys(lngs).map((lng) => (
              <button
                key={lng}
                style={{ fontWeight: i18n.language === lng ? "bold" : "normal" }}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(lng);
                  localStorage.setItem("currentLanguage", lng);
                }}
              >
                {t(lngs[lng].nativeName)}
              </button>
            ))}
          </div>
        </div>

      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTranslation()(Home));
