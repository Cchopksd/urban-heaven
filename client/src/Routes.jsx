import { BrowserRouter, Route, Routes  } from "react-router-dom";
// import PrivateRoute from "./PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import Dash from "./pages/Dash";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import Address from "./pages/Address";
import InsteadRoute from "./utils/InsteadRoute";
import NoMatchRoute from "./utils/NoMatchRoute";
import Payment from "./pages/Payment";

const App = () => {
    return (
		<BrowserRouter>
			<InsteadRoute />
			<Routes>
				<Route
					index
					element={<Dash />}
				/>
				<Route
					path='/chat'
					element={<ChatPage />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
					path={`/account/edit-profile/`}
					element={<Profile />}
				/>
				<Route
					path='/account/security'
					element={<Security />}
				/>
				<Route
					path='/account/address'
					element={<Address />}
				/>
				<Route
					path='/account/payment'
					element={<Payment />}
				/>

				<Route
					path='*'
					element={<NoMatchRoute />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
