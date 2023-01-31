<template>
  <div>
    <div class="pages-item" v-for="(item, index) in items"
         :class="[active == page && xpos == index && activeRoute==1 && xpage == 0 ? 'page-hover' : '']">
      {{item}}
    </div>


    <!--    <div class="pages-item" v-for="(item, index) in items"-->
    <!--         :class="[active == page && xpos == index && activeRoute==1 ? 'page-hover' : '', selected === index ? 'select' : '']">-->
    <!--      {{item}}-->
    <!--    </div>-->
  </div>

</template>

<script>

  export default {
    name: "profile-menu",
    props: ['active', 'page', 'activeRoute', "me", "selected","xpage"],
    data() {
      return {
        pageItems: ['درباره من', 'دستاوردها', 'تصاویر من', 'علاقه مندی ها', 'امتیازات من', 'مشخصات فردی'],
        pageItems2: ['درباره من', 'دستاوردها', 'تصاویر', 'علاقه مندی ها', 'امتیازات', 'مشخصات فردی'],
        items: [],
        xpos: 0,
      }
    },
    created() {
      // this.xpos = this.selected;
    }
    ,

    activated() {
      this.items = [];
      this.me ? this.items = this.pageItems : this.items = this.pageItems2;
      // this.xpos = this.selected;
    },

    methods: {
      right() {
        if (this.xpos > 0) {
          this.xpos--;
          return true
        }
        return false
      },
      left() {

        if (this.xpos < this.pageItems.length - 1) {
          this.xpos++;
          return true
        }
        return false
      },
      down() {
        return false;
      },
      enter() {
        //this.selected = this.xpos;
        return this.xpos
      }
    }
  }
</script>

<style scoped>


  .pages-item {
    display: inline-block;
    margin-right: 30px;
    text-align: center;
    height: 50px;
  }

  .page-hover {
    color: #2F80ED;
    border-bottom: 4px solid #2F80ED;
    font-weight: bolder;
  }

  .select {
    color: #2F80ED;
  }
</style>
