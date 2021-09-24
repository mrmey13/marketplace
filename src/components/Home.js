import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ToastProvider } from "react-toast-notifications";

import cs from "../const";
import color from '../theme/color';

// import ChangePassword from "./auth/ChangePassword";
import NestedList from "./shared/NestedList/NestedList";
import { menu } from "./menu.js";
import AppRoute from "./AppRoute";

import { useTranslation, withTranslation } from "react-i18next";

const URL = cs.BaseURL + "/user/detail";
const revokeTokenURL = cs.BaseURL + "/api/auth/logout";
const drawerWidth = 250;
const lngs = {
    en: { nativeName: 'language.english' },
    vi: { nativeName: 'language.vietnamese' },
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
				textAlign: "left",
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
		};
		console.log("HOME props", props);
		var user = localStorage.getItem(cs.System_Code + "-user");
		// this.userrole = JSON.parse(String(user)).role;

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

		// sessionStorage.clear();
		// localStorage.clear();
		// window.location.reload();
	};

	handleShowChangePassword = () => {
		this.setState({ showChangePassword: true });
	};

	handleCloseChangePassword = () => {
		this.setState({ showChangePassword: false });
	};

	render() {
		const { classes, t, i18n } = this.props;
		var username = "";
		var user = localStorage.getItem(cs.System_Code + "-user");
		if (user) username = JSON.parse(String(user)).fullname;
		if (!username) username = JSON.parse(String(user)).name;
		// console.log(getRole());
		return (
			<div>
				<Router>
					<div className={classes.root}>
						<CssBaseline />
						<AppBar
							position="absolute"
							className={classNames(
								classes.appBar,
								this.state.open && classes.appBarShift
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

								<NavbarTitle title={"MARKETPLACE"} />
								<div>
									<Link to="/"
										style={{
											textDecoration: "none",
											color: "white",
										}}>
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
											<Icon> exit_to_app </Icon>
											<span style={{ marginLeft: 10 }}>
												{t("commons.button.logout")}
											</span>
										</Button>
									</Link>
								</div>
							</Toolbar>
						</AppBar>
						<Drawer
							variant="permanent"
							classes={{
								paper: classNames(
									classes.drawerPaper,
									!this.state.open && classes.drawerPaperClose
								),
							}}
							onEscapeKeyDown={this.handleDrawerClose}
							onBackdropClick={this.handleDrawerClose}
							open={this.state.open}
						>
							<div className={classes.toolbarHeader}>
								<Avatar
									className={classes.avatar}
								// src={require("../img/LOGO-Credito.png")}
								/>
								<Typography variant="body" className={classes.username}>
									{username}
								</Typography>
								{/* <IconButton onClick={this.handleDrawerClose}>
									<ChevronLeftIcon />
								</IconButton> */}
							</div>
							<Divider />
							<List grouped={true} collapsibleGroups={true}>
								<NestedList
									multilingual={true}
									menu={menu}
									closeMenuTab={this.handleDrawerClose}
								/>
							</List>
						</Drawer>

						<main className={classes.content}>
							<div className={classes.appBarSpacer} />

							{/* <AppRoute userrole={this.userrole} /> */}
							<AppRoute />
							{/* <ToastProvider autoDismissTimeout={5000} placement="bottom-center">
              <ChangePassword
                open={this.state.showChangePassword}
                onClose={this.handleCloseChangePassword}
              />
            </ToastProvider> */}
						</main>
					</div>
				</Router>
				<div className={classes.footer}>
					{Object.keys(lngs).map((lng) => (
						<button
							key={lng}
							style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }}
							type="submit"
							onClick={() => {
								i18n.changeLanguage(lng);
								localStorage.setItem("currentLanguage", lng);
							}}>
							{t(lngs[lng].nativeName)}
						</button>
					))}
				</div>
			</div>

		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTranslation()(Home));
