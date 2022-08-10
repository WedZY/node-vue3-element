<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="12" class="logo-container">
        <img src="../assets/logo.png" alt="" class="logo" />
        <span class="title">凤凰后台管理系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{ user.name }}</p>
          </div>

          <!-- 下拉箭头 -->
          <el-dropdown class="username" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "headNav",
  computed: {
    user() {
      const store = useStore();
      return store.getters.user;
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const exit = () => {
      // 清楚token
      localStorage.removeItem("eleToken");
      //设置vuex
      store.dispatch("clearCurrentState");
      // 路由跳转
      router.push("/login");
    };

    const methods = {
      setDialogInfo(cmdset) {
        switch (cmdset) {
          case "info":
            showinfoList();
            break;
          case "exit":
            exit();
            break;
        }
      },
    };
    return {
      ...methods,
    };
  },
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  width: 50px;
  height: 50px;
  margin-right: 5px;
  /* vertical-align:属性设置一个元素的垂直对齐方式。
  该属性定义内元素的基线相对于该元素所在行的基线的垂直对齐
  */
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}

.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 15px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
  font-size: 20px;
  color: #fff;
}
</style>
