<template>
  <div ref="main" id="main" class="container is-fluid mt-5 p-32">
    <page-header/>
    <loading v-model:active="isLoading"
      :can-cancel="false"
      :background-color="'white'"
      :opacity="1"
      :z-index="25"
      :is-full-page="fullPage"/>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";

export default {
  name: 'DocUserView',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: true,
      fullPage: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000)
  }
}
</script>
  