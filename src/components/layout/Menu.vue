<template>
  <div>
    <el-scrollbar>
      <el-menu router>
        <template v-for="(item, index) in menus" :key="item._id">
          <!-- 首页 -->
          <el-menu-item :index="item.path" v-if="item.subItem">
            <template #title>
              <el-icon><component :is="item.icon"></component></el-icon
              >{{ item.name }}
            </template>
          </el-menu-item>
          <!-- 子菜单 -->
          <el-sub-menu :index="index + ''" v-else-if="!item.hidden">
            <template #title>
              <el-icon><component :is="item.icon"></component></el-icon
              >{{ item.name }}
            </template>
            <el-menu-item-group v-for="child in item.children" :key="child._id">
              <el-menu-item :index="item.path + '/' +child.path">{{ child.name }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
// import { House,Location} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";

const router = useRouter();
const menus = router.options.routes[2].children || [];
// console.log(menus)
</script>
