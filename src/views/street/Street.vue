<template>
  <Table-list
    :propsList="propsList"
    :addInfo="addInfo"
    :model="model"
    :sTar="sTar"
    @refresh="refreshAddInfo"
  >
    <el-form :model="addInfo">
      <el-form-item label="街道名" required>
        <el-input v-model="addInfo.streetname"></el-input>
      </el-form-item>
      <el-form-item label="常住人口数" required>
        <el-input v-model="addInfo.permanent_r_num"></el-input>
      </el-form-item>
    </el-form>
  </Table-list>
</template>
<script setup>
import TableList from "../../components/utils/TableList.vue";
import { ref } from "vue";
const propsList = ref({
  streetname: "街道名",
  permanent_r_num: "常住人口数",
});

let addInfo = ref({});
const model = ref("street");
// 搜索目标字段
const sTar = ref("街道名");
const refreshAddInfo = (newAddInfo) => {
  addInfo.value = newAddInfo;
};
</script>
