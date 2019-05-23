const app = {
  state: {
    isCollapse: false
  },
  mutations: {
    IS_COLLAPSE(state, bool) {
      state.isCollapse = bool;
    }
  }
};
export default app;
