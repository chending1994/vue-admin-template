const tagsView = {
  state: {
    tagsList: [] // 打开的标签页个数,
  },
  mutations: {
    // 保存标签
    TAGES_LIST(state, arr) {
      state.tagsList = arr;
    },
    DEL_VISITED_VIEWS(state, view) {
      for (const [i, v] of state.tagsList.entries()) {
        if (v.path === view.path) {
          state.tagsList.splice(i, 1);
          break;
        }
      }
    },
    DEL_OTHERS_VIEWS(state, view) {
      for (const [i, v] of state.tagsList.entries()) {
        if (v.path === view.path) {
          state.tagsList = state.tagsList.slice(i, i + 1);
          break;
        }
      }
    },
    DEL_ALL_VIEWS(state) {
      state.tagsList = [];
    }
  },
  actions: {
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.tagsList]);
      });
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view);
        resolve([...state.tagsList]);
      });
    },
    delAllViews({ commit }) {
      commit('DEL_ALL_VIEWS');
    }
  }
};

export default tagsView;
