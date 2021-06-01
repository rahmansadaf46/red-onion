import React from 'react';
import { Link } from 'react-router-dom';
import './Search.css'

const Search = () => {
    return (
        <div style={{ marginTop: '68px' }} className="search-container">
            <div style={{ margin: '0 auto', textAlign: 'center' }} className="">
                <h1 className="headline ">Best food waiting for your belly</h1>
                <div style={{ position: 'relative' }} className="mt-4">
                    <input className="search-food pl-4" placeholder="Search food items..." type="text" />
                    <button style={{ backgroundColor: '#F91944', color: 'white', borderRadius: '30px', left: '-40px', top: '-2px', height: '40px', position: 'relative' }} className="btn pr-4 pl-4" href="#">Search</button>
                </div>
            </div>

        </div>
    );
};

export default Search;