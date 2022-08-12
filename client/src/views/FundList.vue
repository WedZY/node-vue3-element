<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            @click="dialogFormVisible = true"
            size="small"
            >添加</el-button
          >
        </el-form-item>

        <el-dialog v-model="dialogFormVisible" title="添加资金信息">
          <el-form :model="form">
            <el-form-item label="收支类型" :label-width="formLabelWidth">
              <el-select
                v-model="form.region"
                placeholder="收支类型"
                style="width: 150px"
              >
                <el-option label="Zone No.1" value="shanghai" />
                <el-option label="Zone No.2" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="收支描述" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="收入" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="支出" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="账户资金" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false"
                >提交</el-button
              >
            </span>
          </template>
        </el-dialog>
      </el-form>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          type="index"
          label="序号"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="180"
          align="center"
          #default="scope"
        >
          <div style="display: flex; align-items: center">
            <el-icon size="20px"><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="describe"
          label="收支描述"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="income"
          label="收入"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="expend"
          label="支出"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cash"
          label="账户资金"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "../http";
import { reactive, ref } from "vue";
export default {
  setup() {
    const dialogTableVisible = ref(false);
    const dialogFormVisible = ref(false);
    const formLabelWidth = "140px";

    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });
    const tableData = ref([]);

    const getProfile = () => {
      axios
        .get("/api/profiles")
        .then((res) => {
          console.log(tableData.value);
          tableData.value = res.data;
        })
        .catch((err) => console.log(err));
    };

    getProfile();
    return {
      tableData,
      form,
      formLabelWidth,
      dialogFormVisible,
    };
  },
};
</script>
<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
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
</style>
