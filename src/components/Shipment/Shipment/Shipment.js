import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import map from '../../../fakeData/images/ordercomplete-map.jpg';
import scooter from '../../../fakeData/images/Image/scooter.png';
import helmet from '../../../fakeData/images/Image/helmet.png';
import './Shipment.css';



const Shipment = () => {
    return (
        <div>
            <Header></Header>
            <div className="mt-5 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 mr-5">
                            <img style={{ width: '700px' }} src={map} alt="" />
                        </div>
                        <div className="col-md-4">
                            <div style={{ background: '#E8E8E8', marginLeft: '40px', border: '1px solid white', borderRadius: '20px' }}>
                                <img style={{ width: "90px", margin: '20px 40px 0px 40px' }} src={scooter} alt="" />


                                <div style={{ background: 'white', border: '1px solid white', borderRadius: '10px', margin: '15px 15px 0px 15px' }}>
                                    <div className=" ship">
                                        <ul >
                                            <li ><b>Your Location</b>
                                                <p style={{ marginBottom: '-2px' }}></p>
                                                <li ><small>107 Rd No 8</small></li>
                                            </li>
                                            <li><br /></li>
                                            <li><br /></li>
                                            <li><br /></li>
                                            <li >
                                                <b>Shop Address</b>
                                                <p style={{ marginBottom: '-5px' }}></p>
                                                <small>Gulshan Plaza Restaura</small>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                                <div style={{ padding: '10px 30px 10px 20px' }}>
                                    <p style={{ fontSize: '30px', marginBottom: '-8px' }}>09:30</p>
                                    <small>Estimated delivery time</small>
                                </div>


                                <div style={{ background: 'white', border: '1px solid white', borderRadius: '10px', margin: '0px 15px 2px 15px' }}>
                                    <div className=" row">
                                        <div className="col-md-3">
                                            <img style={{ width: "60px", margin: '10px  ' }} src={helmet} alt="" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mt-3 ml-2">
                                                <b>Hamim</b>
                                                <p style={{ marginBottom: '-5px' }}></p>
                                                <small>Your rider</small></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center pb-3">
                                    <button style={{ padding: '10px 110px' }} className="btn btn-danger mt-3">Contact</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Shipment;