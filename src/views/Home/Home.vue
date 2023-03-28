<template>
  <div>
    <div class="block">
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
    <!-- <button @click="test">dada</button> -->
    <div class="chart-container">
      <el-card class="box-card">
        <echarts :chartData="testResData"></echarts>
      </el-card>
      <el-card class="box-card">
        <echarts :chartData="testedpercentData"></echarts>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, reactive } from "vue";
import DateToStr from "../../utils/formatDate";
import Echarts from "../../components/utils/Echarts.vue";
const $http = inject("$http");

// 检测率配置项
let testedpercentData = reactive({
  title: "检测率",
  xData: [],
  legendList: ["已检测人数", "未检测人数", "检测率"],
  yAxis: [
    {
      type: "value",
      name: "人数",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} 人",
      },
    },
    {
      type: "value",
      name: "百分比",
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: " {value} %",
      },
    },
  ],
  series: [
    {
      name: "已检测人数",
      type: "bar",
      yAxisIndex: 0,
      data: [],
      tooltip: {
        valueFormatter: function (value) {
          return value + " 人";
        },
      },
    },
    {
      name: "未检测人数",
      type: "bar",
      yAxisIndex: 0,
      data: [],
      tooltip: {
        valueFormatter: function (value) {
          return value + " 人";
        },
      },
    },
    {
      name: "检测率",
      type: "line",
      yAxisIndex: 1,
      data: [],
      tooltip: {
        valueFormatter: function (value) {
          return value + " %";
        },
      },
    },
  ],
  color: ["#00CED1", "#F4606C","#4169E1"],
});

// 检测结果配置项
let testResData = reactive({
  title: "检测结果统计",
  xData: [],
  legendList: ["阳性人数", "阴性人数"],
  yAxis: [
    {
      type: "value",
      name: "人数",
      min: 0,
      max: 10,
      interval: 1,
      axisLabel: {
        formatter: "{value} 人",
      },
    },
  ],
  series: [
    {
      name: "阴性人数",
      type: "bar",
      yAxisIndex: 0,
      data: [],
      tooltip: {
        valueFormatter: function (value) {
          return value + " 人";
        },
      },
    },
    {
      name: "阳性人数",
      type: "bar",
      yAxisIndex: 0,
      data: [],
      tooltip: {
        valueFormatter: function (value) {
          return value + " 人";
        },
      },
    },
  ],
  color: ["#03C14C", "#FF0A00", ],
});

// 获取检测率数据
const getPercentData = (start, end) => {
  $http
    .get("testedpercent", {
      params: {
        start,
        end,
      },
    })
    .then((res) => {
      if (res.data.status == 200) {
        let data = res.data.data;
        testedpercentData.xData = data.streetList;
        testedpercentData.series[0].data = data.testedNum;
        testedpercentData.series[1].data = data.untestNum;
        testedpercentData.series[2].data = data.percentage;
      }
    });
};

// 获取阳/阴性数据
const getResData = (start, end) => {
  $http
    .get("countbyres", {
      params: {
        start,
        end,
      },
    })
    .then((res) => {
      if (res.data.status == 200) {
        let data = res.data.data;
        testResData.xData = data.streetList;
        testResData.series[0].data = data.negative;
        testResData.series[1].data = data.positive;
        console.log(data);
      }
    });
};

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
// 修改筛选时间段的回调
const dateChange = (val) => {
  let start = DateToStr(val[0]);
  let end = DateToStr(val[1]);
  getPercentData(start, end);
  getResData(start, end);
};

onMounted(() => {
  let currentDate = new Date();
  getPercentData("1970-00-00 00:00:00", DateToStr(currentDate));
  getResData("1970-00-00 00:00:00", DateToStr(currentDate));
});
</script>

<style>
.block {
  margin: 1em 0 0 2em;
}
.chart-container {
  margin-top: 2em;
  display: flex;
  justify-content: space-around;
}
</style>
