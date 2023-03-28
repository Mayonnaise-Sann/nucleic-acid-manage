<template>
  <div class="head-container">
    <h1 id="h-title">社区核酸信息管理系统</h1>
    <div class="toolbar">
      <el-dropdown>
        <el-icon style="margin-right: 8px; margin-top: 1px"
          ><setting
        /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>{{ user }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Setting as Setting } from "@element-plus/icons-vue";
const user = ref(localStorage.username || "username");
</script>

<style>
.head-container{
  width: 100%;
  padding-top: .5em;
  display: flex;
  justify-content: space-between;
}
.toolbar{
  margin: auto 0;
  color: rgb(6, 118, 159);

}
#h-title{
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  color: rgb(6, 118, 159);
}
</style>
