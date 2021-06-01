import React from 'react';
import fakeData from '../../../fakeData';
import AboutCard from '../AboutCard/AboutCard';

const About = () => {
    const services = fakeData.slice(18, 21);
    return (
        <div className="container">
            <div className="row">
                <div className=" mt-5 col-6">
                    <p style={{ fontSize: '40px' }}>Why you choose us</p>
                    <p style={{ fontWeight: '600', fontSize: '15px' }} className="mt-4">Barton waited twenty always repair in within we do. An delighted offending
                    curosity my is dashwoods ar. Boy prosperous increasing surrounded.
                    </p>
                </div>
            </div>
            <div className="row mt-4 mb-5">
                {
                    services.map(service => <AboutCard service={service}></AboutCard>)
                }
            </div>
        </div>

    );
};

export default About;