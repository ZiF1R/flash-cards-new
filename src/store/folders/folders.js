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
        let folderToSend = JSON.parse(JSON.stringify(oldFolder));
        [folderToSend.data.name, folderToSend.data.name] =
          [editedFolder.data.name, editedFolder.data.name];

        commit("changeFolder", {oldFolder, newFolder: folderToSend});
        await _db.editFolder(folderToSend, oldFolder.data.name);
        return true;
      }
      return false;
    },
  },
  mutations: {
    updateFolders(state, newFoldersData) {
      state.folders = [...newFoldersData];
    },
    addFolder(state, newFolder) {
      state.folders.push(newFolder);
    },
    changeFolder(state, {oldFolder, newFolder}) {
      state.folders = state.folders.map((folder) =>
        folder === oldFolder && (folder = newFolder)
      );
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
