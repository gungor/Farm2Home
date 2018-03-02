import React, {Component} from 'react';
import './App.css';

import {Navbar, Nav, NavItem} from 'react-bootstrap/lib/';


class App extends Component {
    render() {
        return (


            <div className="App">

                <div className="menu-container">
                    <Navbar>
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                Sat
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                Ürünlerim
                            </NavItem>
                            <NavItem eventKey={3} href="#">
                                Mesaj
                            </NavItem>
                            <NavItem eventKey={4} href="#">
                                Ürün İsteyenler
                            </NavItem>
                        </Nav>

                    </Navbar>

                    <div className="logout">

                        <span>User</span> | <a href='#'>Çıkış</a>

                    </div>
                    <div className="clearFloat"></div>
                </div>

                <header className="App-header">
                    <h1 className="App-title">...</h1>
                </header>

            </div>
        );
    }
}

export default App;
