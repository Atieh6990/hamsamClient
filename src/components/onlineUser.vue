<template>
<div>

    <img src=""/>
</div>
</template>
<script>
	export default {
		mounted : function () {

		}, created() {


			this.$root.$on('menu_right',  () => {
				this.right();
			});
			this.$root.$on('menu_left',  () => {
				this.left();
			});
		}, data() {
			return {
				xpos : 0, items : [ "page one", "page two" ]
			};

		}, methods : {
			right() {
				if ( this.xpos > 0 ) {
					this.xpos--;
					//console.log( this.xpos );
				}


			}, left() {

				if ( (this.items.length-1) > this.xpos ) {
					this.xpos++;
					//console.log( this.xpos );
				}
			}
		}
	};

</script>

<style scoped>
    .menu {
        float: right;
        width: 100px;
        text-align: center;
    }

    .active {
        border: 1px solid blueviolet;
    }
</style>
