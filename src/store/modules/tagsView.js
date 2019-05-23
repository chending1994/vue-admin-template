const tagsView = {
  state: {
    tagsList: [] // 打开的标签页个数,
  },
  mutations: {
    // 保存标签
    TAGES_LIST(state, arr) {
      state.tagsList = arr;
    }
  }
};

export default tagsView;
