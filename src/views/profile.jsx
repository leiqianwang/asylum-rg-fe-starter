import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import userPhoto from './Long Island 2023.jpg';

const Profile = () => {
  const { user } = useAuth0;
  // Extract the user details (use defaults if not available)
  const {
    name = 'Yingying Wang',
    picture = userPhoto,
    email = 'yxw241@gmail.com',
  } = user || {};

  // Hardcoded phone number
  const phone = '850-345-0125';

  return (
    <div id="profile-container" style={styles.pageWrapper}>
      <div style={styles.profileContainer}>
        <div style={styles.imageContainer}>
          <img src={picture} alt="Profile" style={styles.profileImage} />
        </div>
        <div style={styles.infoContainer}>
          <h2>{name}</h2>
          <p>{email}</p>
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: '100vh', // Ensure it takes the full viewport height
    padding: '50px',
    boxSizing: 'border-box',
  },

  profileContainer: {
    background: '#F5F5F5',
    borderRadius: '0.3em',
    marginTop: '8em',
    padding: '1.2em', // Increased padding for more space
    boxShadow: '20px 30px 5px 10px #ccc',
    fontSize: '1em',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '700%',
    height: '300%',
    maxWidth: '800px',
  },
  imageContainer: {
    marginRight: '60px',
  },
  profileImage: {
    borderRadius: '50%',
    width: '150px', // Adjust size as needed
    height: '150px', // Adjust size as needed
    objectFit: 'cover',
  },
  infoContainer: {
    textAlign: 'left',
  },
};

export default Profile;
