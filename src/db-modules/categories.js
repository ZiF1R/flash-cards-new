import firebase from "firebase/app";

const getUid = async () => {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
};

const sendCategory = async (category) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/categories/${category}`)
    .set({ name: category });
};

const getCategories = async () => {
  let categories = [];
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/categories/`)
    .once("value")
    .then((snapShot) => {
      try {
        if (snapShot.toJSON()) {
          categories = Object.values(snapShot.toJSON()) || [];
        }
      } catch (error) {
        console.log(error);
      }
    });
  return [...categories.map((el) => el.name)];
};

export default {
  sendCategory,
  getCategories,
};
