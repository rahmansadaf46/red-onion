import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import fakeData from '../../../fakeData';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Item.css'
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';


const Item = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [count, setCount] = useState(1);
    // const [allFood, setAllFood] = useState([]);
    const foodData = localStorage.getItem('food')
    useEffect(() => {
        // setAllFood(JSON.parse(foodData))
            const food = JSON.parse(foodData).find(pd => pd._id === id);
        setItem(food);
        window.scrollTo(0, 0);
    }, [foodData,id])
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = JSON.parse(localStorage.getItem('food')).find(pd => pd._id === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [foodData])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product._id;
        const sameProduct = cart.find(pd => pd._id === toBeAddedKey);
        let newCount;
        let newCart;
        if (sameProduct) {
            newCount = sameProduct.quantity + count;
            sameProduct.quantity = newCount;
            // debugger;
            const others = cart.filter(pd => pd._id !== toBeAddedKey);
            newCart = [...others, sameProduct]
            addToDatabaseCart(sameProduct._id, newCount);
        }
        else {
            product.quantity = count;
            newCart = [...cart, product];
            addToDatabaseCart(product._id, product.quantity);
        }
        setCart(newCart);
        // window.location.reload();

    }

    const incrementCount = () => {
        setCount(count + 1);
    };
    const decrementCount = () => {
        setCount(count - 1);
        if (count > 0) {
            setCount(count - 1);
            // props.handleRemoveProduct(props.product);
        }
        if (count <= 1) {
            setCount(1);
        }

    };
    return (
        <div>
            <Header cart={cart.length}></Header>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-md-5">
                        <p style={{ fontSize: '50px' }} className="mt-4 ">{item.title}</p>
                        <p style={{ fontSize: '15px', lineHeight: '2.1', color: 'gray' }}>{item.description}</p>
                        <div className="row">
                            <p style={{ fontSize: '40px', margin: '0px 30px 0px 20px' }}>${item.price}</p>
                            <span>
                                <div className="input-group item-area">
                                    <input onClick={() => decrementCount()} type="button" defaultValue="-" className="button-minus" data-field="quantity" />
                                    <input type="number" onChange={(event) => {
                                        setCount(event.target.value)
                                    }} value={count} step={1} max defaultValue={1} name="quantity" className="quantity-field" />
                                    <input onClick={() => incrementCount()} type="button" defaultValue="+" className="button-plus" data-field="quantity" />
                                </div>
                            </span>
                        </div>
                        <button onClick={() => handleAddProduct(item)} style={{ backgroundColor: '#F91944', color: 'white', borderRadius: '30px', height: '40px' }} className="btn btn-danger px-4 mt-3"><ShoppingCartIcon className="mr-2" /> Add</button>
                        <div className="row mt-4">
                            <img width="200px" className="mx-4" src={`http://localhost:4200/${item.image}`} alt="" />
                            <img width="200px" className="mx-2" src={`http://localhost:4200/${item.image}`} alt="" />
                        </div>
                    </div>
                    <div className="col-md-7 text-right">
                        <img style={{ width: '550px' }} src={`http://localhost:4200/${item.image}`} alt="" />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Item;