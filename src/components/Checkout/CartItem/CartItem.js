import React, {  useState } from 'react';
// import fakeData from '../../../fakeData';
// import { getDatabaseCart } from '../../../utilities/databaseManager';


const CartItem = (props) => {
    const item = props.item;
    const [count, setCount] = useState(item.quantity);
 

    const incrementCount = () => {
        setCount(count + 1);
        props.handleAddProduct(props.item);
    };

    const decrementCount = () => {
        if (count > 0) {
            setCount(count - 1);
            props.handleRemoveProduct(props.item);

        }
    };

    return (
        <div key={item.id} style={{ background: '#E8E8E8', border: '1px solid white', borderRadius: '30px', marginTop: '10px' }}>
            <div className="row p-2">
                <div className="col-md-3">
                    <img width="85px" src={`http://localhost:4200/${item.image}`} alt="" />
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
                            <input style={{ fontSize: '15px' }}  type="number" value={count} step={1} max defaultValue={1} name="quantity" className="quantity-field" />
                            <input onClick={() =>  incrementCount()} type="button" defaultValue="+" className="button-plus" data-field="quantity" />
                        </div>
                    </div>

                }

            </div>
        </div >
    );
};

export default CartItem;