import { useNavigate, Navigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { useContext, useEffect, useState } from 'react'
import * as userService from "../../services/userService"

function Admin() {

    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    
    const [customers, setCustomers] = useState([])
    const [sellers, setSellers] = useState([])
    const [sellersRequests, setSellersRequests] = useState([])
        
    async function getAllUsers (){
        try {
            const customersData = await userService.customersIndex()
            setCustomers(customersData)
            
            const sellersRequestsData = await userService.sellersReqIndex()
            setSellersRequests(sellersRequestsData)
            
            const sellersData = await userService.sellersIndex()
            setSellers(sellersData)
                    
        } catch (err) {
            console.error('Ran into an error: ' + err)
        }
    }

    async function handleButton(_id, isAccepted){
        if(isAccepted){
            const body = {wantToBeSeller: false, role: 'seller'}
            const response = await userService.acceptSellerReq(_id, body)
            if (response === 'UPDATED'){
                console.log('USER with id: '+ _id + ' HAS BEEN ACCEPTED AS SELLER');
                getAllUsers()
            }
        }
        else{
            const response =await userService.deleteUser(_id)
            if (response === 'DELETED'){
                console.log('USER with id: '+ _id + ' HAS BEEN DELETED');
                getAllUsers()
            }
        }
    }


    useEffect(()=>{
        getAllUsers()
    },[])

    if (user === null || user?.role !== 'admin') {
        return <Navigate to='/'/>
    }


  return (
    <>
        <div>
            <h1>Sellers Requests</h1>
            <div>
                {sellersRequests.map(oneUser => 
                <div key={oneUser._id}>
                    <div>
                        {oneUser.username}
                        <button onClick={()=>{handleButton(oneUser._id, true)}}>Accept</button>
                        <button onClick={()=>{handleButton(oneUser._id, false)}}>Decline</button>
                    </div>
                </div>)}
            </div>
        </div>
        <div>
            <h1>Sellers</h1>
            {sellers.map(oneUser => <div key={oneUser._id}>{oneUser.username}</div>)}
        </div>
        <div>
            <h1>Customers</h1>
            {customers.map(oneUser => <div key={oneUser._id}>{oneUser.username}</div>)}
        </div>
    </>
  )
}

export default Admin