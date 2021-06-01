import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../../fakeData';
import { getDatabaseCart } from '../../../utilities/databaseManager';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';

const Menu = () => {
    const [food, setFood] = useState([]);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.id === existingKey);
            // console.log(existingKey, savedCart[existingKey]);
            product.quantity = savedCart[existingKey];
            console.log(product);
            return product;
        })
        // setProducts(previousCart);
        setCart(previousCart);
    }, [])

    useEffect(() => {
        const category = fakeData.filter(pd => pd.category === search);
        setFood(category);
    }, [search])
    useEffect(() => {
        const items = fakeData.slice(0, 6);
        setFood(items);
    }, []);
    const handleSearch = value => {
        // console.log(value);
        setSearch(value);

    }




    return (
        <div className="mt-5">
            <div className="text-center cat">
                <nav>
                    <ul>
                        <li class="menu"><Link onClick={() => handleSearch('breakfast')}><b>Breakfast</b></Link></li>
                        <li class="menu"><Link onClick={() => handleSearch('lunch')}><b>Lunch</b></Link></li>
                        <li class="menu"><Link onClick={() => handleSearch('dinner')}><b>Dinner</b></Link></li>
                    </ul>
                </nav>
            </div>

            <div className="container mt-5">
                <div className="row">
                    {
                        food.map(item => <MenuItem item={item}></MenuItem>)
                    }
                </div>
            </div>

            {
                cart.length > 0 ? <div className="text-center my-4">
                    <Link to='/checkout' style={{ color: 'white' }} className="btn btn-danger px-5">Checkout Your Food</Link>
                </div>
                    :
                    <div className="text-center my-4">
                        <Link style={{ backgroundColor: 'gray', color: 'white', outline: 'none' }} className="btn  px-5">Checkout Your Food</Link>
                    </div>
            }
        </div>
    );
};

export default Menu;