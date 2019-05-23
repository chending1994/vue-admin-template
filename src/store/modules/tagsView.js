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
    }
  },
  actions: {
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.tagsList])
      })
    }
  }
};

export default tagsView;
