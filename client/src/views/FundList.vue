<template>
  <div class="fillContainer">
    <!-- 添加数据 -->
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-form-item label="投标时间筛选">
          <!--时间搜索范围 -->
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始的时间"
          ></el-date-picker>
          ——<el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束的时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="small" @click="onScreeeoutMoney">
            筛选
          </el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" @click="handleAdd(row)" size="small"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格table -->
    <div class="table_container">
      <el-table
        :data="tableDataInxde"
        style="width: 100%"
        border
        max-height="550"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          type="index"
          label="序号"
          width="70"
          align="center"
          max-height="150px"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="180"
          align="center"
          sortable
        >
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
        >
        </el-table-column>
        <el-table-column prop="income" label="收入" width="100" align="center">
          <template #default="scope">
            <span style="color: #00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" width="100" align="center">
          <template #default="scope">
            <span style="color: #f56767">-{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户资金"
          width="100"
          align="center"
        >
          <template #default="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
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
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="demo-pagination-block">
            <ElPagination
              :total="paginations.total"
              v-model:currentPage="paginations.page_index"
              v-model:page-size="paginations.page_size"
              :page-sizes="paginations.page_sizes"
              :layout="paginations.layout"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- Dialog组件 -->
    <Dialog ref="childRef" @myclick="sunClick" />
  </div>
</template>
<script>
import Dialog from "../components/Dialog.vue";
import { ElMessage } from "element-plus";
import axios from "../http";
import { reactive, ref, toRefs } from "vue";

export default {
  components: { Dialog },
  setup() {
    let childRef = ref();
    const state = reactive({
      alltable: [],
      tableDataInxde: [],
      filterTableData: [],
      Add: {
        title: "添加资金信息",
        option: "add",
      },
      Edit: {
        title: "编辑资金信息",
        option: "edit",
      },
      // 分页
      paginations: {
        page_index: 1, //当前位于哪页
        total: 0, //总数
        page_size: 5, //每页显示多少条信息
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper", //翻页属性
      },
      // 时间删选
      search_data: {
        startTime: "",
        endTime: "",
      },
    });

    //查询所有
    const getProfile = () => {
      axios
        .get("/api/profiles")
        .then((res) => {
          state.alltable = res.data;
          state.tableDataInxde = res.data;
          state.filterTableData = res.data;
          setPaginations();
        })
        .catch((err) => console.log(err));
    };
    getProfile();
    // 删除
    function handleDelete(index, row) {
      axios.delete(`/api/profiles/delete/${row._id}`).then((res) => {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        // 查询所有
        getProfile();
      });
    }

    // 设置分页数据
    function setPaginations() {
      state.paginations.total = state.alltable.length;
      state.paginations.page_index = 1;
      state.paginations.page_size = 5;

      state.tableDataInxde = state.alltable.filter((item, index) => {
        return index < state.paginations.page_size;
      });
    }
    // 跳转页
    function handleCurrentChange(page) {
      let sortnum = state.paginations.page_size * (page - 1);
      let table = state.alltable.filter((item, index) => {
        return index >= sortnum;
      });

      //跳转页
      state.tableDataInxde = table.filter((item, index) => {
        return index < state.paginations.page_size;
      });
      console.log(table, "table");
    }
    function handleSizeChange(page_size) {
      // 切换size
      state.paginations.page_index = 1;
      state.paginations.page_size = page_size;
      state.tableDataInxde = state.alltable.filter((item, index) => {
        return index < page_size;
      });
    }

    // 打开子组件dialog开启
    const handleAdd = () => {
      childRef.value.clearClick(state.Add);
    };
    //  给子组件传值
    const handleEdit = (row) => {
      childRef.value.editClick(row, state.Edit);
    };
    // 子组件提交以后重新查询
    function sunClick() {
      getProfile();
    }
    const onScreeeoutMoney = () => {
      if (!state.search_data.startTime || !state.search_data.endTime) {
        ElMessage({
          message: "选择时间间区",
          type: "warning",
        });
        getProfile();
        return;
      }
      const sTime = state.search_data.startTime.getTime();
      const etime = state.search_data.endTime.getTime();
      state.alltable = state.filterTableData.filter((item) => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= etime;
      });
      setPaginations();
    };

    return {
      childRef,
      ...toRefs(state),
      handleAdd,
      handleDelete,
      handleEdit,
      sunClick,
      handleCurrentChange,
      handleSizeChange,
      onScreeeoutMoney,
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
.demo-pagination-block {
  position: absolute;
  right: 0;
  margin-top: 10px;
}
.example-basic .el-date-editor {
  margin: 8px;
}
</style>
