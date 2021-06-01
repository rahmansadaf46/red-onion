import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../../../fakeData/images/logo.png'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="container">
                <div style={{ paddingTop: '70px' }} className="row ">
                    <div className="col-md-6"> <img style={{ width: '200px' }} src={logo2} alt="" /></div>
                    <div className=" col-md-3">
                        <ul>
                            <li className="mb-2"><Link className="text-white ">About Online food</Link></li>
                            <li className="mb-2"><Link className="text-white">Read our blog</Link></li>
                            <li className="mb-2"><Link className="text-white">Sign up to deliver</Link></li>
                            <li className="mb-2"><Link className="text-white">Add your restaurant</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 ">
                        <ul >
                            <li className="mb-2"><Link className="text-white">Get help</Link></li>
                            <li className="mb-2"><Link className="text-white">Read FAQs</Link></li>
                            <li className="mb-2"><Link className="text-white">View all cities</Link></li>
                            <li className="mb-2"><Link className="text-white">Restaurants near me</Link></li>
                        </ul>
                    </div>
                </div>
                <div className=" row pb-5 pt-5">
                    <div style={{ marginRight: '190px' }} className="col-md-4 ">
                        <small style={{ color: 'lightGray' }}>Copyright @2021 || Sadaf Rahman</small>
                    </div>
                    <div className="col-md-2 text-right">
                        <Link className="text-white">Privacy Policy.</Link>
                    </div>
                    <div className="col-md-2 pl-5">
                        <Link className="text-white">Terms of Use</Link>
                    </div>
                    <div className="col-md-2 pl-5">
                        <Link className="text-white">Pricing</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;