import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./PrivateRoutes";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Dash from "./pages/Dash";
import Profile from "./pages/Profile";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='/dash' element={<Dash />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
