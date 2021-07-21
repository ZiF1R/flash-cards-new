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
  return await getUid() ? true : false;
};

const sendFolder = async (folder) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folder.data.name}`)
    .set({ ...folder });

  // let data = (await getFolders()) || [];
  // return data;
};

const getFolders = async () => {
  let dbData = [];
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/folders/`)
    .once("value")
    .then((snapShot) => {
      try {
        if (snapShot.toJSON()) {
          dbData = Object.values(snapShot.toJSON()) || [];
          for (let folder of dbData) {
            if (folder.cards) folder.cards = [...Object.values(folder.cards)];
            else folder.cards = [];
          }
        }
      } catch (error) {
        return 0;
      }
    });

  return dbData;
};

const removeFolder = async (name) => {
  const uid = await getUid();
  await firebase.database().ref(`/users/${uid}/folders/${name}`).remove();
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

const editFolder = async (folder, oldName) => {
  const uid = await getUid();
  (folder.data.name !== oldName) && 
    await firebase.database().ref(`/users/${uid}/folders/${oldName}`).remove();

  let obj = {};
  if (Array.isArray(folder.cards)) {
    folder.cards.map((el) => (obj[el.term] = el));
  }
  // folder.cards = { ...obj };

  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folder.data.name}/`)
    .set({ ...folder });

    await firebase
      .database()
      .ref(`/users/${uid}/folders/${folder.data.name}/cards/`)
      .set({ ...obj });
};

// *____*

const sendCard = async (newCard, rootFolderName) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/folders/${rootFolderName}/cards/${newCard.term}`)
    .set({ ...newCard });
};

const editCard = async (card, oldTerm, folderName) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(
      `/users/${uid}/folders/${folderName}/cards/${oldTerm}`
    )
    .remove();
  await firebase
    .database()
    .ref(
      `/users/${uid}/folders/${folderName}/cards/${card.term}`
    )
    .set({ ...card });
};

const removeCard = async (folderName, cardTerm) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folderName}/cards/${cardTerm}`)
    .remove();
};

const sendReviewResult = async (card, folderData) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folderData.name}/cards/${card.term}`)
    .set({ ...card });

  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folderData.name}/data/`)
    .set({ ...folderData });
};

export const _db = {
  getUid,
  login,
  logout,
  signUp,
  getUser,
  setUserData,
  isSignIn,
  sendFolder,
  getFolders,
  removeFolder,
  sendCategory,
  getCategories,
  editFolder,
  sendCard,
  editCard,
  removeCard,
  sendReviewResult,
};
