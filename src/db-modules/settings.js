import firebase from "firebase/app";

const getUid = async () => {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
};

const changeSettings = async (newSettings) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/settings/`)
    .set({ ...newSettings });
};

const getSettings = async () => {
  let settings = {};
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/settings/`)
    .once("value")
    .then((snapShot) => {
      try {
        if (snapShot.toJSON()) {
          settings = snapShot.toJSON();
        }
      } catch (error) {
        console.log(error);
      }
    });
  return settings;
};

export default {
  changeSettings,
  getSettings,
};
