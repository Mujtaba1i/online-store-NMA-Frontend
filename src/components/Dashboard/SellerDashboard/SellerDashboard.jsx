import { Navigate, useNavigate, Link } from "react-router"
import { UserContext } from "../../../contexts/UserContext"
import { useContext, useState, useEffect } from 'react'
import * as productService from "../../../services/productService"

function SellerDashboard() {

  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [products, setProducts] = useState([])

  if (user === null || user?.role !== 'seller') {
    return <Navigate to='/' />
  }

  function handleClick() {
    navigate('/products/new')
  }

  const getAllProducts = async () => {
    try {
      const data = await productService.sellersProucts()
      setProducts(data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <>
      <div>Seller Dashboard</div>
      <button onClick={handleClick}>create product listing</button>
      <h1>Product List</h1>
      {
        !products.length ?
          <div>No Products Found</div>
          :
          <ul>
            {
              products.map((oneProduct) =>
                <li key={oneProduct._id}>
                  <Link to={`/products/${oneProduct._id}`}>
                    {oneProduct.name}
                  </Link>
                </li>
              )
            }
          </ul>
      }

    </>
  )
}

export default SellerDashboard