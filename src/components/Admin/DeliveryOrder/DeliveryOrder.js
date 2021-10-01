import React, { useEffect, useState } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

const DeliveryOrder = () => {
    const [food, setFood] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4200/allOrder')
            .then(res => res.json())
            .then(data => {
                // if (data) {
                //     localStorage.setItem('student', JSON.stringify(data));

                // }
                // const email= sessionStorage.getItem('email')
                const items = data.filter(item => item.finalData.status === "Delivered")
                // console.log(items,data)
                setFood(items);
            })
    }, [])
    return (
        <div>
        <AdminHeader />
        <div className="row">
        <div className="col-md-2">
               <AdminSidebar />
           </div>
           {
                    food.length === 0 ?<div style={{ backgroundColor: '#FFF0F0', height: '800px' }} className="col-md-10 pt-4 d-flex justify-content-center"><h2 className="text-danger">Loading...</h2></div> : <div style={{ backgroundColor: '#FFF0F0', height: '100%', minHeight: '800px'}} className="col-md-10 pt-4 d-flex justify-content-center">
               <div className="">
                   
                   <div>
                      <div  className="text-center pb-3 text-danger">
                      <h2><u>Delivery Order</u></h2>
                      </div>
                       {
                               food.map(fd=><div style={{ width: '700px',height: '100%' ,border: '1px solid lightYellow',borderRadius: '30px',backgroundColor: 'lightYellow',marginBottom: '25px',padding: '30px'}}>
                                   <div className="font-weight-bold">Order No: <span style={{color: 'purple'}}>{fd._id.split("").slice(15, 50)}</span></div>
                                   <br />
                                   {fd.finalData.cart.map(item=><p style={{fontSize: '18px'}}><span className="font-weight-bold text-danger">{item.title}</span> <span className="font-weight-bold text-dark">: {item.quantity}pcs</span></p>)} <br />
                             <div style={{border: '2px solid red',padding: '15px'}}>
                             <p className="font-weight-bold ">Address: <span className="text-danger">Flat No {fd.finalData.address.flatNo}, House No {fd.finalData.address.houseNo}, {fd.finalData.address.area}</span></p>
                              <p className="font-weight-bold">Contact: <span className="text-primary">{fd.finalData.address.contactNo}</span></p>
                              <p className="font-weight-bold text-dark">Email: <span className="text-primary">{fd.finalData.email}</span></p>
                             </div>
                             <br />
                              <div className="row">
                              <div className="col-md-8">
                              <div className="">
                              <span className="mt-2 font-weight-bold">Status: <span className="text-success">{fd.finalData.status}</span> </span></div>
                             
                               </div>
                               <div  className="col-md-4 d-flex justify-content-end">
                               <p className="mt-2 font-weight-bold">Amount: <span className="text-danger">{fd.finalData.amount}$</span></p>&nbsp;&nbsp;
                               </div>
                              </div>
                               </div>)
                           }</div>
               </div>
           </div>
}
        </div>
       
   </div>
    );
};

export default DeliveryOrder;