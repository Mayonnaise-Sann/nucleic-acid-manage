<template>
    <div>
        <el-card>
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item v-for="(item) in $route.matched" :to="{ path: `${item.path}` }" :key="item._id">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </div>
</template>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

</script>