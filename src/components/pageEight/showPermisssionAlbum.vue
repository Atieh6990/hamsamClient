<template>
    <div v-if="seeAlbumPermission == false" class="noImg albumParentNo"> {{ permissionTxt }}</div>
</template>

<script>
    export default {
        name: "show-permisssion-album",
        props:['permissionTxt','seeAlbumPermission'],
    }
</script>

<style scoped>
    .albumParentNo {
        position: absolute;
        width: 1744.88px;
        height: 770px;
        top: 288.91px;
        left: 109px;
        overflow: hidden;

    }

    .noImg {
        color: #000000;
        font-size: 20px;
        text-align: right;
        text-indent: 50px;
    }

</style>