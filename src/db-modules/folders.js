import firebase from "firebase/app";

const getUid = async () => {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
};

const sendFolder = async (folder) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folder.data.name}`)
    .set({ ...folder });
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

const editFolder = async (folder, oldName) => {
  const uid = await getUid();
  folder.data.name !== oldName &&
    (await firebase
      .database()
      .ref(`/users/${uid}/folders/${oldName}`)
      .remove());

  let obj = {};
  if (Array.isArray(folder.cards)) {
    folder.cards.map((el) => (obj[el.term] = el));
  }

  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folder.data.name}/`)
    .set({ ...folder });

  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folder.data.name}/cards/`)
    .set({ ...obj });
};

export default {
  sendFolder,
  getFolders,
  removeFolder,
  editFolder,
};
