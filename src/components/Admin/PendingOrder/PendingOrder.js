import React, { useEffect, useState } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import './PendingOrder.css'
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
                <div style={{ backgroundColor: '#FFF0F0', height: '100%' }} className="col-md-10 pt-4 d-flex justify-content-center">
                    <div className="">
                        
                        <div>{
                                    food.map(fd=><div style={{ width: '700px',height: '100%' ,border: '1px solid lightYellow',borderRadius: '30px',backgroundColor: 'lightYellow',marginBottom: '25px',padding: '30px'}}>{fd.finalData.cart.map(item=><p style={{fontSize: '18px'}}><span className="font-weight-bold text-danger">{item.title}</span> <span className="font-weight-bold text-dark">: {item.quantity}pcs</span></p>)} <br />
                                  <div style={{border: '2px solid red',padding: '15px'}}>
                                  <p className="font-weight-bold text-danger">Address: Flat No {fd.finalData.address.flatNo}, House No {fd.finalData.address.houseNo}, {fd.finalData.address.area}</p>
                                   <p className="font-weight-bold">Contact: <span className="text-primary">{fd.finalData.address.contactNo}</span></p>
                                   <p className="font-weight-bold text-dark">Email: <span className="text-primary">{fd.finalData.email}</span></p>
                                  </div>
                                  <br />
                                   <div className="row">
                                   <div className="d-flex">
                                   <div className="col-md-9">
                                   <p className="mt-2 font-weight-bold">Status: <span className="text-danger">{fd.finalData.status}</span> </p></div>
                                   <div style={{position: 'relative',right: '15px',top:'7px'}} >
                                   <label class="switch">
                                    <input type="checkbox"/>
                                    <span className="slider round"></span>
                                  </label>
                                   </div>
                                    </div>
                                    <div style={{position: 'relative',left: '185px'}} className="col-md-6 d-flex">
                                    <p className="mt-2 font-weight-bold">Amount: <span className="text-danger">{fd.finalData.amount}$</span></p>&nbsp;&nbsp; <button style={{padding: '0px 10px'}} className="btn btn-warning font-weight-bold">Edit Amount</button>
                                    </div>
                                   </div>
                                    </div>)
                                }</div>
                    </div>
                </div>
             </div>
            
        </div>
    );
};

export default PendingOrder;