import { Auth, Hub, Logger } from 'aws-amplify';
import { getJson, setJson, removeAllItems } from './storage';
import {AsyncStorage} from 'react-native';

const AUTH_KEY = 'authentication';

const logger = new Logger('utils/auth');

/**
 * Legacy Authentication module, wrapping around Amplify's Auth module.
 * Newer code should work with Amplify Auth directly.
 *
 * TODO: switch to Amplify's {@code Authenticator}
 * TODO: remove this module
 *
 * @deprecated
 */
class LegacyAuth {
  constructor() {
    this.data = getJson(AUTH_KEY);
    this.listeners = [];
  }

  isAuth() {
    console.log(25)
    // TODO: return !!Auth.user;
    return !!(this.getToken());
  }

  getToken() {
    // console.log(31, this.data)
    // TODO: return Auth.user.getSignInUserSession().getIdToken().getJwtToken();
    return this.data && this.data.tokens && this.data.tokens.access;
  }

  getTokens() {
    return this.data && this.data.tokens;
  }

  getAccessToken() {
    // TODO: return Auth.user.getSignInUserSession().getRefreshToken().getToken();
    return this.data && this.data.tokens && this.data.tokens.access;
  }

  getRefreshToken() {
    // TODO: return Auth.user.getSignInUserSession().getAccessToken().getJwtToken();
    return this.data && this.data.tokens && this.data.tokens.refresh;
  }

  setAuth(data) {
    this.data = data;
    this.listeners.forEach(listener => listener());
    setJson(AUTH_KEY, this.data);
  }

  setAuthToken(tokens) {
    this.data.tokens = tokens;
    this.listeners.forEach(listener => listener());
    setJson(AUTH_KEY, this.data);
  }

  logout() {
    this.data = {};
    this.listeners.forEach(listener => listener());
    removeAllItems();
  }

  onChange(listener) {
    this.listeners.push(listener);
    return () => this.removeListener(listener);
  }

  removeListener(listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}

// TODO: cleanup
const instance = new LegacyAuth();

window.Auth = Auth;

// Prefetch user information, this is necessary because the original
// {@code auth} module was designed to work synchronously, while
// Amplify is asynchronous.
// The callback is to force Promise running, wasn't intended to do
// anything there.
// console.log(Auth);
Auth.currentAuthenticatedUser().then((res) => {
  // console.log(res)
  return true
})
.catch(error => console.log(error))

// Bridging events between Amplify Auth and LegacyAuth
// I have no idea about why Amplify call event buses Hub and event Capsules.
instance.onChange(() => {
  if (!instance.data) {
    Auth.user.signOut(() => { logger.info('Signed out'); });
  }
});

const bridge = new Logger('bridge');
bridge.onHubCapsule = (capsule) => {
  const { event, data } = capsule.payload;
  if (event === 'signIn') {
    if (!instance.getTokens()) {
      instance.setAuth(data);
      instance.setAuthToken({
        // Need to use identity token here so that custom claims are included
        access: data.signInUserSession.idToken.jwtToken,
        refresh: data.signInUserSession.refreshToken.token,
        identity: data.signInUserSession.idToken.jwtToken,
      });
    }
  } else if (event === 'signOut') {
    // As the legacy Auth still exists, we need to clear all
    // auth data once Amplify Auth has signed out
    AsyncStorage.removeItem('outsight.authentication');
    AsyncStorage.removeItem('outsight.state');
    window.location.reload();
  }
  logger.info(capsule);
};

Hub.listen('auth', bridge);


export default instance;
