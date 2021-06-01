import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fakeData from '../../../fakeData';
import { addToDatabaseCart, getDatabaseCart, minusToDatabaseCart, processOrder, removeFromDatabaseCart } from '../../../utilities/databaseManager';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import CartItem from '../CartItem/CartItem';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(1);


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
    }, [cart])

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

    const handlePlaceOrder = () => {
        setCart([]);
        processOrder();
    }
    return (
        <div>
            <Header cart={cart.length}></Header>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Edit Delivery Details</h4>
                        <hr style={{ width: '450px', marginRight: '100px', borderTop: '2px solid 	#C8C8C8' }} />
                        <Form style={{ width: '450px' }}>
                            <Form.Group controlId="formBasicName">
                                <Form.Control style={{ height: "50px", background: '#F5F5F5' }} type="" placeholder="Flat no." />
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="">
                                <Form.Control style={{ height: "50px", background: '#F5F5F5' }} type="" placeholder="House no." />
                            </Form.Group>

                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Control style={{ height: "50px", background: '#F5F5F5' }} type="" placeholder="Area" />
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Control style={{ height: "50px", background: '#F5F5F5' }} type="" placeholder="Contact no." />
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Control style={{ height: "80px", background: '#F5F5F5', paddingBottom: '50px' }} type="" placeholder="Add delivery instruction..." />
                            </Form.Group>

                            <Button style={{ padding: '10px 164px' }} variant="danger" type="submit">
                                Save & Continue</Button>
                            <br />
                            <br />
                        </Form>
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
                                        <Link onClick={handlePlaceOrder} to="/shipment" style={{ padding: '10px 132px' }} className="btn btn-danger my-4">Place Order</Link>
                                    </div>
                                </div>
                                : <div className="d-flex justify-content-center">
                                    <h3 className="text-danger mt-5  p-4">Cart is Empty</h3>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Checkout;