import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import { Route, Routes, Link } from 'react-router'
import { UserContext } from './contexts/UserContext'
import { useContext, useState, useEffect } from 'react'
import SignInForm from './components/SignInForm/SignInForm'
import ProductList from './components/productList/productList'
import ProductDetail from './components/productDetail/productDetail'
import OrderList from './components/OrderList/OrderList'
import OrderDetails from './components/OrderDetails/OrderDetails'
import AdminDashboard from "./components/Admin/Admin"
import SellerDashboard from "./components/SellerDashboard/SellerDashboard"

function App() {
  const { user } = useContext(UserContext)

  return (
    <>
      <div>
        <NavBar />
        <h1>MAMAMIA!! {user ? ', ' + user.role + ' ' + user.username : ''}</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/Sign-up" element={<SignUpForm />} />
          <Route path="/Sign-in" element={<SignInForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/seller-dashboard" element={<SellerDashboard/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
