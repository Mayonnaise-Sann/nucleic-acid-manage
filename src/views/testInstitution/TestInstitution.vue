<template>
  <Table-list
    :propsList="propsList"
    :addInfo="addInfo"
    :model="model"
    :sTar="sTar"
    @refresh="refreshAddInfo"
  >
    <el-form :model="addInfo">
      <el-form-item label="机构编号" required>
        <el-input v-model="addInfo.test_s_code"></el-input>
      </el-form-item>
      <el-form-item label="机构名称" required>
        <el-input v-model="addInfo.test_s_name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="addInfo.t_address"></el-input>
      </el-form-item>
    </el-form>
  </Table-list>
</template>
<script setup>
import TableList from "../../components/utils/TableList.vue";
import { ref } from "vue";
const propsList = ref({
  test_s_code: "机构编号",
  test_s_name: "机构名称",
  t_address: "地址",
});

let addInfo = ref({});
const model = ref("test_institution");
// 搜索目标字段
const sTar = ref("机构编号");
const refreshAddInfo = (newAddInfo) => {
  addInfo.value = newAddInfo;
};
</script>
