import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

import themeFile from "./utils/theme";

// material-ui
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./utils/AuthRoute";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

const theme = createMuiTheme(themeFile);

const token = localStorage.fbIdToken;

if (token) {
	const decodedToken = jwtDecode(token);

	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = "/login";
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common["Authorization"] = token;
		store.dispatch(getUserData());
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={home} />
							<AuthRoute component={login} exact path="/login" />
							<AuthRoute
								component={signup}
								exact
								path="/signup"
							/>
						</Switch>
					</div>
				</Router>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
