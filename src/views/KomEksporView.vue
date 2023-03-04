<template>
    <div ref="main" id="main" class="container is-fluid mt-5 p-32">
      <page-header></page-header>
      <!-- <span>{{ store.userInfo }}</span> -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'KomEksporView',
    mounted() {
      // let loader = this.$loading.show({
      //   container: this.$refs.main,
      //   height: 25,
      //   width: 25,
      //   opacity: 1,
      //   loader: 'spinner',
      //   color: 'black',
      //   // zIndex: 25,
      //   // backgroundColor: '#e8e8e8',
      // });
      // setTimeout(() => {
      //     loader.hide()
      // }, 2000)
    }
  }
  </script>
  