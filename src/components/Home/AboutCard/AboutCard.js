import React from 'react';
import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

const AboutCard = ({ service }) => {
    return (
        <div className="col-md-4 d-flex justify-content-center">
            <Card className="item" style={{ width: '30rem', height: '38rem', border: 'none' }}>
                <Card.Img variant="top" src={service.image} />
                <Card.Body className="row">
                    <div className="col-2">
                        <img src={service.icon} alt="" />
                    </div>
                    <div className="col-10"><Card.Title><p style={{ fontSize: '15px', fontWeight: 'bold' }}>{service.title}</p></Card.Title>
                        <Card.Text>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis at laudantium neque fugit quos reprehenderit!
    </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                        {/* <Link style={{ textDecoration: 'none' }}><span><b >See more</b></span><i className="fas fa-arrow-circle-right ml-2" style={{ fontSize: '20px', color: '#2CE155' }}></i></Link> */}
                        </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AboutCard;