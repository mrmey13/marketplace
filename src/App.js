import logo from './logo.svg';
import './App.css';
import { isMobile } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import cs from './const.js';
import Loadable from 'react-loadable';
import Home from './components/Home';
import { MyThemeProvider } from './components/contexts/ThemeContext';
import { TableSettingProvider } from './components/contexts/TableSettingContext';

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
	if (!token || token == null || token == 'null' || token == undefined) {
		return <LazyLoadLogin />;
	} else return (
		<MyThemeProvider>
			<TableSettingProvider>
				<Home />
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
