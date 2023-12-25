import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./PrivateRoutes";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Dash from "./pages/Dash";
import ProfileMockUp from "./pages/ProfileMockUp";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='/dash' element={<Dash />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route
                    path='/account/edit-profile'
                    element={<ProfileMockUp />}
                />
                <Route
                    path='/account/change-password'
                    element={<ChangePassword />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
