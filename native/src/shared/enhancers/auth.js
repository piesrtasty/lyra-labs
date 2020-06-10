import React, {useReducer, useMemo, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Auth0 from 'react-native-auth0';

const audience = 'https://lyralabs.auth0.com/api/v2/';

const auth0 = new Auth0({
  domain: 'lyralabs.auth0.com',
  clientId: '08XmtJS37alfY5zW1sVAq2Y0agmy1pV4',
  audience,
});

export const AuthContext = React.createContext();

export const withAuth = Component => {
  const WithAuth = () => {
    const [state, dispatch] = useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              accessToken: action.token,
              isLoading: false,
            };
          case 'SIGN_IN':
            return {
              ...prevState,
              isSignout: false,
              accessToken: action.token,
            };
          case 'SIGN_OUT':
            return {
              ...prevState,
              isSignout: true,
              accessToken: null,
            };
        }
      },
      {
        isLoading: true,
        isSignout: false,
        accessToken: null,
      },
    );

    useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
        let accessToken = null;
        try {
          const session = await AsyncStorage.getItem('session');
          const sessionObj = JSON.parse(session);
          accessToken = sessionObj.accessToken;
          const refreshToken = sessionObj.refreshToken;
          // Get a new access token
          auth0.auth
            .refreshToken({refreshToken})
            .then(async response => {
              // Set the response from the refresh token as the new session
              await AsyncStorage.setItem('session', JSON.stringify(response));
            })
            .catch(error => console.log(error));
        } catch (e) {
          // Restoring token failed
        }

        // After restoring token, we may need to validate it in production apps

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        dispatch({type: 'RESTORE_TOKEN', token: accessToken});
      };

      bootstrapAsync();
    }, []);

    const authContext = useMemo(
      () => ({
        signIn: async data => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token
          auth0.webAuth
            .authorize({
              scope: 'openid profile email offline_access',
              audience: 'https://lyralabs.auth0.com/api/v2/',
            })
            .then(async credentials => {
              await AsyncStorage.setItem(
                'session',
                JSON.stringify(credentials),
              );
              dispatch({type: 'SIGN_IN', token: credentials.accessToken});
            })
            .catch(error => console.log(error));
        },
        signOut: async () => {
          auth0.webAuth
            .clearSession({})
            .then(async success => {
              await AsyncStorage.removeItem('session');
              dispatch({type: 'SIGN_OUT'});
            })
            .catch(error => console.log(error));
        },
        signUp: async data => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token

          dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        },
      }),
      [],
    );
    return (
      <AuthContext.Provider value={{authContext, ...state}}>
        <Component />
      </AuthContext.Provider>
    );
  };
  return WithAuth;
};
