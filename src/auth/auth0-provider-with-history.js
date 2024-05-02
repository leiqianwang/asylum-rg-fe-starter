import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'dev-cxsspj8tsyugnfj7.us.auth0.com';
  const clientId = 'rYGtPWmtN6546QYgWpZv6abfR1m7M5By';

  console.log(domain);
  console.log(clientId);

  const history = useHistory();

  const onRedirectCallBack = appState => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallBack={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
