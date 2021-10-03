import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';

import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const UpdateAmount = ({ modalIsOpen, closeModal, item }) => {
    const { register, handleSubmit, errors } = useForm();


    const email = sessionStorage.getItem('email')

    useEffect(() => {
        if (email !== "abirsharkarmr9@gmail.com") {
            sessionStorage.clear();
            localStorage.clear();
            window.location.assign("/");
        }
    }, [email])
    const onSubmit = data => {
       
        const finalData= {
            address: item.finalData.address,
            amount: data.amount,
            cart: item.finalData.cart, 
            email: item.finalData.email,
            status: item.finalData.status,
        }
        console.log(finalData)
        fetch(`http://localhost:4200/updateAmount/${item._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    
                   window.location.reload();
                //    closeModal();
                }
            })

    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="d-flex justify-content-end">



            </div>

            <h4 className="text-center text-danger"><u>Update Amount</u> </h4>
           
            <div className="font-weight-bold text-center">Order No: <span style={{color: 'purple'}}>{item?._id.split("").slice(15, 50)}</span></div>
            <br />
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="row d-flex justify-content-center">
                    <div className="form-group col-10 d-flex justify-content-center">
                        <label className="pt-1 " for=""><b>Amount:</b></label>
                        <input type="text" ref={register({ required: true })} defaultValue={item?.finalData?.amount} name="amount" placeholder="Enter Amount" className="form-control ml-3" />
                        {errors.name && <span className="text-danger">This field is required</span>}
                        <span  className="pt-1  ml-3 font-weight-bold">$</span>
                    </div>
                   
                </div>
            
          

                <div className="form-group text-center">
                    <button type="submit" className="btn btn-warning mt-4 "><b>Update Amount</b></button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateAmount;