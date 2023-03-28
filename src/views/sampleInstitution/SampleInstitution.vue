<template>
  <Table-list
    :propsList="propsList"
    :addInfo="addInfo"
    :model="model"
    :sTar="sTar"
    @refresh="refreshAddInfo"
  >
    <el-form :model="addInfo">
      <el-form-item label="采样点编号" required>
        <el-input v-model="addInfo.sample_code"></el-input>
      </el-form-item>
      <el-form-item label="采样点名称" required>
        <el-input v-model="addInfo.sample_name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="addInfo.s_address"></el-input>
      </el-form-item>
    </el-form>
  </Table-list>
</template>
<script setup>
import TableList from "../../components/utils/TableList.vue";
import { ref } from "vue";
const propsList = ref({
  sample_code: "采样点编号",
  sample_name: "采样点名称",
  s_address: "地址",
});

let addInfo = ref({});
const model = ref("sampling_institution");
// 搜索目标字段
const sTar = ref("采样点编号");
const refreshAddInfo = (newAddInfo) => {
  addInfo.value = newAddInfo;
};
</script>
