import { loginByUsername, logout } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const ERR_OK = 0;
const user = {
  state: {
    token: getToken(),
    name: '',
    userId: '',
    roles: ['admin']
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId;
    },
    COMMIT_ROLE(state, roles) {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data;
          if (data.code === ERR_OK) {
            commit('SET_TOKEN', data.token);
            setToken(data.token);
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
