import { useEffect, useState } from "react"
import { Link } from "react-router"
import * as productService from "../../services/productService"

const productList = () => {
    const [products, setProducts] = useState([])
  

    useEffect(() => {
        const getAllProducts = async () => {
            try{
                const data = await productService.index()
                // console.log(data)
                setProducts(data)
            }
            catch(err){
                console.log(err)
            }
        }
        getAllProducts()
    },[])
    return (
        <>
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