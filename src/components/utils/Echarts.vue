<template>
  <div ref="main" :id="elId" class="mainChart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { defineProps, watch, onMounted } from "vue";
import uuidv1 from "uuid/v1";
const elId = uuidv1();
const defaultColor = [
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
  "#3ba272",
  "#fc8452",
  "#9a60b4",
  "#ea7ccc",
];
// 接受父组件参数
const props = defineProps({
  chartData: {
    type: Object,
    default() {
      return {
        title: "",
        xData: [],
        legendList: [],
        yAxis: [],
        series: [],
        color: [],
      };
    },
  },
});

// let chartData = toRefs(chartData)
// 0 指定图表的配置项和数据
var option = {
  // 鼠标图例提示
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },

  // 标题
  title: {
    text: "Default Title",
  },
  legend: {
    data: ["已检测人数", "未检测人数", "检测率"],
  },
  // 横坐标的名字
  xAxis: {
    data: [],
    axisPointer: {
      type: "shadow",
    },
  },
  yAxis: [],
  // 表格类型和表格数据
  series: [
    {
      name: "频率",
      type: "bar",
      data: [],
    },
  ],
  // color: defaultColor,
};
// 1. 使用ref创建虚拟DOM引用，使用时用main.value
let main = document.getElementById(elId);
onMounted(() => {
  init(); // 初始化
});

// 1.1 初始化函数
var myChart = null;
function init() {
  // 基于准备好的dom，初始化echarts实例
  console.log(main);
  myChart = echarts.init(main);
  console.log(myChart);
  // 初始化数据并更新图表
  initChartData();
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

// 1.2 初始化图表数据
const initChartData = () => {
  option.title.text = props.chartData.title;
  option.yAxis = props.chartData.yAxis;
  option.xAxis.data = props.chartData.xData;
  option.legend.data = props.chartData.legendList;
  option.series = props.chartData.series;
  option.color = props.chartData.color || defaultColor;
};

// 2更新图表
const updateChart = () => {
  // 更新数据
  initChartData();
  if (myChart) {
    // 应用配置
    myChart.setOption(option);
  } else {
    // 若未初始化
    myChart = echarts.init(main);
    myChart.setOption(option);
  }
};

// 3. 监听图表数据变化
watch(
  () => props.chartData,
  () => {
    updateChart();
    // console.log('chartData change')
  },
  { deep: true }
);
</script>

<style>
.mainChart {
  width: 560px;
  height: 460px;
}
</style>
