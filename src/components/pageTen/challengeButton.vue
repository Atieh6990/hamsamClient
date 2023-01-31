<template>
  <div class="btn"
       v-bind:class="[inch ? 'style' : 'style2' ,hover && inch ? 'btnhover' : '', noramlHover && !inch ? 'normalHover' : '']">
    {{inch ? 'انصراف از چالش' : 'شرکت در چالش'}}
  </div>
</template>

<script>
  export default {
    props: ["hover", "inch", "noramlHover"],
    name: "challengeButton",
    data() {
      return {}
    },
    // activated(){
    //   alert(this.inch)
    // }
  }
</script>

<style scoped>

  .btn {
    font-weight: bolder;
    font-size: 19px;
    box-sizing: border-box;
    box-shadow: 0px 4px 10px rgba(86, 86, 86, 0.26);
    border-radius: 10px;
    text-align: center;
    /*font-size: 24px;*/
    line-height: 57px;
    transition: 0.5s;
    width: 221px;
    height: 57px;
    background: #FFFFFF;
  }

  .style {
    border: 1px solid #EB5757;
    color: #EB5757;
    background-color: #fff;
    transition: 0.5s;
  }

  .style2 {

    border: 1px solid #FE9923;
    color: #FE9923;
    background-color: #fff;
    border-radius: 10px;
    transition: 0.5s;
  }

  .btnhover {
    color: white;
    background-color: #EB5757;
  }

  .normalHover {
    background: #FE9923;
    color: white;
    box-shadow: 0px 4px 10px rgba(242, 153, 74, 0.39);
  }
</style>
