import { useEffect, useState, useContext } from 'react'
import { Link, useSearchParams } from 'react-router'
import { UserContext } from '../../../contexts/UserContext'
import * as productService from '../../../services/productService'

const productList = () => {
  const { user } = useContext(UserContext)
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const getAllProducts = async (query) => {
    try {
      const data = await productService.index(query)
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const query = searchParams.get('name')
    getAllProducts(query)
  }, [searchParams])

  return (
    <>
      <h1>Product List</h1>
      {!products.length ? (
        <div>No Products Found</div>
      ) : (
        <ul>
          {products.map((oneProduct) => (
            <li key={oneProduct._id}>
              <Link to={`/products/${oneProduct._id}`}>{oneProduct.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
export default productList
