<template>
  <!-- 打开标签的容器 -->
  <div class="tags">
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :key="index"
        :class="{'active': isActive(item.path)}"
      >
        <router-link :to="item.path" @contextmenu.prevent.native="openMenu(item,$event)" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index,item.path)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>

    <!-- <div class="tags-close-box">
      <el-dropdown @command="handleCommand">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
  </div>
</template>
<script>
import { messages } from '@assets/js/common.js';
// import { mapState } from "vuex";
export default {
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  created() {
    // 判断标签里面是否有值 有的话直接加载
    if (this.tagsList.length === 0) {
      this.setTags(this.$route);
    }
  },
  computed: {
    // computed 方法里面没有set方法因此不能使用mapState,需要重新定义set方法
    tagsList: {
      get: function() {
        return this.$store.state.tagsView.tagsList;
      },
      set: function(newValue) {
        this.$store.commit('TAGES_LIST', newValue);
        // this.$store.state.tagsList = newValue;
      }
    }
  },
  watch: {
    // 监听路由变化
    $route(newValue, oldValue) {
      this.setTags(newValue);
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    // 选中的高亮
    isActive(path) {
      return path === this.$route.fullPath;
    },
    handleCommand(command) {
      if (command === 'closeOther') {
        // 关闭其他标签
        const curItem = this.tagsList.filter(item => {
          return item.path === this.$route.fullPath;
        });
        this.tagsList = curItem;
      }
    },
    // 添加标签
    setTags(route) {
      let isIn = this.tagsList.some(item => {
        // 判断标签是否存在
        return item.path === route.fullPath;
      });
      // 不存在
      if (!isIn) {
        // 判断当前的标签个数
        if (this.tagsList.length >= 10) {
          messages('warning', '当标签大于10个，请关闭后再打开');
        } else {
          this.tagsList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.name
          });
          // 存到vuex
          this.$store.commit('TAGES_LIST', this.tagsList);
        }
      }
    },
    closeTags(index, path) {
      if (this.tagsList.length === 1) {
        messages('warning', '不可全都关闭');
      } else {
        let tags = this.tagsList.splice(index, 1);
        this.$store.commit('TAGES_LIST', this.tagsList);
      }
      if (path === this.$route.fullPath) {
        // 如果关闭当前直接跳到下一个
        this.$router.push(
          this.$store.state.tagsView.tagsList[this.$store.state.tagsView.tagsList.length - 1]
        );
      }
    },
    openMenu(item,e) {
      this.visible = true;
      this.selectedTag = item;
      const offsetLeft = this.$el.getBoundingClientRect().left; 
      const offsetTop = this.$el.getBoundingClientRect().top; 
      this.left = e.clientX - offsetLeft + 15;
      this.top = e.clientY - offsetTop;
    },
    closeMenu() {
      this.visible = false;
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView);
          } else {
            this.$router.push('/home')
          }
        }
      })
    },
    closeOthersTags() {

    },
    closeAllTags() {

    }
  }
};
</script>
<style lang="scss" scoped>
.tags {
  height: 34px;
  background: $base-white;
  padding-right: 120px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  border-bottom: 1px solid #d8dce5;
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: $base-white;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: $base-666;
  &:first-of-type {
    margin-left: 15px;
  }
}

.tags-li:not(.active):hover {
  background: $base-f8;
}

.tags-li.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: $base-666;
}

.tags-li.active .tags-li-title {
  background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    &::before {
      content: '';
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 5px;
    }
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  // width: 110px;
  height: 30px;
  background: $base-white;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
