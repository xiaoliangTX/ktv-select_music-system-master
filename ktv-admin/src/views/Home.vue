<template>
  <div class="home">
    <div class="nav">
        <Nav></Nav>
    </div>
    <div class="content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/nav"
export default {
  name: 'home',
  components: {
      Nav,
  }
}
</script>
<style lang="less" scoped>
.home{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .nav{
        width:100%;
    }

    .content{
        flex: 1;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
}
</style>
