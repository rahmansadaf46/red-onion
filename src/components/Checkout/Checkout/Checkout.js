import React, { useEffect, useState } from 'react';

import fakeData from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart, minusToDatabaseCart, processOrder, removeFromDatabaseCart } from '../../../utilities/databaseManager';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import CartItem from '../CartItem/CartItem';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [count] = useState(1);
    

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.id;
        const sameProduct = cart.find(pd => pd.id === toBeAddedKey);
        let newCount;
        let newCart;
        if (sameProduct) {
            newCount = sameProduct.quantity + 1;
            sameProduct.quantity = newCount;
            const others = cart.filter(pd => pd.id !== toBeAddedKey);
            newCart = [...others, sameProduct]
            addToDatabaseCart(sameProduct.id, newCount);
        }
        else {
            product.quantity = count;
            newCart = [...cart, product];
            addToDatabaseCart(product.id, product.quantity);
        }
        setCart(newCart);

    }

    const handleRemoveProduct = (product) => {
        const toBeAddedKey = product.id;
        const sameProduct = cart.find(pd => pd.id === toBeAddedKey);
        let newCount;
        let newCart;
        if (sameProduct) {
            newCount = sameProduct.quantity - 1;
            sameProduct.quantity = newCount;
            const others = cart.filter(pd => pd.id !== toBeAddedKey);
            newCart = [...others, sameProduct]
            minusToDatabaseCart(sameProduct.id, newCount);
        }
        else {
            product.quantity = count;
            newCart = [...cart, product];
            minusToDatabaseCart(product.id, product.quantity);

        }

        if (product.quantity === 0) {
            removeFromDatabaseCart(product.id);
        }
        setCart(newCart);


    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.id === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })

        setCart(previousCart);
    }, [])

    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        subTotal = subTotal + product.price * product.quantity;
    }
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    let total = 5.00 + 2.00 + subTotal;
    const [success, setSuccess] = useState(false);
    const [flat, setFlat] = useState(false);
    const [house, setHouse] = useState(false);
    const [area, setArea] = useState(false);
    const [contact, setContact] = useState(false);
    const [address, setAddress] = useState({
        flatNo: '',
        houseNo: '',
        area: '',
        contactNo: '',
    });
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)
        
        if (e.target.name === 'flatNo') {
          setFlat(e.target.value.length > 0);
        }
        if (e.target.name === 'houseNo') {
            setHouse(e.target.value.length > 0);
        }
        if (e.target.name === 'area') {
            setArea(e.target.value.length > 0);
        }
        if (e.target.name === 'contactNo') {
            setContact(e.target.value.length > 0);
        }
        if (flat && house && contact && area) {
            setSuccess(true)
            // console.log('successfully')
        }
        // console.log(flat ,house,area,contact)
        const newUserInfo = { ...address };
        newUserInfo[e.target.name] = e.target.value;
        setAddress(newUserInfo);
     
    }
    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const finalData ={
            cart: cart,
            address: address,
            email: sessionStorage.getItem('email'),
            status: 'Pending'
        }
        // console.log(cart, address)
        
       
         
        // setCart([]);
     
        if(success === true) {
            fetch('http://localhost:4200/addOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({finalData})
            })
                .then(res => res.json())
                .then(success => {
                    window.location.assign('/shipment');
                    if (success) {
                      
                    }
                })
        }else{
            window.alert('please enter your address')
        }
        processOrder();
        
    }
    return (
        <div>
            <Header cart={cart.length}></Header>
            <form>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Edit Delivery Details</h4>
                        <hr style={{ width: '450px', marginRight: '100px', borderTop: '2px solid 	#C8C8C8' }} />
                      
                                <input  onChange={handleChange} name="flatNo" style={{ height: "50px", borderRadius: '30px',border: '1px solid gray',width: '75%'}} className="pl-4" type="" required placeholder="Flat no." />
                                <br />
                                <br />
                                <input  onChange={handleChange} name="houseNo" style={{ height: "50px", borderRadius: '30px',border: '1px solid gray',width: '75%'}} className="pl-4" type="" required placeholder="House no." />
                                <br />
                                <br />
                                <input  onChange={handleChange} name="area" style={{ height: "50px", borderRadius: '30px',border: '1px solid gray',width: '75%'}} className="pl-4" type="" required placeholder="Area" />
                                <br />
                                <br />
                                <input  onChange={handleChange} name="contactNo" style={{ height: "50px", borderRadius: '30px',border: '1px solid gray',width: '75%'}} className="pl-4" type="" required placeholder="Contact no." />
                            {/* <Form.Group className="mt-4" controlId="">
                                
                            </Form.Group>

                            <Form.Group className="mt-4" controlId="formBasicPassword">
                              
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="formBasicPassword">
                               
                            </Form.Group>

                            <Button style={{ padding: '10px 164px' }} variant="danger" type="submit">
                                Save & Continue</Button> */}
                            <br />
                            <br />
                        
                    </div>
                    <div style={{ marginLeft: '190px' }} className="col-md-4 ">
                        <p>Form <b>Gulshan Plaza Restaurant GPR</b></p>
                        <p>Arriving in 20-30 min</p>
                        <p>107 Rd No 8</p>

                        {
                            cart.length > 0 ?
                                <div>
                                    <div>
                                        {
                                            cart.map(item => <CartItem showAddToCart={true} handleRemoveProduct={handleRemoveProduct} handleAddProduct={handleAddProduct} key={item.id} item={item}></CartItem>)
                                        }

                                    </div>
                                    <div>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <p><b>Subtotal * {cart.length} item</b></p>
                                                <p><b>Tax</b></p>
                                                <p><b>Delivery fee</b></p>
                                                <h4><b>Total</b></h4>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <p><b>${formatNumber(subTotal)}</b></p>
                                                <p><b>$5.00</b></p>
                                                <p><b>$2.00</b></p>
                                                <h4><b>${formatNumber(total)}</b></h4>
                                            </div>
                                        </div>
                                        <input onClick={handlePlaceOrder} type="submit" style={{ padding: '10px 132px' }} placeholder="Place Order" className="btn btn-danger my-4"/>
                                    </div>
                                </div>
                                : <div className="d-flex justify-content-center">
                                    <h3 className="text-danger mt-5  p-4">Cart is Empty</h3>
                                </div>
                        }
                    </div>
                </div>
            </div>
            </form>
            <Footer></Footer>
        </div>
    );
};

export default Checkout;