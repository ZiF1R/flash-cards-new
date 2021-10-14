import firebase from "firebase/app";

const getUid = async () => {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
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

export default {
  getUser,
  setUserData,
};
