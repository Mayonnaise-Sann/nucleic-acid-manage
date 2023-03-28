<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <u-menu></u-menu>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header style="text-align: right; font-size: 12px">
        <u-header></u-header>
      </el-header>

      <!-- 展示内容 -->
      <el-main>
        <Breadcrumb></Breadcrumb>
        <div>
          <router-view></router-view>
        </div>
      </el-main>

      <!-- <el-footer>
            footer
        </el-footer> -->
    </el-container>
  </el-container>
</template>

<script setup>
// import { ref } from 'vue'
import uHeader from "./layout/Header.vue";
import uMenu from "./layout/Menu.vue";
import Breadcrumb from "./layout/Breadcrumb.vue";
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-8); 
  /* background-color: #008B8B; */
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  /* background: #008B8B; */
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
