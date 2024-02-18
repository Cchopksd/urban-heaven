import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import NoMatchRoute from './utils/NoMatchRoute';
import AdminRoute from './utils/AdminRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';
import Dash from './pages/Dash';
import Profile from './pages/account/Profile';
import Security from './pages/account/Security';
import Address from './pages/account/Address';
import Payment from './pages/account/Payment';
import IncreaseAddress from './pages/account/IncreaseAddress';
import Overview from './pages/Overview';

import AdminDashboard from './pages/admin/AdminDashboard';
import IsLoggedIn from './utils/IsLoggedIn';

const App = () => {
	return (
		<BrowserRouter>
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
					path='/account'
					exact
					element={
						<PrivateRoute>
							<Navigate
								to={'/account/overview'}
								replace
							/>
						</PrivateRoute>
					}
				/>
				<Route
					path='/account/overview'
					exact
					element={
						<AdminRoute>
							<PrivateRoute>
								<Overview />
							</PrivateRoute>
						</AdminRoute>
					}
				/>
				<Route
					path='/account/edit-profile'
					exact
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path='/account/security'
					element={
						<PrivateRoute>
							<Security />
						</PrivateRoute>
					}
				/>
				<Route
					path='/account/address'
					element={
						<PrivateRoute>
							<Address />
						</PrivateRoute>
					}
				/>
				<Route
					path='/account/address/increase'
					element={
						<PrivateRoute>
							<IncreaseAddress />
						</PrivateRoute>
					}
				/>
				<Route
					path='/account/payment'
					element={
						<PrivateRoute>
							<Payment />
						</PrivateRoute>
					}
				/>

				<Route
					path='/admin'
					element={
						<PrivateRoute role='admin'>
							<AdminDashboard />
						</PrivateRoute>
					}
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
