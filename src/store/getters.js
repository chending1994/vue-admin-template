const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  userId: state => state.user.userId,
  roles: state => state.user.roles,
  isCollapse: state => state.app.isCollapse,
  tagsList: state => state.tagsView.tagsList
};
export default getters;
