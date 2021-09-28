import React from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

const DeliveryOrder = () => {
    return (
        <div>
        <AdminHeader />
        <div className="row">
        <div className="col-md-2">
               <AdminSidebar />
           </div>
           <div style={{ backgroundColor: '#FFF0F0', height: '100vh' }} className="col-md-10 pt-4">
               <div className="col-md-12">
                   <div>Delivery Order</div>
               </div>
           </div>
        </div>
       
   </div>
    );
};

export default DeliveryOrder;