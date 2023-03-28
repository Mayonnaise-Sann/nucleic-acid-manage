<template>
  <Table-list
    ref="tableFrame"
    :propsList="propsList"
    :addInfo="addInfo"
    :model="model"
    :sTar="sTar"
    @refresh="refreshAddInfo"
    @reModefy="reModefy"
  >
    <!-- 时间筛选插槽 -->
    <template #time-filter>
      <div>
        <el-date-picker
          @change="dateChange"
          v-model="timeRange"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </template>
    <!-- 表单插槽 -->
    <template #default>
      <el-form :model="addInfo">
        <el-form-item label="身份证号" required>
          <el-input
            v-model="addInfo.identification"
            :disabled="dismodefy"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" required>
          <el-input
            v-model="addInfo.test_name"
            :disabled="dismodefy"
          ></el-input>
        </el-form-item>
        <el-form-item label="采样点" required>
          <el-select
            v-model="addInfo.n_sampleinstitut_code"
            placeholder="采样点"
          >
            <el-option
              v-for="item in s_institutionList"
              :key="item._id"
              :label="item.institutionName"
              :value="item.insCode"
            >
              <span style="float: left">{{ item.institutionName }}</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >{{ item.insCode }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测机构" required>
          <el-select
            v-model="addInfo.n_testinstitut_code"
            placeholder="检测机构"
          >
            <el-option
              v-for="item in t_institutionList"
              :key="item._id"
              :label="item.institutionName"
              :value="item.insCode"
            >
              <span style="float: left">{{ item.institutionName }}</span>
              <span
                style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 13px;
                "
                >{{ item.insCode }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测时间" required>
          <el-date-picker
            v-model="addInfo.test_time"
            format="YYYY/MM/DD HH:mm:ss"
            value-format="YYYY/MM/DD HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
            :disabled-date="disabledDate"
            :disabled-hours="disabledHours"
            :disabled-minutes="disabledMinutes"
            :disabled-seconds="disabledSeconds"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="检测结果" required>
          <el-select v-model="addInfo.test_result">
            <el-option
              v-for="item in testResults"
              :key="item._id"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </template>
  </Table-list>
</template>

<script setup>
import TableList from "../../components/utils/TableList.vue";
import { ref, onMounted, inject } from "vue";
// const $message = inject("$message");
const $http = inject("$http");

const propsList = ref({
  identification: "身份证",
  test_name: "姓名",
  sex: "性别",
  age: "年龄",
  test_time: "检测时间",
  test_result: "检测结果",
  sample_name: "采样点",
  test_s_name: "检测机构",
  gap_duration: "检测距离时长",
});
// 控制修改模块的表单禁用
const dismodefy = ref(false);
const reModefy = (boo) => {
  dismodefy.value = boo;
};
// 检测结果
const testResults = ref(["阴性", "阳性", "检测中"]);
// 搜索目标字段
const sTar = ref("身份证");
let addInfo = ref({});
let t_institutionList = ref([]);
let s_institutionList = ref([]);
// 数据库来源
const model = ref("nucleic_info");

// 更新父组件数据
const refreshAddInfo = (newAddInfo) => {
  addInfo.value = newAddInfo;
  console.log(addInfo.value);
};

const getInstitutionList = () => {
  // 获取检测机构列表
  $http.get("/test_institution/institutionList").then((res) => {
    if (res.data.status == 200) {
      t_institutionList.value = res.data.data.map((val) => {
        // 更改字段名
        return {
          insCode: val.test_s_code,
          institutionName: val.test_s_name,
        };
      });
    }
  });
  // 获取采样点列表
  $http.get("/sampling_institution/institutionList").then((res) => {
    if (res.data.status == 200) {
      s_institutionList.value = res.data.data.map((val) => {
        // 更改字段名
        return {
          insCode: val.sample_code,
          institutionName: val.sample_name,
        };
      });
    }
  });
};

// 核酸检测时间必须在今天之前
const disabledDate = (date) => {
  return date.getTime() >= Date.now();
};
const makeRange = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
let myDate = new Date();
const disabledHours = () => {
  let optDate = new Date(addInfo.value.test_time);
  if (optDate.getDay() == myDate.getDay())
    return makeRange(myDate.getHours() + 1, 24);
};
const disabledMinutes = (hour) => {
  if (hour === myDate.getHours()) {
    return makeRange(myDate.getMinutes() + 1, 59);
  }
};
const disabledSeconds = (hour, minute) => {
  if (hour === myDate.getHours() && minute === myDate.getMinutes()) {
    return makeRange(myDate.getSeconds() + 1, 59);
  }
};
// --------------------------------------
// 时间筛选器
const timeRange = ref([]);

const shortcuts = [
  {
    text: "过去一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "过去三周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "过去三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

// 获取子组件
const tableFrame = ref(null);
// 修改筛选时间段的回调
const dateChange = (val) => {
  let star = val[0];
  let end = val[1];
  tableFrame.value.filterTime(star, end);
};

onMounted(() => {
  getInstitutionList(); // 获取检测机构列表
});
</script>
