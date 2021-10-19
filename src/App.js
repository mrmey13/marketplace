import logo from './logo.svg';
import './App.css';
import { isMobile } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import cs from './const.js';
import Loadable from 'react-loadable';
import Home from './components/Home';
import { MyThemeProvider } from './components/contexts/ThemeContext';
import { TableSettingProvider } from './components/contexts/TableSettingContext';
import { Router, Switch, Route } from "react-router-dom";
import HomeShop from './components/HomeShop';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LoginShop from './components/LoginShop';

const LazyLoadLogin = Loadable({
	loader: () => import('./components/Login'),
	loading: () => <div>Loading...</div>
});

function App() {
	if (isMobile) {
		return (
			<div
				style={{
					width: '100%',
					marginTop: 150,
					textAlign: 'center'
				}}
			>
				<Typography fullWidth variant="subtitle1">
					Vui lòng xem trang web trên máy tính !
				</Typography>
			</div>
		);
	}

	var token = localStorage.getItem(cs.System_Code + '-token');
	// if (!token || token == null || token == 'null' || token == undefined) {
	// 	return <LazyLoadLogin />;
	// 	// return (
	// 	// 	<MyThemeProvider>
	// 	// 		<TableSettingProvider>
	// 	// 			<Home />
	// 	// 		</TableSettingProvider>
	// 	// 	</MyThemeProvider>
	// 	// );
	// } else 
	return (

		<MyThemeProvider>
			<TableSettingProvider>

				<Switch>
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/shop/login" component={LoginShop} />
					<Route exact path="/" component={Home} />
					<Route exact path="/shop" component={HomeShop} />
					<Route exact path="/shop_view" component={Home} />
					<Route
						exact
						path="/seller/products"
						component={Home}
					/>
					<Route
						exact
						path="/category/:name/:id"
						component={Home}
					/>
					<Route
						// exact
						path="/shop/profile"
						component={HomeShop}
					/>

					<Route
						exact
						path="/shop/setting"
						component={HomeShop}
					/>
					<Route
						exact
						path="/seller/product_detail/:productId"
						component={HomeShop}
					/>
					<Route
						exact
						path="/product_detail/:productId"
						component={Home}
					/>
					{/*Ho so cua shop*/}
					<Route exact path="/my_account" component={HomeShop} />
					<Route exact path="/user/address" component={Home} />
					<Route exact path="/user/password" component={Home} />

					{/* Administration */}
					<Route exact path="/attribute/list" component={HomeShop} />
					<Route exact path="/attribute/config" component={HomeShop} />

					{/* Product */}
					<Route exact path="/product/new" component={HomeShop} />

					{/* Data Analysis */}
					<Route exact path="/datacenter/:title" component={HomeShop} />
					<Route exact path="/datacenter/:title/:tab" component={HomeShop} />

					{/* Settings */}
					<Route exact path="/settings/address" component={HomeShop} />

					<Route exact path="/product/category" component={HomeShop} />

					<Route
						// exact
						path="/product-list/:type"
						component={Home}
					/>

					{/* <Route
						// exact
						path="/seller-product-list/:type"
						component={HomeShop}
					/> */}

					<Route
						// exact
						path="/product/list/:status"
						component={HomeShop}
					/>

					<Route
						// exact
						path="/product/edit/:productId"
						component={HomeShop}
					/>

					<Route exact path="/cart" component={Home} />
					<Route path="/" component={Home} />
				</Switch>

			</TableSettingProvider>
		</MyThemeProvider>
	);

	// return (
	// 	<MyThemeProvider>
	// 		<TableSettingProvider>
	// 			<Home />
	// 		</TableSettingProvider>
	// 	</MyThemeProvider>
	// )
}

export default App;
