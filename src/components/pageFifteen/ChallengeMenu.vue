<template>

  <div>
    <div class="pages-item" v-for="(item, index) in pageItems"
         :class="[active == page && xpos == index+1 && activeRoute==1 ? 'page-hover' : '', sel === index+1 ? 'select' : '']">
      {{item}}
    </div>
  </div>

</template>

<script>

  export default {
    name: "profile-menu",
    props: ['active', 'page', 'activeRoute', "selected"],
    data() {
      return {
        pageItems: ['همه چالش ها', 'چالش های من', 'فعالیت ها'],
        xpos: 1,
        sel: this.selected,
      }
    },

    activated() {

      // this.items = [];
      // this.me ? this.items = this.pageItems : this.items = this.pageItems2;
    },

    created() {
    },

    methods: {
      right() {
        if (this.xpos > 1) {
          this.xpos--;
          return true
        }
        return false
      },
      left() {

        if (this.xpos < this.pageItems.length) {
          this.xpos++;
          return true
        }
        return false
      },
      down() {
        return false;
      },
      enter() {
        this.sel = this.xpos;
        return this.xpos
      }
    }
  }
</script>

<style scoped>


  .pages-item {
    display: inline-block;
    margin-right: 50px;
    text-align: center;
    height: 61px;
    font-size: 24px;
  }

  .page-hover {
    /*border-bottom: 4px;*/
    /*border-color: #2F80ED;*/
    border-bottom: 4px solid #2F80ED;
    /*border-radius: 10px;*/
    /*background-color: #424AB5;*/
  }

  .select {
    color: #2F80ED;
  }

</style>
