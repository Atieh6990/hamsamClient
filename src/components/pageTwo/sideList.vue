<template>
  <div :class="[(type == 1)? 'fav-list':'app-side']">

    <div class="sideItem" v-for="(text , i) in items"
         :class="[(ypos == i  && active == page && activeRoute == 1) ? 'item-hover':'']">
      <div class="line-hover2"
           :class="[(ypos == i && active == page && activeRoute == 1) ? 'line-hover':'']"></div>
      <div class="itemTxt" :class="[(ypos == i && active == page && activeRoute == 1) ? 'text-color':'']">
        {{text}}
      </div>
      <div class="itemNum" :class="[(ypos == i && active == page && activeRoute == 1) ? 'text-color':'']">
        130
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "side-list",
    props: ['items', 'active', 'page', 'activeRoute', 'type'],
    data() {
      return {
        xpos: 1,
        ypos: 0,

      }
    },
    created() {

      if (this.type == 1) {

      } else {
        //this.items = ['همه برنامه ها', 'ورزشی', 'فیلم و سریال', 'موسیقی', 'خبری', 'سرگرمی']
      }
    },
    methods: {
      up() {
        if (this.items.length > 0) {
          if (this.ypos > 0) {
            this.ypos--;
            return true;
          }
        }

        return false;
      }, down() {
        if (this.items.length > 0) {
          if (this.ypos < (this.items.length) - 1) {
            this.ypos++;
            return true;
          }
        }
        return false;
      },
      left() {
        return false;

      },
      right() {
        return false;
      },
      enter() {
        return this.ypos
      },
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .app-side {
    height: 950px;
    width: 363px;
    position: absolute;
    right: 0px;
    top: 33px;
    /*border: 1px solid green;*/

  }

  .fav-list {
    height: 950px;
    width: 363px;
    position: absolute;
    right: 87px;
    top: 260px;
    /*border: 1px solid green;*/

  }

  .sideItem {
    /*position: relative;*/
    /*width: 229px;*/
    /*height: 38px;*/

    width: 229px;
    height: 54px;
    line-height: 54px;
    color: #000000;
    font-size: 24px;
    position: relative;
  }

  .itemTxt {
    position: relative;
    float: right;
    right: 20px;
    width: 160px;
    height: 54px;
    text-align: right;

  }

  .itemNum {
    float: left;
    text-indent: 20px;
    display: none;

  }

  .item-hover {
    background: #E3E6F9;
    border-radius: 2px;
  }

  .line-hover {

    background-color: #3A4AB4 !important;
  }

  .line-hover2 {
    width: 5px;
    height: 55px;
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: transparent;
  }


  .text-color {
    color: #000000;
  }
</style>
