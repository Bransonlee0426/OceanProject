<template>
    <div class="wrap">
        <div class="top">
            <b-avatar
              class="avatar"
              size="70px"
              variant="light"
              text=" "
            ></b-avatar>
            <div class="name">{{data.name}}</div>
            <div class="icon">
              <img class="search" src="../assets/img/ic_search.png" @click="showExtend">
              <img id="note-icon" class="note" src="../assets/img/ic_note.png" @click="note">
            </div>
        </div>
        <b-popover
          class="popover"
          target="note-icon"
          triggers="click"
          :show.sync="popoverShow"
          placement="bottom"
          container="wrap"
          ref="popover"
          @show="showPopover">
          <b-form-textarea
            v-model="textarea"
            :placeholder="$t('Message')"
            rows="5"
            max-rows="10"
          ></b-form-textarea>
          <b-button
            class="add-btn"
            squared variant="primary"
            @click="addNote()"
          >{{$t('Add')}}</b-button>
          <hr class="hr">
          <div class="card-wrap">
            <b-card class="card" v-for="(item,index) in noteData" :key="index">
              <b-card-title class="card-title">
                <div>{{item.time}}</div>
                <img class="card-close" src="../assets/img/ic_close2.png" @click="cardClose(index)">
              </b-card-title>
              <b-card-text>
                {{item.message}}
              </b-card-text>
            </b-card>
          </div>
        </b-popover>
        <div
          v-if="isShowExtend"
          class="extend">
          <b-form-input
            class="extend-input"
            v-model="searchInput"
            type="text"
            @keyup.enter.native="search"></b-form-input>
          <div class="extand-right">
            <div class="matchText">{{foundText.length}} {{$t('items')}}</div>
            <img class="close" src="../assets/img/ic_close1.png" @click="closeExtand">
          </div>
        </div>
        <div class="content">
          <ul>
            <li
              class="chat-li"
              v-for="(item,index) in chatList"
              :key="index">
              <span class="chat-span">
                <div ref="chatText">{{item}}</div>
              </span>
            </li>
          </ul>
        </div>
        <div class="input">
          <div>{{$t('Message')}}</div>
          <b-img
            class="sent-image"
            :src="require('../assets/img/ic_sent.png')"
            fluid>
          </b-img>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      foundText: [],
      highlightIndex: '',
      chatList: [],
      isShowExtend: false,
      popoverShow: false,
      textarea: '',
      noteData: [],
    };
  },
  props: {
    data: Object,
  },
  methods: {
    addNote() {
      const today = new Date();
      const currentData = this.$moment(today).format('YYYY/MM/DD h:mm');
      this.noteData.push(
        {
          time: currentData,
          message: this.textarea,
        },
      );
      localStorage.setItem(this.data.name, JSON.stringify(this.noteData));
      this.textarea = '';
    },
    showPopover() {
      this.noteData = [];
      this.textarea = '';
      const noteArr = JSON.parse(localStorage.getItem(this.data.name));
      if (noteArr !== null) {
        for (let i = 0, len = noteArr.length; i < len; i += 1) {
          this.noteData.push(
            noteArr[i],
          );
        }
      }
    },
    showExtend() {
      this.searchInput = '';
      this.isShowExtend = !this.isShowExtend;
    },
    cardClose(index) {
      this.noteData.splice(index, 1);
      localStorage.setItem(this.data.name, JSON.stringify(this.noteData));
    },
    search() {
      this.foundText = [];
      this.removeHighligh();
      if (this.searchInput) {
        this.$refs.chatText.forEach((item, index) => {
          if (item.innerText.replace(/\s+/g, '') === this.searchInput.replace(/\s+/g, '')) {
            item.classList.add('highligh');
            this.highlightIndex = index;
          }
        });
      }
    },
    note() {
    },
    closeExtand() {
      this.isShowExtend = false;
      this.searchInput = '';
    },
    friendsItem(data) {
      this.data = data;
      switch (data.name) {
        case '保羅':
          this.chatList = ['保羅', '你好, 我是傑西卡', '我喜歡吃的食物有', '各種巧克力口味的甜點'];
          break;
        case '傑克':
          this.chatList = ['傑克', '你好, 我是傑西卡', '我喜歡做的運動為', '游泳,跑步'];
          break;
        case '傑森':
          this.chatList = ['傑克', '你好, 我是傑西卡', '我喜歡的動物為 ', '貓,狗 '];
          break;
        default:
          break;
      }
    },
    removeHighligh() {
      if (this.highlightIndex !== '') {
        this.$refs.chatText[this.highlightIndex].classList.remove('highligh');
      }
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(data) {
        if (!data.name) {
          this.$router.push({ name: 'Default' }).catch(() => {});
        }
        this.popoverShow = false;
        this.removeHighligh();
        this.friendsItem(data);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.highligh{
  background-color:#f8e71c;
}
.popover{
  padding: 10px 5px 10px 5px;
  min-width: 400px;
  .form-control{
    border: 1px solid #4A90E2;
    box-shadow: none;
  }
  .add-btn{
    width: 100%;
    margin: 5px 0px;
    background-color:  #4A90E2;
    border-color:  #4A90E2;
  }
  .hr{
     border-top: 1px solid rgb(0, 255, 170);
  }
  .card-body{
    padding: 10px;
  }
  .card-wrap{
    max-height: 300px;
    overflow: scroll;
    .card{
      border-color: rgb(0, 255, 170);
      margin-bottom: 10px;
      .card-title{
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        color:#4A90E2;
        font-weight: normal;
        .card-close{
          cursor: pointer;
          width: 10px;
          height: 10px;
        }
      }
    }
  }
}
.wrap{
  .form-control{
    border: 0;
    box-shadow: none;
  }
  .top{
    display: flex;
    justify-content: flex-start;
    padding: 10px 0px;
    box-shadow:0px 4px 4px -2px rgba(167, 167, 167, 0.7);
    .avatar{
        margin-left: 40px;
        border: 1px solid rgb(0, 255, 170) !important;
    }
  }
  .extend{
    display: flex;
    height: auto;
    width: 100%;
    position: absolute;
    z-index: 90;
    padding: 5px 0px;
    border-bottom: 1px solid rgb(0, 255, 170);
    .extend-input{
      width: 80%;
    }
    .extand-right{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 20px;
      width: 20%;
      .matchText{
        color:rgb(214, 214, 214);
        margin-right: 10px;
      }
      .close{
        cursor: pointer;
        width: 30px;
        height: 30px;
      }
    }
  }
  .name{
    width: 80%;
    font-size: 20px;
    font-weight: bold;
    padding-top: 20px;
    padding-left: 10px;
  }
  .icon{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    .search{
      width: 40px;
      height: 40px;
      margin-right: 20px;
      cursor: pointer;
    }
    .note{
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }
  .content{
    height: 72vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items:flex-end;
    .chat-li{
      display: flex;
      justify-content: flex-end;
      padding: 5px;
      color:white;
      .chat-span{
        padding:10px 20px;
        border-radius: 50px;
        text-align: center;
        background-color:#4A90E2;

      }
      ::selection {
          background-color:#f8e71c;
      }
    }

  }
  .input{
    border-top: 1px solid rgb(0, 255, 170);
    padding:15px 10px;
    color:rgb(179, 179, 179);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .sent-image{
      width: 50px;
      height: 50px;
    }
  }
}
</style>
