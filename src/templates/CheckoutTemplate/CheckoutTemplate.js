import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { USER_LOGIN } from "../../util/settings/config";
import Header from "./../HomeTemplate/Layout/Header/Header";
import Footer from "./../HomeTemplate/Layout/Footer/Footer";






const CheckoutTemplate = (props) => {
    const { Component, ...restRoute } = props;
    useEffect(() => {
        window.scrollTo(0,0);
    })
    if(!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to="/login" />
    }

    return <Route {...restRoute} render={(propsRoute) => { //props.location,props.history.props.match

        return <Fragment>

            <Component {...propsRoute} />

            <Footer  />


        </Fragment>
    }} />
}

export default CheckoutTemplate;