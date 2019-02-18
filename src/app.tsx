import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

import {
  Global,
  Theme,
  ThemeProvider,
  dark,
  light,
  resetCss,
  styled,
} from 'bricks-of-sand';
import { IntlProvider } from 'react-intl';
import { ArticleRouter } from './components/article/article-router';
import { ConnectedErrorMessage } from './components/common/error-message';
import { HeaderMenu } from './components/common/header-menu';
import { ConnectedSettingsLoader } from './components/settings';
import { SplitInvoiceForm } from './components/transaction';
import { MainFooter, baseCss, mobileStyles } from './components/ui';
import { GlobalLoadingIndicator } from './components/ui/loader';
import { UserRouter } from './components/user/user-router';
import { en } from './locales/en';
import { store } from './store';

// tslint:disable-next-line:no-import-side-effect
import 'inter-ui';

const newLight: Theme = {
  ...light,
  greenLight: '#D4E8D3',
  greenText: '#6F9C7A',
};
const newDark: Theme = {
  ...dark,
  red: '#FFBAC2',
  green: '#C2FFCD',
  greenLight: 'rgba(36,200,65,0.20)',
  redLight: ' rgba(226,87,102,0.20)',
};

const Grid = styled('div')({
  display: 'grid',
  gridTemplateRows: '4rem 1fr 4rem',
  minHeight: '100vh',
});

const TouchStyles = () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (isTouchDevice) {
    return <Global styles={mobileStyles} />;
  }
  return null;
};

class Layout extends React.Component {
  // tslint:disable-next-line:prefer-function-over-method
  public render(): JSX.Element {
    return (
      <Grid>
        <Global styles={resetCss} />
        <Global styles={baseCss} />
        <TouchStyles />
        <GlobalLoadingIndicator />
        <ConnectedErrorMessage />
        <ConnectedSettingsLoader />
        <HeaderMenu />
        <Switch>
          <Route path="/articles" component={ArticleRouter} />
          <Route path="/user" component={UserRouter} />
          <Route path="/split-invoice" component={SplitInvoiceForm} />
          <Redirect from="/" to="/user/active" />
        </Switch>
        <MainFooter />
      </Grid>
    );
  }
}

class App extends React.Component {
  // tslint:disable-next-line:prefer-function-over-method
  public render(): JSX.Element {
    return (
      <ThemeProvider themes={{ light: newLight, dark: newDark }}>
        <StoreContext.Provider value={store}>
          <Provider store={store}>
            <IntlProvider
              textComponent={React.Fragment}
              locale="en"
              messages={en}
            >
              <HashRouter hashType="hashbang">
                <Layout />
              </HashRouter>
            </IntlProvider>
          </Provider>
        </StoreContext.Provider>
      </ThemeProvider>
    );
  }
}

// tslint:disable-next-line:no-default-export
export default App;
