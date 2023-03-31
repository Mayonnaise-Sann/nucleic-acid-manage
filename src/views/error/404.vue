<template>
  <div class="container-404">
    <div class="err404">
      <div class="pic">
        <img src="../../assets/404.jpg" alt="" />
      </div>
      <div class="tip">
        <h4>抱歉，您访问的页面不存在</h4>
        <h5><router-link to="/home" class="go-home">返回首页</router-link></h5>
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style>
.container-404 {
  position: relative;
  width: 100%;
  min-width: 800px;
  height: 80vh;
  margin: auto;
}
.err404 {
  position: absolute;
  top: 50%;
  transform: translateY(-30%);
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-around;
}
.pic img {
  width: 48rem;
  max-width: 48rem;
  /* margin-right: -20%; */
  margin-left: -24%;
}

.tip {
  /* position: absolute; */
  margin-left: -90%;
}
.tip h4 {
  font-size: 1.5rem;
  color: rgb(6, 118, 159);
  padding-bottom: 1rem;
}

.tip .go-home {
  width: 130px;
  height: 38px;
  line-height: 38px;
  font-size: 16px;
  background: rgb(6, 118, 159);
  color: #fff;
  text-align: center;
  display: inline-block;
  text-decoration: none;
  border-radius: 4px;
}
</style>
