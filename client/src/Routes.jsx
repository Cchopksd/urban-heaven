import { BrowserRouter, Route, Routes  } from "react-router-dom";
// import PrivateRoute from "./PrivateRoutes";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Dash from "./pages/Dash";
import ProfileMockUp from "./pages/ProfileMockUp";
import Security from "./pages/Security";
import Address from "./pages/Address";
import InsteadRoute from "./middlewares/InsteadRoute";
import NoMatchRoute from "./middlewares/NoMatchRoute";
import Payment from "./pages/Payment";

const App = () => {
    return (
        <BrowserRouter>
            <InsteadRoute />
            <Routes>
                <Route index element={<Dash />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/login' element={<Login />} />

                <Route
                    path='/account/edit-profile'
                    element={<ProfileMockUp />}
                />
                <Route path='/account/security' element={<Security />} />
                <Route path='/account/address' element={<Address />} />
                <Route path='/account/payment' element={<Payment />} />

                <Route path='*' element={<NoMatchRoute />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
