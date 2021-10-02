import React, { useContext, useEffect, useState } from 'react';
import { Form, Nav, Navbar, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import './Header.css'
import logo from '../../../fakeData/images/logo2.png'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../../../App';

const Header = ({ cart }) => {
    const [food, setFood] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [loggedInUser] = useContext(UserContext);
   
    useEffect(() => {
        fetch('http://localhost:4200/allOrder')
            .then(res => res.json())
            .then(data => {
                // if (data) {
                //     localStorage.setItem('student', JSON.stringify(data));

                // }
                const email= sessionStorage.getItem('email')
                const items = data.filter(item => item.finalData.email === email)
                // console.log(items,data)
                setFood(items.reverse());
            })
    }, [])
    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.assign("/");
    }

    return (
        <div>
            <Navbar fixed="top" className=" bg-white" expand="lg">
                <Navbar.Brand ><Link to='/'><img style={{ width: '150px', marginLeft: '90px' }} src={logo} alt="" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">


                    </Nav>
                    <Form inline>

                        {loggedInUser.email === "darklordsadaf@gmail.com" || sessionStorage.getItem('email') === "darklordsadaf@gmail.com"  ?      <div className="mr-2">    <Link to='/admin/pending' className="cart "><SupervisorAccountIcon /></Link></div> : <></>}
              

                        {
                            cart ? <div className="numberCircle" ><b>{cart}</b></div> : <div></div>

                        }
                        <Link to='/checkout' className="cart"><ShoppingCartIcon /></Link>
         
                        {
                            loggedInUser.email || sessionStorage.getItem('token') ?
                                <div className="row">
                                    <Link to='/' onClick={logout} className="btn login ml-3" style={{ borderRadius: '30px', marginRight: '70px' }}><b>Log out</b></Link>
                                  <p style={{ position: 'relative', left: '-45px', top: '7px', color: '#E51A4B' }}><b>{sessionStorage.getItem('name').split(" ").slice(0, 1)}</b></p>
                                </div>
                                :
                                <div><Link to='/login' style={{ borderRadius: '30px' }} className="btn mr-3 login"><b>Login</b></Link>
                                    <Link to='/signup' style={{ borderRadius: '30px', marginRight: '70px' }} className="btn login"><b>Sign Up</b></Link></div>
                        }
                        {
                           loggedInUser.email || sessionStorage.getItem('token') ? <div>
                            <Button
                                id="demo-customized-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={{  color: '#E51A4B' }}
                            >
                                <b>History</b>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                style={{ width: '75%',padding:'10px' }}
                            >
                                {
                                    food.reverse().map(fd=><div style={{ width: '450px',height: '100%' ,border: '3px solid brown',backgroundColor: 'lightYellow',marginBottom: '25px',padding: '30px'}}>
                                         <div className="font-weight-bold mb-4">Order No: <span style={{color: 'purple'}}>{fd._id.split("").slice(15, 50)}</span></div>  
                                        {fd.finalData.cart.map(item=><p style={{fontSize: '18px'}}><span className="font-weight-bold text-danger">{item.title}</span> <span className="font-weight-bold text-dark">: {item.quantity}pcs</span></p>)} <br />
                                        <div className="row">
                                        <div className="col-md-6">
                                        <p className="mt-2 font-weight-bold">Status: {
                                            fd.finalData.status === "Pending" ? <span className="text-danger">{fd.finalData.status}</span> : <span className="text-success">{fd.finalData.status}</span>
                                        } </p>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-end">
 
                                        <p className="mt-2 font-weight-bold">Amount: <span className="text-danger">{fd.finalData.amount}$</span></p>
                                        </div>
                                        </div>
                                      
                                        </div>)
                                }
                                {
                                    food.length === 0 && <div class="text-danger text-center"  style={{  width: '350px',height: '100%' ,border: '3px solid brown',backgroundColor: 'lightYellow',marginBottom: '25px',padding: '30px'}}><h3>No History Found</h3></div>
                                }
                                
                               
                                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                            </Menu>
                        </div> : <></>
                        }

                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;