import { injectGlobal } from 'emotion';
import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

// tslint:disable-next-line:no-import-side-effect
import { FormattedMessage, IntlProvider } from 'react-intl';
import { ConnectedSettingsLoader } from './components/settings';
import { Header, baseCss, resetCss } from './components/ui';
import { ConnectedUserDetails } from './components/user/user-details';
import { CreateCustomTransaction } from './components/views/create-custom-transaction';
import { CreateUser } from './components/views/create-user';
import { ConnectedUser } from './components/views/user';
import { ConnectedUserSearch } from './components/views/user-search';
import { ConnectedUserTransaction } from './components/views/user-transaction';
import { en } from './locales/en';
import { store } from './store';

// inject global non scoped css stylings
// tslint:disable-next-line:no-unused-expression
injectGlobal(resetCss);
injectGlobal(baseCss);

class Layout extends React.Component {
  // tslint:disable-next-line:prefer-function-over-method
  public render(): JSX.Element {
    return (
      <div className="App">
        <Header>
          <h1>
            <Link to="/">
              <FormattedMessage id="TALLY_HEADER" />
            </Link>
          </h1>
        </Header>
        <ConnectedSettingsLoader />
        <Switch>
          <Route
            path="/active_users"
            exact={true}
            render={props => <ConnectedUser {...props} stale={false} />}
          />
          <Route
            path="/inactive_users"
            exact={true}
            render={props => <ConnectedUser {...props} stale={true} />}
          />
          <Route path="/create_user" exact={true} component={CreateUser} />
          <Route
            path="/find_users"
            exact={true}
            component={ConnectedUserSearch}
          />
          <Route
            path="/user/:id"
            exact={true}
            component={ConnectedUserDetails}
          />
          <Route
            path="/user/:id/:deposit"
            exact={true}
            component={CreateCustomTransaction}
          />
          <Route
            path="/user/:id/send_money_to_a_friend"
            exact={true}
            component={ConnectedUserTransaction}
          />

          <Redirect from="/" to="/active_users" />
        </Switch>
      </div>
    );
  }
}

class App extends React.Component {
  // tslint:disable-next-line:prefer-function-over-method
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <IntlProvider locale="en" messages={en}>
          <HashRouter hashType="hashbang">
            <Layout />
          </HashRouter>
        </IntlProvider>
      </Provider>
    );
  }
}

// tslint:disable-next-line:no-default-export
export default App;