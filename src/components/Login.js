import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { withToastManager } from "react-toast-notifications";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import "./Login.css";
import cs from "../const.js";
import Grid from "@material-ui/core/Grid";
import color from '../theme/color';
import { useTranslation, withTranslation } from 'react-i18next';


const loginURL = cs.BaseURL + "/api/auth/login";
const homeBase = "/" + cs.routeBase;

const styles = (theme) => ({
  card: {
    maxWidth: 800,
    minWidth: 600,
  },

  main_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.unit * 10,
    paddingTop: theme.spacing.unit * 20,
    paddingBottom: theme.spacing.unit * 1,
    height: "100vh",
    maxHeight: 120,
  },
  input_field: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: 250,
    minWidth: 120,
  },
  login_button: {
    marginTop: theme.spacing.unit * 4,
    width: 150,
  },
  error_message: {
    color: "red",
    marginTop: 10,
  },
  logo: {
    margin: 20,
    width: 100,
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log("props", props)
    this.state = {
      username: "",
      password: "",
      error_message: null,
    };
    
    this._handleUserNameChange = this._handleUserNameChange.bind(this);
    this._handlePasswordChange = this._handlePasswordChange.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
  }
 

  _handleUserNameChange(e) {
    this.setState({ username: e.target.value });
  }
  _handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  _handleLogin(e) {
    console.log(process.env.NODE_ENV);
    console.log(loginURL);
    this.setState({
      error_message: "",
    });

    let queryString = `${loginURL}`;
   

    fetch(queryString, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
          if (
            data &&
            data.data &&
            data.data.token &&
            data.data.token !== "null" &&
            data.data.token !== undefined
          ) {
            sessionStorage.clear();
            localStorage.setItem(cs.System_Code + "-token", data.data.token);
            localStorage.setItem(
              cs.System_Code + "-user",
              JSON.stringify({
                name: this.state.username,
                role: data.data.role,
                functionRoles: data.data.functionRoles,
                expireDate: data.data.expireDate,
              })
            );
            localStorage.setItem(cs.System_Code + '-expireDate', data.data.expireDate);
            localStorage.setItem(cs.System_Code + '-funtionRoles', JSON.parse(JSON.stringify(data.data.functionRoles)));
            console.log(data.data);
            // console.log(data.data.functionRoles);
            // console.log(JSON.stringify(data.data.functionRoles));
            //window.location.reload();
            //window.location.reload();
            if (this.props.location.state && this.props.location.state.prePath) {
              this.props.history.push(this.props.location.state.prePath);
            } else {
              this.props.history.push(homeBase);
            }
          } else {
            this.setState({
              username: "",
              password: "",
              error_message: "Tài khoản hoặc mật khẩu không chính xác !",
            });
          }
        
      })
      .catch(() => {
        this.setState({
          password: "",
          error_message: null,
        });
        sessionStorage.clear();
      });
  }

  render() {
    const { classes, t, i18n } = this.props;

    return (
      <div>
        <div className="topnav" style={{ backgroundColor: color.tanhide }}>
          <a class="active" href="http://www.salesplus.asia">SALESPLUS</a>
          <a href="http://hr.salesplus.asia">HR</a>
          <a href="http://etraining.salesplus.asia">eTraining</a>
          <a href="https://general.aidriven.credito.asia">Sales</a>
        </div>
        <div className={classes.main_container}>
          <Card
            style={{
              width: "30%",
              boxShadow: "3px 5px 1px 1px silver",
              marginTop: "10%",
            }}
          >
            {/* <CardHeader title="E-Training" /> */}
            {/* <h3
            className="login-title"
            style={{
              textAlign: "center",
              color: "#F89A0C",
              fontWeight: "bold",
            }}
          >
            MARKETPLACE
          </h3> */}
            {/* <img
            src="https://image.flaticon.com/icons/png/512/2996/2996170.png"
            className={classes.logo}
          /> */}
            <CardContent>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
                spacing={36}
              >
                <Typography
                  style={{ fontWeight: "bold", marginBottom: "10px", color: color.tanhide }}
                  variant="h5"
                >
                  {/* {t("LOGIN")} */}
                  Salesplus
                </Typography>
                <div className="form-field">
                  <label for="name" className="form-label">
                    Tài khoản
                  </label>
                  <input
                    id="order_code"
                    autoFocus
                    type="search"
                    value={this.state.username}
                    className="form-control form-input"
                    placeholder=" "
                    name="domain"
                    onChange={this._handleUserNameChange}
                    required={true}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        this._handleLogin();
                        ev.preventDefault();
                      }
                    }}
                  />

                </div>
                <div className="form-field">
                  <label for="name" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    id="product_code"
                    type="search"
                    className="form-control form-input"
                    placeholder=" "
                    name="domain"
                    value={this.state.password}
                    onChange={this._handlePasswordChange}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        this._handleLogin();
                        ev.preventDefault();
                      }
                    }}
                    required={true}
                    type="password"
                  />

                </div>

                <Typography variant="caption" className={classes.error_message}>
                  {this.state.error_message ? this.state.error_message : ""}
                </Typography>

                <Button
                  className={classes.login_button}
                  variant="contained"
                  color="primary"
                  onClick={this._handleLogin}
                >
                  ĐĂNG NHẬP
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withToastManager(withStyles(styles)(withTranslation()(Login)));
