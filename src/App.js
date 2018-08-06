/* global gapi */
import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import './App.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap/lib/';
import DataList from './components/DataList'

const gapiObject = {
    loading: true
}

const gapiPromise = function () {
    return new Promise(function (resolve) {
        resolve(gapi);
    })
}

let oauthToken

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.signinChanged = this.signinChanged.bind(this)
        this.state = {
            loggedIn: false
        }
    }

    signinChanged (val) {
        console.log('signinChanged'+ val)
        this.setState({loggedIn: gapi.auth2.getAuthInstance().isSignedIn.get()})
    };

    componentDidMount() {

        gapiPromise().then(function () {

            gapi.load('client:auth2', function () {
                console.log('promise 1')
                gapi.client.init({
                    clientId: '786520830414-7dvg55iasj1gqosej6mrk41jlegfdkci.apps.googleusercontent.com',
                    scope: 'profile'
                }).then(function () {
                    this.setState({loggedIn: gapi.auth2.getAuthInstance().isSignedIn.get()})
                    gapi.auth2.getAuthInstance().isSignedIn.listen(this.signinChanged)

                    if( ! this.state.loggedIn ){
                        gapi.signin2.render('my-signin2', {
                            'scope': 'https://www.googleapis.com/auth/plus.login',
                            'width': 200,
                            'height': 50,
                            'longtitle': true,
                            'theme': 'light'
                        });
                    }
                }.bind(this))


            }.bind(this))
        }.bind(this))
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}}

        if (this.state.loggedIn ) {
            return (<Redirect to={from}/>)
        }else{
            return (<div id="my-signin2"></div>)
        }
    }
}

function isSignedIn() {

    console.log('isSignedIn called')

    if (gapi.auth2 === undefined)
        return false
    else {
        return gapi.auth2.getAuthInstance().isSignedIn.get()
    }
}


class App extends Component {

    constructor(props) {
        super(props)
        this.signinChanged = this.signinChanged.bind(this)
        this.state = {
            gapiReady: false
        }

        gapiPromise().then(function () {

            gapi.load('client:auth2', function () {
                console.log('promise 1')
                gapi.client.init({
                    clientId: '786520830414-7dvg55iasj1gqosej6mrk41jlegfdkci.apps.googleusercontent.com',
                    scope: 'profile'
                }).then(function () {
                    console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
                    console.log('gapiReady')
                    oauthToken =  gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token

                    gapiObject.loading = false
                    this.setState({gapiReady: true})
                }.bind(this))


            }.bind(this))
        }.bind(this))

    }

    signinChanged (val) {
        console.log('signinChanged'+ val)
    }


    render() {

        let newProductRouter = <PrivateRoute exact path='/' component={NewProductPage}/>
        let myProductRouter = <PrivateRoute path='/sell' component={MyProductPage}/>


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

let PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        !gapiObject.loading ? (isSignedIn()
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
        ) : ''
    )}/>
)

const NewProductPage = () => <div>
    <div className='site_page-header'>...</div>
    <div className='table-container'><DataList itemName="product" oauthToken={oauthToken} /></div>
</div>
const MyProductPage = () => <div>
    <div className='site_page-header'>Ürünlerim</div>
    <div className='table-container'><DataList itemName="product" oauthToken={oauthToken} /></div>
</div>


export default App;
