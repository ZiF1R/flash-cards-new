import firebase from "firebase/app";

const getUid = async () => {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
};

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
    .ref(`/users/${uid}/folders/${folderName}/cards/${oldTerm}`)
    .remove();
  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folderName}/cards/${card.term}`)
    .set({ ...card });
};

const removeCard = async (folderName, cardTerm) => {
  const uid = await getUid();
  await firebase
    .database()
    .ref(`/users/${uid}/folders/${folderName}/cards/${cardTerm}`)
    .remove();
};

export default {
  sendCard,
  editCard,
  removeCard,
};
