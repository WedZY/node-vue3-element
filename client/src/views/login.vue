<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">凤凰在线后台管理系统</span>
        <el-form
          :model="registerUser"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="rgisterForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerUser.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm"
              >登录</el-button
            >
          </el-form-item>
          <div class="tiparea">
            <p>
              还没有账号？点击 <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "../http";
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";

export default {
  name: "login",
  setup() {
    {
      const registerForm = ref();
      const router = useRouter();
      const store = useStore();

      const state = reactive({
        registerUser: {
          email: "",
          password: "",
        },
        rules: {
          email: [
            {
              type: "email",
              required: true,
              message: "请输入正确的邮箱",
              trigger: "blur",
            },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 50, message: "长度不能小于6为数", trigger: "blur" },
          ],
        },
      });

      const submitForm = () => {
        registerForm.value.validate((valid) => {
          if (valid) {
            axios.post("/api/users/login", state.registerUser).then((res) => {
              if (res.status === 200) {
                ElMessage({
                  message: "登录成功",
                  type: "success",
                });
                const { token } = res.data;
                localStorage.setItem("eleToken", token);
                // 解析token
                const decode = jwt_decode(token);

                store.dispatch("setAuthenticatde", !isEmpth(decode));
                store.dispatch("setUser", decode);
                router.push("/index");
              }
            });
          }
        });
      };
      const isEmpth = (value) => {
        value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0);
      };

      return {
        registerForm,
        ...state,
        submitForm,
      };
    }
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.form_container .manage_tip {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.rgisterForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 40px 60px 20px 30px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}

.submit_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: black;
}

.tiparea p a {
  color: #409eff;
}
</style>
