<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" class="avatar" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <el-icon
              ><UserFilled
                style="
                  width: 1em;
                  height: 1em;
                  display: flex;
                  text-align: center;
                "
            /></el-icon>
            <span>{{ user.name }}</span>
          </div>
          <div class="user-item">
            <el-icon
              ><Tools style="width: 1em; height: 1em; display: flex; top: 2px"
            /></el-icon>
            <span>{{
              user.identity == "manager" ? "管理员" : "普通员工"
            }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  computed: {
    user() {
      const store = useStore();
      return store.getters.user;
    },
  },
  setup() {},
};
</script>
<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  left: 30%;
  top: 30%;
}
.user img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}

.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  display: flex;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
.user-item i {
  margin-right: 5px;
}
</style>
