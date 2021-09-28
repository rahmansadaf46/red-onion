import React, { useEffect, useState } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

const PendingOrder = () => {
    const [food, setFood] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4200/allOrder')
            .then(res => res.json())
            .then(data => {
                // if (data) {
                //     localStorage.setItem('student', JSON.stringify(data));

                // }
                // const email= sessionStorage.getItem('email')
                // const items = data.filter(item => item.finalData.email === email)
                // console.log(items,data)
                setFood(data);
            })
    }, [])
    return (
        <div>
             <AdminHeader />
             <div className="row">
             <div className="col-md-2">
                    <AdminSidebar />
                </div>
                <div style={{ backgroundColor: '#FFF0F0', height: '100%' }} className="col-md-10 pt-4">
                    <div className="col-md-12">
                        <div>Pending Order</div>
                        <div>{
                                    food.map(fd=><div style={{ width: '450px',height: '100%' ,border: '1px solid black', marginBottom: '10px',padding: '10px'}}>{fd.finalData.cart.map(item=><p >{item.title} : {item.quantity}pcs</p>)} <br /><p>Status: {fd.finalData.status}</p></div>)
                                }</div>
                    </div>
                </div>
             </div>
            
        </div>
    );
};

export default PendingOrder;