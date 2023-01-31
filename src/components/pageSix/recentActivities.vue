<template>
  <div>
    <div class="text" v-if="act.title">شما در چالش
      <div style="color: #13bbff; display: inline-block">{{act.title}}</div>
      شرکت کردید
    </div>
    <br/>
  </div>
</template>

<script>
  export default {
    props: ['act'],
    name: "recentActivities"
  }
</script>

<style scoped>
  .text {
    line-height: normal;
    font-size: 21px;
    text-align: right;
    color: #535C68;
    display: inline-block;
  }

</style>
