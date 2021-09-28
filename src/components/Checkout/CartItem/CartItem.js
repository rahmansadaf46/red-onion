import React, { useEffect, useState } from 'react';
import fakeData from '../../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../../utilities/databaseManager';


const CartItem = (props) => {
    const item = props.item;
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(item.quantity);

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

    const removeProduct = (productKey) => {
        if (item.quantity === 0) {
            const newCart = cart.filter(pd => pd.id !== productKey);
            setCart(newCart);
            removeFromDatabaseCart(productKey);

        }

    }

    const incrementCount = () => {
        setCount(count + 1);
        props.handleAddProduct(props.item);
        // props.handleAddProduct(props.product)
    };

    const decrementCount = () => {
        if (count > 0) {
            setCount(count - 1);
            props.handleRemoveProduct(props.item);

        }
        if (count <= 1) {
            removeProduct(item.id);
        }
    };

    return (
        <div key={item.id} style={{ background: '#E8E8E8', border: '1px solid white', borderRadius: '30px', marginTop: '10px' }}>
            <div className="row p-2">
                <div className="col-md-3">
                    <img width="85px" src={item.image} alt="" />
                </div>
                <div className="col-md-3">
                    <p style={{ fontSize: '13px' }}><b>{item.title}</b></p>
                    <p style={{ marginTop: '-15px', color: '#DC3545', marginBottom: '-1px' }}><b>${item.price}</b></p>
                    <small style={{ marginTop: '-88px', fontSize: '10px', lineHeight: '80%' }}>Delivery Free</small>
                </div>
                {
                    props.showAddToCart === true &&
                    <div style={{ width: '10px' }} className="col-md-6">
                        <div className="input-group item-area">
                            <input onClick={() =>  decrementCount()} type="button" defaultValue="-" className="button-minus" data-field="quantity" />
                            <input style={{ fontSize: '15px' }} onChange={ () => removeProduct(item.id)} type="number" value={count} step={1} max defaultValue={1} name="quantity" className="quantity-field" />
                            <input onClick={() =>  incrementCount()} type="button" defaultValue="+" className="button-plus" data-field="quantity" />
                        </div>
                    </div>

                }

            </div>
        </div >
    );
};

export default CartItem;