import { useContext, useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router'
import { UserContext } from './contexts/UserContext'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/Auth/SignUpForm/SignUpForm'
import SignInForm from './components/Auth/SignInForm/SignInForm'
import ProductList from './components/Product/ProductList/ProductList'
import ProductDetail from './components/Product/ProductDetail/ProductDetail'
import ProductForm from './components/Product/CreateProductForm/CreateProductForm'
import OrderList from './components/Order/OrderList/OrderList'
import OrderDetails from './components/Order/OrderDetails/OrderDetails'
import AdminDashboard from './components/Dashboard/AdminDashboard/AdminDashboard'
import SellerDashboard from './components/Dashboard/SellerDashboard/SellerDashboard'

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
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default App
