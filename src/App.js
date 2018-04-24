/* global gapi */
import React, {Component} from 'react';
import {BrowserRouter , Route, Redirect} from 'react-router-dom';
import './App.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap/lib/';
import DataList from './components/DataList'

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        console.log('authenticated')
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (



        isSignedIn()
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)

const gapiPromise = function(){
    return new Promise( function (resolve) {
            console.log('resolved')
            resolve(gapi);

    })
}

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    }

    login = () => {
        console.log('login called')
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    }

    googleSuccess(googleUser){
        console.log('google success called')
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer === true) {
            <Redirect to={from} />
        }

        return (
            <div className="g-signin2" onClick={this.login} data-onsuccess="googleSuccess"></div>
        )
    }
}

function isSignedIn() {
    if( gapi.auth2 === undefined )
        return false
    else{
        return gapi.auth2.getAuthInstance().isSignedIn.get()
    }
}


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gapiReady: false
        }


    }

    componentDidMount(){
        gapiPromise().then(function () {

            gapi.load('client:auth2', function () {
                console.log('promise 1')
                gapi.client.init({
                    clientId: '786520830414-7dvg55iasj1gqosej6mrk41jlegfdkci.apps.googleusercontent.com',
                    scope: 'profile'
                }).then(function () {
                    this.setState({gapiReady: true})
                    console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
                    console.log('adasda')
                }.bind(this))


            }.bind(this))
        }.bind(this))
    }


    render() {

        const newProductRouter = <PrivateRoute exact path='/' component={NewProductPage}/>
        const myProductRouter = <PrivateRoute path='/sell' component={MyProductPage}/>

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
                            <div className="text-right logout">
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
                        {newProductRouter}
                        {myProductRouter}
                        <Route path="/login" component={Login}/>
                    </div>

                </BrowserRouter>
            </div>
        )
    }


}


const NewProductPage = () => <div>
    <div className='site_page-header'>...</div>
    <div className='table-container'><DataList itemName="product"/></div>
</div>
const MyProductPage = () => <div>
    <div className='site_page-header'>Ürünlerim</div>
    <div className='table-container'><DataList itemName="product"/></div>
</div>


export default App;
