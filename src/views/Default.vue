<template>
    <div class="wrap">
        <b-img
            class="image"
            :src="require('../assets/img/img_default.png')"
            fluid>
        </b-img>
        <div class="text">開始使用Cherri Chat!</div>
    </div>
</template>

<script>
export default {
  name: 'Default',
};
</script>

<style lang="scss" scoped>
.wrap{
    width: 100%;
    height: 100%;
    vertical-align:middle;
    text-align: center;
    padding-top: 20%;
    .image{
        width: 250px;
    }
    .text{
        font-weight:bold;
        padding: 20px;
        font-size: 2rem;
        color:#4A90E2;
    }
}
</style>
