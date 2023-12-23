import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import Dash from "./components/Dash";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='/dash' element={<Dash />} />
                <Route
                    path='/chat'
                    element={
                        <PrivateRoute>
                            <ChatPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
