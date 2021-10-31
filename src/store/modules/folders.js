import { _db } from "@/db.js";

/* eslint-disable */
export default {
  actions: {
    async fetchFolders({ commit }) {
      commit("updateFolders", await _db.getFolders());
    },
    async sendFolder({ commit, state }, newFolder) {
      if (
        state.folders.filter((el) => el.data.name === newFolder.data.name)
          .length === 0
      ) {
        commit("addFolder", newFolder);
        await _db.sendFolder(newFolder);
        return true;
      }
      return false;
    },
    async removeFolder({ commit }, folderToRemove) {
      commit("removeFolder", folderToRemove);
      await _db.removeFolder(folderToRemove.data.name);
    },
    async fetchCategories({ commit }) {
      commit("updateCategories", await _db.getCategories());
    },
    async sendCategory({ commit, state }, newCategory) {
      if (
        state.categories.filter((category) => category === newCategory)
          .length === 0
      ) {
        commit("addCategory", newCategory);
        await _db.sendCategory(newCategory);
        return true;
      }
      return false;
    },
    async changeFolder({ commit, state }, {oldFolder, editedFolder}) {
      let uniqName =
        state.folders.filter(
          (folder) =>
            folder !== oldFolder && folder.data.name === oldFolder.data.name
        ).length === 0;

      if (uniqName) {
        let oldName = oldFolder.data.name;
        [oldFolder.data.name, oldFolder.data.category] =
          [editedFolder.data.name, editedFolder.data.category];

        commit("changeFolder", {oldName, newFolder: oldFolder});
        await _db.editFolder(oldFolder, oldName);
        return true;
      }
      return false;
    },
    async addCards({ commit }, folder) {
      commit("changeFolder", {oldName: folder.data.name, newFolder: folder});
      await _db.editFolder(folder, folder.data.name);
    },

    async sendCard({ commit }, { newCard, rootFolder }) {
      if (
        rootFolder.cards.filter((card) => card.term === newCard.term)
          .length === 0 && rootFolder !== null
      ) {
        commit("addCard", { newCard, rootFolder });
        await _db.sendCard(newCard, rootFolder.data.name);
        return true;
      }
      return false;
    },
    async changeCard({ commit }, {oldCard, editedCard, rootFolder}) {
      let uniqName =
        rootFolder.cards.filter(
          (card) =>
            card !== oldCard && card.term === editedCard.term
        ).length === 0;

      if (uniqName) {
        let oldTerm = oldCard.term;
        [oldCard.term, oldCard.definition, oldCard.examples] =
          [editedCard.term, editedCard.definition, editedCard.examples];

        commit("changeCard", {oldTerm, newCard: oldCard, rootFolder});
        await _db.editCard(oldCard, oldTerm, rootFolder.data.name);
        return true;
      }
      return false;
    },
    async removeCard({ commit }, { rootFolder, cardToRemove }) {
      commit("removeCard", { rootFolder, cardToRemove });
      await _db.removeCard(rootFolder.data.name, cardToRemove.term);
    },
    async findFolderByName({ state }, folderName) {
      return await state.folders.filter((folder) => folder.data.name === folderName)[0];
    },
  },
  mutations: {
    updateFolders(state, newFoldersData) {
      state.folders = [...newFoldersData];
    },
    addFolder(state, newFolder) {
      state.folders.push(newFolder);
    },
    changeFolder(state, {oldName, newFolder}) {
      state.folders = state.folders.map((folder) => {
        if (folder.data.name === oldName) folder = newFolder;
        return folder;
      });
    },
    removeFolder(state, folderToRemove) {
      state.folders = state.folders.filter(
        (folder) => folder !== folderToRemove
      );
    },
    updateCategories(state, newCategoriesData) {
      state.categories = ["none", ...newCategoriesData];
    },
    addCategory(state, newCategory) {
      state.categories.push(newCategory);
    },

    addCard(state, { newCard, rootFolder }) {
      state.folders.map((folder) => {
        if (folder === rootFolder) folder.cards.push(newCard);
        return folder;
      });
    },
    changeCard(state, {oldTerm, newCard, rootFolder}) {
      state.folders = state.folders.map((folder) => {
        if (folder === rootFolder) {
          folder.cards.map(
            (card) => {
              if (card.term === oldTerm) card = newCard;
              return card;
            }
          )
        }
        return folder;
      });
    },
    removeCard(state, { rootFolder, cardToRemove }) {
      state.folders = state.folders.map(
        (folder) => {
          if (folder === rootFolder)
            folder.cards = folder.cards.filter((card) => (card !== cardToRemove));
          return folder;
        }
      );
    },
  },
  state: {
    folders: [],
    categories: ["none"],
  },
  getters: {
    getFolders({ folders }) {
      return folders;
    },
    getCategories({ categories }) {
      return categories;
    },
  },
};
