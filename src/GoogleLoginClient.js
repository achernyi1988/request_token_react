import React from 'react';
import {connect} from 'react-redux'
import { GoogleLogin , GoogleLogout } from 'react-google-login';

import {login,logout} from "./redux/action";

const clientId = "947615618876-kp7q6jm7ehfdnbiu1vg3oci5cv0qttla.apps.googleusercontent.com";

class GoogleLoginClient extends React.Component{



    responseGoogle = (response) => {

        if(response){
            this.props.loginAction(response.googleId);
        //    localStorage.setItem("googleLogin", id )
        }
    }

    onLogoutSuccess = () => {
        console.log("GoogleLoginClient::onLogoutSuccess");
        this.props.logoutAction();
     //   localStorage.removeItem("googleLogin" )
    }

    render() {
        console.log("GoogleLoginClient::render",this.props.isLoggin);
        if(!this.props.isLoggin){
            return <GoogleLogin
                clientId={clientId}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        }
        else{
            return <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={this.onLogoutSuccess}
            />
        }
    }
}

const mapStateToProps = (state) => {
    console.log("GoogleLoginClient::mapStateToProps", state);
    return {
        isLoggin: state.isLoggin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginAction: id => dispatch(login(id)),
        logoutAction:() => dispatch(logout())
    }
}

export default connect(mapStateToProps,
    mapDispatchToProps
    )(GoogleLoginClient)