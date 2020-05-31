<template>
   <div class="wrap">
     <div class="image">
       <b-avatar
        class="avatar"
        size="70px"
        variant="light"
        text=" "
       ></b-avatar>
     </div>
     <div class="content">
       <div class="name">{{name}}</div>
       <span class="description">{{description}}</span>
     </div>
   </div>
</template>

<script>
export default {
  name: 'list-item',
  props: {
    name: String,
    description: String,
  },
};
</script>

<style lang="scss" scoped>
.wrap{
  display: flex;
  flex-direction: row;
  line-height: 2;
  padding: 20px;
  border-bottom: 1px solid rgb(0, 255, 170);
  cursor: pointer;
  .image{
    width: 30%;
    margin-right: 8px;
    .avatar{
      border: 1px solid rgb(0, 255, 170) !important;
    }
  }
  .content{
    width: 70%;
    .name{
      font-size: 1.3rem;
      font-weight:bold;
    }
    .description{
      color:rgb(139, 139, 139);
    }
  }
}
:hover{
    background-color: rgb(216, 216, 216);
}
</style>
