import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Feed from '../Routes/Feed';

const LoggedInRoutes = () => (
    <Fragment>
        <Route exact path="/" component={Feed} />
    </Fragment>
);

const LoggedOutRoutes = () => (
    <Fragment>
        <Route exact path="/" component={Auth} />
    </Fragment>
)

const AppRouter = ({isLoggedIn}) => (
    <Router>
        <Switch>
            {isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/> }
        </Switch>
    </Router>
)

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;