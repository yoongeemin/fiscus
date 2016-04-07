import React from "react";
import { connect } from "react-redux";
import { SignIn } from "./index";
import { Tickers } from "../components/index";
import { signOut } from "../actions/index";
import { getQuotes } from "../actions/index";

if (__CLIENT__) require("../styles/components/navbar.scss");

class NavBar extends React.Component {
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        user: React.PropTypes.object.isRequired,
        userLoading: React.PropTypes.bool.isRequired,
        quotes: React.PropTypes.array.isRequired,
        quotesLoading: React.PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        const { dispatch } = this.props;

        this.handleSignout = () => { dispatch(signOut()); };
    }

    //componentDidMount() {
    //    const { dispatch, user } = this.props;
    //
    //    const authenticated = !user.isEmpty();
    //    if (authenticated) {
    //        dispatch(getQuotes());
    //    }
    //}

    render() {
        const { user, userLoading, quotes } = this.props;
        const authenticated = user.size !== 0;
        return (
            <nav id="navbar" className="fill-width fixed-top box-shadow on-top">
                <div id="navbar-main">
                    <a href="javascript:void(0);">FISCUS</a>
                    { authenticated
                        ? <a onClick={this.handleSignout} href="javascript:void(0);">Sign Out</a>
                        : (!userLoading && <SignIn />)
                    }
                </div>
                { authenticated &&
                <Tickers quotes={quotes} />
                }
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        quotes: state.quoteReducer.quotes,
        quotesLoading: state.quoteReducer.loading,
    };
};

export default connect(mapStateToProps)(NavBar);
