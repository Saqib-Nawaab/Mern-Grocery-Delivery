import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import { LoaderIcon, Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import Login from "./components/Login.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import ProductCatogeries from "./pages/ProductCatogeries.jsx";
import ProdutDetails from "./pages/ProdutDetails.jsx";
import Cart from "./pages/Cart.jsx";
import AddAdress from "./pages/AddAdress.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import Contact from "./pages/Conatct.jsx";
import SellerLogin from "./components/seller/SellerLogin.jsx";
import SellerLayout from "./pages/seller/SellerLayout.jsx";
import ProductList from "./pages/seller/ProductList.jsx";
import Order from "./pages/seller/Order.jsx";
import AddProduct from "./pages/seller/AddProduct.jsx";
import Loading from "./components/Loading.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  const isSellarPath = useLocation().pathname.includes("/seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white ">
      {!isSellarPath && <NavBar />}
      {showUserLogin && <Login />}
      <Toaster />
      <div className={isSellarPath ? "" : "px-6 md:px-6 lg:px-24 xl:px-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCatogeries />} />
          <Route path="/products/:category/:id" element={<ProdutDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-address" element={<AddAdress />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="/loader" element={<Loading />} />

          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Order />} />
          </Route>
        </Routes>
      </div>
      {!isSellarPath && <Footer />}
    </div>
  );
}

export default App;
