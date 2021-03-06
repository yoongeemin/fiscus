import React from "react";
import { Link } from "react-router";

if (__CLIENT__) require("../styles/components/authentication.scss");

export default class Authentication extends React.Component {
    render() {
        return (
            <div id="authentication">
                <Link to="/signup" className="center-block btn btn-signup btn-email-signup">
                    <span className="glyphicon glyphicon-envelope margin-right"></span>
                    <span>Sign Up with Email</span>
                </Link>
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
        );
    }
}
