import firebase from "firebase/app";

const getUid = async () => {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
};

const login = async (data) => {
  try {
    let userData;
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    const uid = await getUid();
    await firebase
      .database()
      .ref(`/users/${uid}/info`)
      .once("value")
      .then((snapShot) => {
        const user = snapShot.toJSON();
        userData = { ...user };
      });

    localStorage.setItem("login", true);
    return userData;
  } catch (error) {
    return error.message;
  }
};

const logout = async () => {
  localStorage.setItem("login", false);
  await firebase.auth().signOut();
};

const signUp = async (user) => {
  /* eslint-disable */
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.Email, user.Password);
    const uid = await getUid();

    // delete un useful fields for data base
    let removeProperty = ({ Confirm_password, ...rest }) => rest;
    user = removeProperty(user);

    await firebase
      .database()
      .ref(`/users/${uid}/info`)
      .set({ ...user });
  } catch (error) {
    return error.message;
  }
  return 0;
};

const getUser = async () => {
  let user;
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/info`)
    .once("value")
    .then((snapShot) => {
      user = snapShot.toJSON();
    });
  return user;
};

const setUserData = async (userData) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/info`)
    .set({ ...userData });
};

const isSignIn = async () => {
  try {
    await getUid();
    return true;
  } catch (error) {
    return false;
  }
};

export const _db = {
  getUid,
  login,
  logout,
  signUp,
  getUser,
  setUserData,
  isSignIn,
};
