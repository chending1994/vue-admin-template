<template>
  <div class="home">
    <el-button @click="handleLogin" type="primary">登录</el-button>
  </div>
</template>

<script>
const ERR_OK = 0;
export default {
  name: 'home',
  data () {
    return {
      user: {
        username: 'sjt0011',
        password: 'admin111',
        type: 1
      }
    };
  },
  methods: {
    async handleLogin () {
      try {
        const { data } = await this.$store.dispatch('LoginByUsername', this.user);
        if (data.code === ERR_OK) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
      // this.$store.dispatch('LoginByUsername', this.user).then(() => {
      //   this.$message.success('登录成功');
      // }).catch(() => {
      //   console.log('登录失败');
      // });
    }
  }
};
</script>
