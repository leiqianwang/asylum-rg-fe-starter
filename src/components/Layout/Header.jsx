import React from 'react';
import Profile from '../../views/profile';
import { useAuth0 } from '@auth0/auth0-react';

import { Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../styles/Images/WhiteLogo.png';
import { colors } from '../../styles/data_vis_colors';

import AuthenticationButton from '../authentication-button';
import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
const { primary_accent_color } = colors;

function HeaderContent() {
  const { isAuthenticated } = useAuth0(); // Check if user is authenticated
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: primary_accent_color,
      }}
    >
      <div className="hrf-logo">
        <a href="https://www.humanrightsfirst.org/">
          <Image width={100} src={Logo} preview={false} alt="HRF logo white" />
        </a>
      </div>

      <div>
        <AuthenticationButton />
        {/* <MainNav /> */}
      </div>

      <div style={{ display: 'flex', gap: '15px', paddingRight: '50px' }}>
        <Link to="/" style={{ color: '#E2F0F7', paddingRight: '75px' }}>
          Home
        </Link>
        <Link to="/graphs" style={{ color: '#E2F0F7' }}>
          Graphs
        </Link>

        {isAuthenticated && (
          <Link to="/profile" style={{ color: '#E2F0F7' }}>
            Profile
          </Link>
        )}

        <Route path="/profile">
          {isAuthenticated ? <Profile /> : <Redirect to="/" />}
        </Route>
      </div>
    </div>
  );
}

export { HeaderContent };
