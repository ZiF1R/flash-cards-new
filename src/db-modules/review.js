import firebase from "firebase/app";

const getUid = async () => {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
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

export default {
  sendReviewResult,
};
