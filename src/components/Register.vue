<template>
    <el-card class="box-card login-card" header="注册管理员用户">
        <el-form @submit.prevent="register" :model="userinfo" :rules="rules" >
            <el-form-item label="用户名" prop="username" required>
                <el-input v-model="userinfo.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phonenum" required>
                <el-input v-model="userinfo.phonenum"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" required>
                <el-input v-model="userinfo.password" minlength="3"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" native-type="submit">
                    立即注册   
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
    
</template>

<script setup>

import { ref, inject, reactive } from 'vue';
import { useRouter } from 'vue-router'
import { vaildateName, vaildatePass, vaildatePhone } from '../utils/vaildateRules';


const $http = inject('$http');
const $message = inject('$message')
const router = useRouter();

let userinfo = ref({
    username: '',
    phonenum: '',
    password: ''
});

let rules = reactive({
    username: [{ validator: vaildateName, trigger: 'blur' }],
    phonenum: [{ validator: vaildatePhone, trigger: 'blur'}],
    password: [{ validator: vaildatePass, trigger: 'blur' }]
})

const register = () => {
    $http.post('/register', userinfo.value).then((res) => {
        console.log(res.data)
        // localStorage.token = res.data.token;
        router.push('/login')
        $message({
            type: 'success',
            message: '注册成功'
        })
    })
}

</script>


<style scope>
.box-card {
  width: 25rem;
}
.login-card {
    margin: 0 auto;
}

</style>