import { useNavigate, Navigate } from "react-router"
import { UserContext } from "../../../contexts/UserContext"
import { useContext, useEffect, useState } from 'react'
import * as userService from "../../../services/userService"
import styles from './AdminDashboard.module.css'

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
                getAllUsers()
            }
        }
        else{
            const response = await userService.deleteUser(_id)
            if (response === 'DELETED'){
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
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <p className={styles.subtitle}>Manage users and seller requests</p>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Seller Requests
                    {sellersRequests.length > 0 && (
                        <span className={styles.badge}>{sellersRequests.length}</span>
                    )}
                </h2>
                
                {!sellersRequests.length ? (
                    <div className={styles.emptyState}>
                        No pending seller requests
                    </div>
                ) : (
                    <ul className={styles.userList}>
                        {sellersRequests.map(oneUser => (
                            <li key={oneUser._id} className={`${styles.userCard} ${styles.requestCard}`}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userAvatar}>
                                        {oneUser.username.charAt(0)}
                                    </div>
                                    <div>
                                        <div className={styles.userName}>{oneUser.username}</div>
                                        <span className={styles.requestBadge}>Pending Approval</span>
                                    </div>
                                </div>
                                <div className={styles.buttonGroup}>
                                    <button 
                                        onClick={() => handleButton(oneUser._id, true)}
                                        className={styles.acceptButton}
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => handleButton(oneUser._id, false)}
                                        className={styles.declineButton}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Sellers
                    {sellers.length > 0 && (
                        <span className={styles.badge}>{sellers.length}</span>
                    )}
                </h2>
                
                {!sellers.length ? (
                    <div className={styles.emptyState}>
                        No sellers registered
                    </div>
                ) : (
                    <ul className={styles.userList}>
                        {sellers.map(oneUser => (
                            <li key={oneUser._id} className={styles.userCard}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userAvatar}>
                                        {oneUser.username.charAt(0)}
                                    </div>
                                    <div className={styles.userName}>{oneUser.username}</div>
                                </div>
                                <button 
                                    onClick={() => handleButton(oneUser._id, false)}
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Customers
                    {customers.length > 0 && (
                        <span className={styles.badge}>{customers.length}</span>
                    )}
                </h2>
                
                {!customers.length ? (
                    <div className={styles.emptyState}>
                        No customers registered
                    </div>
                ) : (
                    <ul className={styles.userList}>
                        {customers.map(oneUser => (
                            <li key={oneUser._id} className={styles.userCard}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userAvatar}>
                                        {oneUser.username.charAt(0)}
                                    </div>
                                    <div className={styles.userName}>{oneUser.username}</div>
                                </div>
                                <button 
                                    onClick={() => handleButton(oneUser._id, false)}
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default Admin