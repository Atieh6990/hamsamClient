<template>
    <div>
        <div class="notif">{{ 'ارتباط '+notifData.name+' قطع شد.' }}</div>
    </div>
</template>

<script>
    export default {
        name: "notification",
        props: ['notifData'],
        created() {

            var _self = this;
            setTimeout(function () {
                _self.$root.$emit('clear_gameCenter_notif');
            }, 3000)
        }
    }
</script>

<style scoped>
    .notif {
        position: absolute;
        width: 1370px;
        right: 222px;
        top: 1020px;
        direction: rtl;
        text-align: right;
        font-size: 25px;
        color: #000;
    }
</style>