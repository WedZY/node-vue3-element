<template>
  <div class="register">
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
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
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
          <el-form-item label="确认密码" prop="password2">
            <el-input
              v-model="registerUser.password2"
              placeholder="请确认密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="identity">
            <el-select v-model="registerUser.identity" placeholder="选择身份">
              <el-option label="员工" value="emloyee"></el-option>
              <el-option label="管理员" value="manager"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm"
              >注册</el-button
            >
          </el-form-item>
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
export default {
  name: "register",
  components: {},
  setup() {
    {
      const registerForm = ref();
      const router = useRouter();
      const validatePass = (rules, value, callback) => {
        if (value !== state.registerUser.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      };
      const state = reactive({
        registerUser: {
          name: "",
          email: "",
          password: "",
          password2: "",
          identity: "",
        },
        rules: {
          name: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 3, max: 5, message: "长度在3到5个字符", trigger: "blur" },
          ],
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
          password2: [
            { required: true, message: "请再次输入密码", trigger: "blur" },
            { min: 6, max: 50, message: "长度不能小于6为数", trigger: "blur" },
            {
              validator: validatePass,
              trigger: "blur",
            },
          ],
        },
      });

      const submitForm = () => {
        registerForm.value.validate((valid) => {
          if (valid) {
            axios
              .post("/api/users/register", state.registerUser)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  ElMessage({
                    message: "账号注册成功",
                    type: "success",
                  });
                  router.push("/login");
                }
                if (res.status === 201) {
                  ElMessage({
                    message: "邮箱已被注册",
                    type: "warning",
                  });
                }
              });
          }
        });
      };
      return {
        // tigger表单验证 change是数据改变后触发 blur是失去焦点后触发验证
        registerForm,
        ...state,
        submitForm,
      };
    }
  },
};
</script>

<style scoped>
.register {
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
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}

.submit_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}
</style>
