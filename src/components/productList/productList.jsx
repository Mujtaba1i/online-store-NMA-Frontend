import { useEffect, useState,useContext } from "react"
import { Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import * as productService from "../../services/productService"

const productList = () => {
    const {user} = useContext(UserContext)
    const [products, setProducts] = useState([])
  
    const getAllProducts = async () => {
            try{
                const data = await productService.index()
                setProducts(data)
            }
            catch(err){
                console.log(err)
            }
        }

    useEffect(() => {
        getAllProducts()
    },[])

    return (
        <>  
            {user ?  user.role === 'admin' &&  <Link to='/admin'>Admin</Link> : <></>}
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
export default productList