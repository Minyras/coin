import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import CoinList from "./pages/CoinList/CoinList";
import CoinDetails from "./pages/CoinDetails/CoinDetails";
import AdminPanelLogin from "./pages/Admin/AdminPanelLogin/AdminPanelLogin";
import AdminPanel from "./pages/Admin/AdminPanel/AdminPanel";
import NewCoinInput from "./pages/Admin/NewCoinInput/NewCoinInput";
import UserLogin from "./pages/UserLogin/UserLogin";
import Cart from "./pages/Cart/Cart";
import UserLayout from "./components/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/:filter" element={<CoinList />} />
        <Route path="/details/:id" element={<CoinDetails />} />
        <Route path="/filter" element={<CoinList />} />
        <Route path="/login" element={<AdminPanelLogin />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route element={<UserLayout />} allowedRole="User" />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/:id" element={<Cart />} />
        {/* </Route> */}
        <Route element={<ProtectedRoute />} allowedRole="Admin">
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/newcoin" element={<NewCoinInput />} />
          <Route path="/newcoin/:id" element={<NewCoinInput />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
