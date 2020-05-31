<template>
  <b-container fluid class="wrap p-0">
     <b-row no-gutters>
        <b-col class="list-col">
          <div class="list-text">{{ $t('FriendsList')}} ({{this.listData.length}})</div>
          <ul>
            <li
              v-for="item in listData" :key="item.name" @click="friendsItem(item)">
              <list-item
                :name="item.name"
                :description="item.description"
              >
              </list-item>
            </li>
          </ul>
        </b-col>
        <b-row no-gutters class="chat-area">
          <b-col class="chat-top-col">
            <b-row no-gutters class="chat-top">
              <b-col class="text">Cherri Chat</b-col>
              <b-col class="buttons">
                <b-button
                  pill
                  variant="outline-light mr-2 pl-4 pr-4"
                  :pressed.sync="twToggle"
                  @click="toggle('tw')"
                  >中文</b-button>
                <b-button
                  pill
                  variant="outline-light pl-4 pr-4"
                  :pressed.sync="enToggle"
                  @click="toggle('en')">English
                  </b-button>
              </b-col>
              <b-col class="user-name">
                <b-avatar
                  size="50px"
                  variant="light"
                  text=" "
                ></b-avatar>
                <div class="name-text">潔西卡</div>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="chat-content">
            <transition name="component-fade" mode="out-in">
               <router-view :data="data"/>
            </transition>
          </b-col>
        </b-row>
     </b-row>
  </b-container>
</template>

<script>

export default {
  data() {
    return {
      twToggle: localStorage.getItem('locale') === 'tw',
      enToggle: localStorage.getItem('locale') !== 'tw',
      data: {},
      listData: [{
        name: '保羅',
        description: '大家好，我是保羅',
      }, {
        name: '傑克',
        description: '大家好，我是傑克',
      }, {
        name: '傑森',
        description: '大家好，我是傑森',
      }],
    };
  },
  mounted() {
  },
  methods: {
    friendsItem(data) {
      this.$router.push({ name: 'Chat' }).catch(() => {});
      this.data = data;
    },
    toggle(val) {
      const vm = this;
      function setLang(lang) {
        vm.$i18n.locale = lang;
        localStorage.setItem('locale', lang);
      }
      if (val === 'tw') {
        this.twToggle = true;
        this.enToggle = false;
        setLang('tw');
      } else {
        this.twToggle = false;
        this.enToggle = true;
        setLang('en');
      }
    },
  },
};

</script>

<style scoped lang="scss">
.btn-primary{
  background-color: #4A90E2;
}
::v-deep .btn-outline-light:not(:disabled):not(.disabled).active{
  color:#4A90E2;
}
.wrap{
  .list-col{
    height: 100vh;
    z-index: 100;
    box-shadow: 1px 1px 7px rgba(167, 167, 167, 0.7);
    .list-text{
      padding: 15px 0px 15px 20px;
      border-bottom: 1px solid rgb(0, 255, 170);
    }
  }
  .chat-area{
    display: flex;
    flex-direction: column;
    width: 75%;
    .chat-top-col{
      max-height: 80px;
      .chat-top{
        height: 75px;
        display: flex;
        flex-direction: row;
        background-color: #4A90E2;
        .text{
          color:white;
          flex-grow: 4;
          font-size: 1.8rem;
          padding:15px 0px 15px 30px;
        }
        .buttons{
          padding-top:20px;
          flex-wrap: nowrap;
          flex-grow: 2;
        }
        .user-name{
          border-left: 1px solid rgb(226, 226, 226);
          flex-grow: 2;
          padding:12px 10px 12px 20px;
          color: white;
          font-weight:bold;
          font-size: 1.7rem;
          .name-text{
            display:inline-block;
            padding-left: 20px;
          }
        }
      }
    }
    .chat-content{
      max-height: 800px;
    }
    .chat-input{
      max-height: 50px;
    }
  }
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
