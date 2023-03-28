<template>
  <div class="container">
    <!-- 顶部查询组件 -->
    <div class="operate-container">
      <el-form :inline="true" :model="findInfo">
        <el-form-item :label="props.sTar">
          <el-input :placeholder="props.sTar" v-model="findInfo.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addBtn">新增</el-button>
        </el-form-item>
      </el-form>

      <slot name="time-filter"></slot>
    </div>

    <div>
      <!-- 中部展示表格 -->
      <el-table
        class="fles-table"
        stripe="true"
        fit="true"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        style="width: 100%"
        max-height="60vh"
      >
        <el-table-column
          fixed
          type="index"
          label="序号"
          width="80"
          :index="(currentPage - 1) * pageSize + 1"
        />
        <!-- 表格动态渲染子项Item -->
        <template v-for="(value, key) in props.propsList" :key="value._id">
          <el-table-column
            :prop="key"
            :label="value"
            :filters="
              key == 'test_result'
                ? [
                    { text: '阴性', value: '阴性' },
                    { text: '阳性', value: '阳性' },
                    { text: '检测中', value: '检测中' },
                  ]
                : ''
            "
            :filter-method="key == 'test_result' ? filterRes : ''"
            filter-placement="bottom-end"
          >
            <!-- 标签 -->
            <template v-if="key == 'test_result'" #default="scope">
              <el-tag
                :type="
                  scope.row.test_result === '阳性'
                    ? 'danger'
                    : scope.row.test_result === '阴性'
                    ? 'success'
                    : ''
                "
                disable-transitions
                >{{ scope.row.test_result }}</el-tag
              >
            </template>
          </el-table-column>
        </template>

        <el-table-column label="操作" width="140px">
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

      <!-- 底部分页组件 -->
      <el-pagination
        class="paginaiton"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        :page-sizes="[10, 20, 100]"
        :disabled="disabled"
        layout="sizes, prev, pager, next"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      v-model="addFormVisible"
      :title="addSign ? '添加信息' : '修改信息'"
      width="30%"
      center
    >
      <!-- 弹出对话框的表单插槽 -->
      <slot></slot>
      <span class="dialog-footer">
        <el-button @click="dialogCancel">取消</el-button>
        <el-button type="primary" @click="add"> 提交 </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  inject,
  ref,
  onMounted,
  defineProps,
  defineEmits,
  toRefs,
  defineExpose,
} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const $http = inject("$http");
const $message = inject("$message");
const props = defineProps({
  propsList: {
    type: Object,
  },
  addInfo: {
    type: Object,
  },
  model: {
    type: String,
  },
  sTar: {
    type: String,
  },
});
let currentPage = ref(1);
let pageSize = ref(10);
let tableData = ref([]);
let findInfo = ref([]);
let addInfo = toRefs(props.addInfo);
// addInfo.value = { ...props.addInfo };
console.log(addInfo);
let addSign = ref(true);
const addFormVisible = ref(false);
const emit = defineEmits(["refresh", "reModefy"]);

// 查询全部 - 通用
const getData = () => {
  $http.get(`/rest/${props.model}/`).then((res) => {
    if (res.data.status == 200) {
      tableData.value = res.data.data;
      formatDate(tableData.value);
    }
  });
};
// 根据字段查一条
const find = () => {
  console.log(findInfo.value.id);
  if (findInfo.value.id)
    $http.get(`/${props.model}/${findInfo.value.id}`).then((res) => {
      if (res.data.status == 200) {
        if (!res.data.data) {
          tableData.value = [];
          return $message({
            type: "warring",
            message: "未查询到",
          });
        }

        tableData.value = res.data.data;
        formatDate(tableData.value);
        // console.log(tableData.value)
      }
    });
};
const reset = () => {
  findInfo.value = ref([]);
  getData();
};
// 根据ID修改  - 通用
const handleEdit = (index, row) => {
  emit("reModefy", true);
  addSign.value = false;
  addFormVisible.value = true;
  addInfo.value = {
    ...row,
    [`${props.model}_id`]: row[`${props.model}_id`],
  };
  emit("refresh", addInfo.value);
  Reflect.deleteProperty(addInfo.value, "age");
};

// 增加
const addBtn = () => {
  addFormVisible.value = true;
  addSign.value = true;
  emit("reModefy", false);
};
const add = async () => {
  addInfo.value = { ...props.addInfo };
  if (addInfo.value.test_name) {
    // 增加核酸信息，判断居民是否存在
    if (addSign.value) {
      $http.get(`/resident/${addInfo.value.identification}`).then((res) => {
        if (
          res.data.status == 200 &&
          res.data.data[0].r_name == addInfo.value.test_name
        ) {
          {
            Reflect.deleteProperty(addInfo.value, "test_name");
            // 新增加核酸信息 - 提交
            $http.post(`/rest/${props.model}`, addInfo.value).then((res) => {
              if (res.data.status == 200) {
                $message({
                  type: "success",
                  message: "新增成功",
                });
                getData();
              }
            });
          }
        } else {
          // console.log(res.data.data.r_name);
          $message({
            type: "error",
            message: "查询不到此人",
          });
        }
      });
    } else {
      // 修改核酸信息 - 提交
      // let swapInfo = {};
      let {
        test_name,
        test_s_name,
        sample_name,
        sex,
        gap_duration,
        ...swapInfo
      } = addInfo.value;
      // Reflect.deleteProperty(addInfo.value, "test_name");
      console.log(test_name + test_s_name + sample_name + sex + gap_duration);
      addInfo.value = swapInfo;
      console.log(addInfo.value);
      $http
        .post(
          `/rest/${props.model}/${addInfo.value[`${props.model}_id`]}`,
          addInfo.value
        )
        .then((res) => {
          if (res.data.status == 200) {
            $message({
              type: "success",
              message: "修改成功",
            });
            getData();
          }
        });
    }
  } else {
    if (addSign.value) {
      // 新增 - 提交  - 通用
      $http.post(`/rest/${props.model}`, addInfo.value).then((res) => {
        if (res.data.status == 200) {
          $message({
            type: "success",
            message: "新增成功",
          });
          getData();
        }
      });
    } else {
      // 修改 - 提交  - 通用
      $http
        .post(
          `/rest/${props.model}/${addInfo.value[`${props.model}_id`]}`,
          addInfo.value
        )
        .then((res) => {
          if (res.data.status == 200) {
            $message({
              type: "success",
              message: "修改成功",
            });
            getData();
          }
        });
    }
  }
  // emit("refresh", []);
  addFormVisible.value = false;
};

const dialogCancel = () => {
  addFormVisible.value = false;
  addInfo.value = {};
  emit("refresh", addInfo.value);
};

// 根据ID删除 - 通用
const handleDelete = (index, row) => {
  ElMessageBox.confirm("确定删除吗？", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      $http
        .delete(`/rest/${props.model}/${row[`${props.model}_id`]}`)
        .then((res) => {
          if (res.data.status == 200) {
            $message({
              type: "success",
              message: "删除成功",
            });
            getData();
          }
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};

// 分页组件回调
const handleSizeChange = () => {};
const handleCurrentChange = () => {};
// 检测结果过滤回调
const filterRes = (value, row) => {
  console.log(row);
  return row.test_result == value;
};
// 格式化检测隔离时间
const formatDate = (data) => {
  data.forEach((current) => {
    if (current.gap_duration * 1 + 1) {
      let gap = current.gap_duration;
      current.gap_duration =
        gap * 1 > 72
          ? "七天"
          : gap > 48
          ? "72小时"
          : gap > 24
          ? "48小时"
          : "24小时";
    }
  });
};

// -------------------------------
// 日期筛选
const filterTime = (star, end) => {
  let filteredData = tableData.value.filter((item) => {
    let tarTime = new Date(item.test_time);
    return tarTime >= star && tarTime <= end;
  });
  tableData.value = filteredData;
};

// 将子组件方法暴露给父组件
defineExpose({
  filterTime,
});
// 挂载请求数据
onMounted(() => {
  getData();
});
</script>

<style>
.container {
  margin: 1em;
  margin-top: 2em;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.paginaiton {
  margin: 1em 0;
}
.flex-table {
  display: flex;
  align-content: space-around;
}
.operate-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
