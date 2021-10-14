/* eslint-disable */
import firebase from "firebase/app";
import auth from './db-modules/auth';
import user from './db-modules/user';
import folders from './db-modules/folders';
import categories from './db-modules/categories';
import cards from './db-modules/cards';
import review from './db-modules/review';

const getUid = async () => {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
};

export const _db = {
  getUid,
  ...auth,
  ...user,
  ...folders,
  ...categories,
  ...cards,
  ...review,
};
