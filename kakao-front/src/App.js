import {Route, Routes} from '../node_modules/react-router-dom/dist/index';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";

function App() {
    return (<>
        <Routes>
            <Route path={'/'} element={<MainPage/>}></Route>
            <Route path={'/login'} element={<LoginPage/>}></Route>
            <Route path={'/register'} element={<RegisterPage/>}></Route>
        </Routes>
    </>);
}

export default App;
