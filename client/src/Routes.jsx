import { BrowserRouter, Route, Routes  } from "react-router-dom";
// import PrivateRoute from "./PrivateRoutes";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Dash from "./pages/Dash";
import ProfileMockUp from "./pages/ProfileMockUp";
import ChangePassword from "./pages/ChangePassword";
import Address from "./pages/Address";
import InsteadRoute from "./middlewares/InsteadRoute";
import NoMatchRoute from "./middlewares/NoMatchRoute";

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
                <Route
                    path='/account/change-password'
                    element={<ChangePassword />}
                />
                <Route path='/account/address' element={<Address />} />
                <Route path='*' element={<NoMatchRoute />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
