import firebase from '../firebase';

const login = (userDetails) => {
  const { email, password } = userDetails;
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((UserCredential) => {
        const { user } = UserCredential;
        return resolve(user);
      })
      .catch((error) => {
        return reject(error.message);
      });
  });
};

const logout = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        return resolve();
      })
      .catch((error) => {
        return reject(error.message);
      });
  });
};

const signup = (signupDetails) => {
  const { email, password } = signupDetails;
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((UserCredential) => {
        const { user } = UserCredential;
        return resolve(user);
      })
      .catch((error) => {
        return reject(error.message);
      });
  });
};

export { login, logout, signup };
