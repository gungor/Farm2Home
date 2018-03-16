import React, {Component} from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';

import {Navbar, Nav, NavItem} from 'react-bootstrap/lib/';
import DataList from './components/DataList'


class App extends Component {
    render() {
        return (


            <div className="App">

                <div className="container-fluid navbar-font">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-10">
                            <Navbar>
                                <Navbar.Toggle/>
                                <Navbar.Collapse>
                                    <Nav>
                                        <NavItem eventKey={1} href="#">
                                            Sat
                                        </NavItem>
                                        <NavItem eventKey={2} href="#">
                                            Ürünlerim
                                        </NavItem>
                                        <NavItem eventKey={3} href="#">
                                            Mesajlar
                                        </NavItem>
                                        <NavItem eventKey={4} href="#">
                                            Ürün İsteyenler
                                        </NavItem>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                        <div className="col-sm-2">
                            <div className="text-right logout" >
                                <span>User</span> | <a href='#'>Çıkış</a>

                            </div>
                        </div>
                    </div>
                </div>

                <header className="App-header">
                    <h1 className="App-title">...</h1>
                </header>

                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={NewProductPage} />
                        <Route path='/sell' component={MyProductPage} />
                    </div>
                </BrowserRouter>

            </div>
        );
    }
}


const NewProductPage = () => <div><div className='site_page-header'>...</div><div className='table-container'><DataList itemName="product" /></div></div>
const MyProductPage = () => <div><div className='site_page-header'>Ürünlerim</div><div className='table-container'><DataList itemName="product" /></div></div>

export default App;
