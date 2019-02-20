import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { WrappedIdleTimer } from '../common/idle-timer';
import { UserMetricsView } from '../metrics';
import { UserDetails } from './user-details';
import { TransactionOverview } from './views/transaction-overview';
import { User } from './views/user';

export function UserRouter(): JSX.Element {
  return (
    <>
      <WrappedIdleTimer />
      <Switch>
        <Route
          path="/user/active"
          exact={true}
          render={props => <User {...props} isActive={true} />}
        />
        <Route
          path="/user/inactive"
          exact={true}
          render={props => <User {...props} isActive={false} />}
        />
        <Route
          path="/user/active/add"
          exact={true}
          render={props => (
            <User {...props} showCreateUserForm={true} isActive={true} />
          )}
        />
        <Route
          path="/user/inactive/add"
          exact={true}
          render={props => (
            <User {...props} showCreateUserForm={true} isActive={false} />
          )}
        />
        <Route
          path="/user/inactive"
          exact={true}
          render={props => <User {...props} isActive={false} />}
        />
        <Route
          path="/user/transactions/:id/:page"
          exact={true}
          component={TransactionOverview}
        />
        <Route path="/user/:id/metrics" component={UserMetricsView} />
        <Route path="/user/:id" component={UserDetails} />
        <Redirect from="/" to="/user/active" />
      </Switch>
    </>
  );
}

export function UserArticleTransactionLink(props: { id: number }): JSX.Element {
  return (
    <Link to={`/user/${props.id}/article`}>
      <FormattedMessage id="USER_ARTICLE_LINK" />
    </Link>
  );
}

export function getUserDetailLink(id: number): string {
  return `/user/${id}`;
}

export function getUserTransactionsLink(id: number, page: number = 0): string {
  return `/user/transactions/${id}/${page}`;
}

export function getUserPayPalLink(id: number): string {
  return `${getUserDetailLink(id)}/paypal`;
}

export type UserRouteProps = RouteComponentProps<{ id: string }>;
