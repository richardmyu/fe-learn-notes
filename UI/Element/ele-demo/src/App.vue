<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  min-width: 600px;
  max-width: 1200px;
  margin: 0 auto;
  line-height: 30px;

  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    font-size: 18px;
    color: #777777;
    .container-title {
      text-align: center;
      margin-bottom: 60px;
      h1 {
        font-size: 36px;
        margin-bottom: 30px;
        color: #000000;
      }
      p {
        text-align: left;
        margin-bottom: 10px;
      }
    }
    .container-content {
      .content-item {
        margin-bottom: 70px;
        .item-title {
          margin-bottom: 30px;
          h3 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          p {
            margin-bottom: 10px;
          }
        }
        .item-demo {
          box-sizing: border-box;
          padding: 20px;
          box-shadow: 0 0 10px 3px #666666;
          border-radius: 3px;
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>
