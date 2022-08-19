<template>
  <div class="dialog">
    <el-dialog
      :title="fatherVlaue.title"
      v-model="dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="35%"
      center
    >
      <div class="form">
        <el-form
          :model="formData"
          :rules="form_rules"
          ref="dialogform"
          class="formdialog"
        >
          <el-form-item label="收支类型" :label-width="formLabelWidth">
            <el-select
              v-model="formData.type"
              placeholder="收支类型"
              style="width: 150px"
            >
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="收支描述"
            :label-width="formLabelWidth"
            prop="describe"
          >
            <el-input v-model="formData.describe" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="收入"
            :label-width="formLabelWidth"
            prop="income"
          >
            <el-input
              v-model="formData.income"
              autocomplete="off"
              type="number"
            />
          </el-form-item>

          <el-form-item
            label="支出"
            :label-width="formLabelWidth"
            prop="expend"
          >
            <el-input
              v-model="formData.expend"
              autocomplete="off"
              type="number"
            />
          </el-form-item>

          <el-form-item
            label="账户资金"
            :label-width="formLabelWidth"
            prop="cash"
          >
            <el-input
              v-model="formData.cash"
              autocomplete="off"
              type="number"
            />
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input
              v-model="formData.remark"
              autocomplete="off"
              type="textarea"
              :rows="2"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import axios from "../http";
import { ElMessage } from "element-plus";
export default {
  name: "Dialog",
  setup(props, { attrs, slots, emit }) {
    const formLabelWidth = "140px";
    const dialog = ref(false);
    const dialogform = ref();
    const state = reactive({
      fatherVlaue: {
        title: "",
        option: "",
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      },

      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠卷",
        "充值礼券",
        "转账",
      ],

      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" },
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" },
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" },
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }],
      },
    });
    // 父组件控制子组件dialog开启
    const clearClick = (props) => {
      state.fatherVlaue.title = props.title;
      state.fatherVlaue.option = props.option;

      state.formData.type = "";
      state.formData.describe = "";
      state.formData.income = "";
      state.formData.expend = "";
      state.formData.cash = "";
      state.formData.remark = "";
      state.formData.id = "";
      dialog.value = true;
    };
    //父组件编辑传值到子组件
    const editClick = (props, index) => {
      state.fatherVlaue.title = index.title;
      state.fatherVlaue.option = index.option;

      state.formData.type = props.type;
      state.formData.describe = props.describe;
      state.formData.income = props.income;
      state.formData.expend = props.expend;
      state.formData.cash = props.cash;
      state.formData.remark = props.remark;
      state.formData.id = props._id;
      dialog.value = true;
    };

    // 提交
    const submit = () => {
      dialogform.value.validate((valid) => {
        if (valid) {
          const url =
            state.fatherVlaue.option == "add"
              ? "add"
              : `edit/${state.formData.id}`;
          axios.post(`/api/profiles/${url}`, state.formData).then((res) => {
            ElMessage({
              message: url == "add" ? "添加成功" : "修改成功",
              type: "success",
            });
            dialog.value = false;
            emit("myclick");
          });
        }
      });
    };

    return {
      dialogform,
      formLabelWidth,
      ...state,
      dialog,
      submit,
      clearClick,
      editClick,
    };
  },
};
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>
