import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='/chat' element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
