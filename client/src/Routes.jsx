import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './Routes/PrivateRoute';
import NoMatchRoute from './Routes/NoMatchRoute';
import IsLoggedIn from './Routes/IsLoggedIn';
import IsAcceptVendor from './Routes/IsAcceptVendor';
import IsTokenExpired from './Routes/isTokenExpired';

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
import EmailVerification from './pages/EmailVerification';

import CreateVendor from './pages/merchant/CreateVendor';

import AdminDashboard from './pages/admin/AdminDashboard';
import AgreementForVendor from './pages/merchant/AgreementForVendor';
import Product from './pages/product/Product';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={
						<IsTokenExpired>
							<Dash />
						</IsTokenExpired>
					}
				/>
				<Route
					path='/chat'
					element={<ChatPage />}
				/>
				<Route
					path='/register'
					element={
						<IsLoggedIn>
							<Register />
						</IsLoggedIn>
					}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/verify-account/:params'
					element={<EmailVerification />}
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
						<PrivateRoute>
							<Overview />
						</PrivateRoute>
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
					path='/account/agreement-for-vendor'
					element={
						<PrivateRoute>
							<IsAcceptVendor>
								<AgreementForVendor />
							</IsAcceptVendor>
						</PrivateRoute>
					}
				/>
				<Route
					path='/account/create-vendor'
					element={
						<PrivateRoute>
							<CreateVendor />
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
				<Route
					path='/product'
					element={<Product />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
