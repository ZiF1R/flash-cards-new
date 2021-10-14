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
  // let settings = {};
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/settings/`)
    .once("value")
    .then((snapShot) => {
      try {
        console.log(snapShot);
      } catch (error) {
        console.log(error);
      }
    });
  // return [...categories.map((el) => el.name)];
};

export default {
  changeSettings,
  getSettings,
};
