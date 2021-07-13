<template>
  <div>
    <div class="poster">
      <div
        class="singer_poster"
        :style="{'background':`url(https://y.gtimg.cn/music/photo_new/T001R300x300M000${singerIndex.singer_mid}.jpg?max_age=2592000)`}"
      >
        <div class="back">
          <van-nav-bar class="back-nav" title left-arrow :border="false" @click-left="onClickLeft"/>
        </div>
        <div class="poster-mask">
          <h6>{{singerIndex.singer_name}}</h6>
          <span>{{singerIndex.singer_id/10000}}万粉丝</span>
          <br>
          <a class="fans">互通小组</a>
          <a class="pick">已关注</a>
        </div>
      </div>
    </div>
    <div class="albumWrap" style>
      <div class="album">
        <a href>数字专辑</a>
      </div>
    </div>
    <div class="singerNav">
      <van-tabs v-model="active" color="#333" @click="onClick">
        <van-tab v-for="(item,index) in navInfo" :key="index" :title="item"></van-tab>
      </van-tabs>
    </div>
    <div class="singerSongWrap" v-if="active == 0">
      <div class="singerSongPlay">
        <van-icon name="play-circle-o" class="play"/>
        <a href>全部播放</a>
      </div>
      <van-list
        v-model="loadingAlbum"
        :finished="finishedAlbum"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="singerSong" v-for="(item,index) in singerSong" :key="item.id">
          <div class="songInfo">
            <h6>{{item.name}}</h6>
            <span v-for="(sname) in item.singer" :key="sname.mid">{{sname.name}}</span>
            <span>. {{item.album.name}}</span>
          </div>
          <div class="songPlay">
            <van-icon name="play-circle-o" size="1.8rem" @click="handleToPlay(item.mid,index)"/>
          </div>
        </div>
      </van-list>
    </div>
    <div class="singerAlbumWrap" v-if="active == 1">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoadAlbum">
        <ul>
          <li v-for="(item) in singerAlbum" :key="item.album_mid">
            <div class="albumPic">
              <img src="../../assets/lay.jpeg" alt>
            </div>
            <div class="albumInfo">
              <h6>{{item.album_name}}</h6>
              <span class="time">{{item.pub_time}}</span>
              <span>{{item.latest_song.song_count}}</span>首
            </div>
            <div class="more">&gt;</div>
          </li>
        </ul>
      </van-list>
    </div>
    <div class="singerVideoWrap" v-if="active == 2"></div>
    <div class="singerInfoWrap" v-if="active == 3">
      <div class="info">
        <div class="infoTitle">
          <h3>歌手资料</h3>
          <h6>更多 &gt;</h6>
        </div>
        <div class="infoText">
          {{singerDesc.desc}}
        </div>
      </div>
      <div class="article">
        <div class="articleTitle">
          <h3>相关文章</h3>
          <h6>更多 &gt;</h6>
        </div>
        <ul class="articleList">
           <li>
             <div class="img">
               <img src="../../assets/lay.jpeg" alt="">
             </div>
             <div class="title">
               <h5>7年前，周杰伦是这样万嘻哈和电音的</h5>
               <span>浪J,21万阅读</span>
             </div>
           </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerIndexInfo, getSingerAlbum,getSingerInfo} from "../../api/Singer.js";
export default {
  data() {
    return {
      singerIndex: null,
      active: 0,
      singerSong: [], //歌手的歌曲列表
      navInfo: ["歌曲", "专辑", "视频", "关于TA"],
      loading: false,
      finished: false,
      page: 1,
      singerAlbum: [], //歌手的专辑列表
      loadingAlbum: false,
      finishedAlbum: false,
      pageAlbum: 1,
      singerDesc:null,
    };
  },
  created() {
    this.singerIndex = this.$route.query.singer;
    // let singerId = this.singerIndex.singer_mid;
    // getSingerIndexInfo(singerId,this.page).then(res => {
    //   this.singerSong = res.data.data.list;
    // });
  },
  methods: {
    onLoad() {
      let singerId = this.singerIndex.singer_mid;
      getSingerIndexInfo(singerId, this.page).then(res => {
        this.loading = false; //每次加载结束让loading为false,以便下次加载
        this.singerSong = [...this.singerSong, ...res.data.data.list];
        this.page++;
        if (res.data.data.list.length == 0) {
          this.finished = true;
        }
      });
    },
    onLoadAlbum() {
      let singerId = this.singerIndex.singer_mid;
      getSingerAlbum(singerId, this.pageAlbum).then(res => {
        this.loading = false; //每次加载结束让loading为false,以便下次加载
        this.singerAlbum = [...this.singerAlbum, ...res.data.data.list];
        this.pageAlbum++;
        if (res.data.data.list.length == 0) {
          this.finished = true;
        }
      });
    },
    onClick(name) {
      let singerId = this.singerIndex.singer_mid;
      if (name == 3) {
        getSingerInfo(singerId).then(res => {
          this.singerDesc = res.data.data;
        });
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    handleToPlay(mid,index){
      this.$store.commit('song/initCurrentSongListMut',this.singerSong);
      this.$store.commit('song/getCurrentSongIndexMut',index);
      //蒋播放列表，当前播放歌曲存储到本地
      localStorage.setItem("songList",JSON.stringify(this.singerSong));
      localStorage.setItem("current",index);
      this.$router.push({
        path:'/play',
        query:{
          singermid:mid
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/var.less");
.poster {
  width: 100%;
  height: 677 / @rem;
  position: relative;
  .singer_poster {
    width: 100%;
    height: 677 / @rem;
    border-bottom-left-radius: 36 / @rem;
    border-bottom-right-radius: 36 / @rem;
  }
  .back {
    width: 100%;
    height: 60 / @rem;
    position: absolute;
    top: 90 / @rem;
    left: 0;
    .back-nav {
      background: rgba(255, 255, 255, 0);
    }
  }
  .poster-mask {
    width: 100%;
    height: 230 / @rem;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 36 / @rem 25 / @rem 0 25 / @rem;
    box-sizing: border-box;
    text-align: left;
    color: #fff;
    h6 {
      font-size: 30 / @rem;

      margin-bottom: 20 / @rem;
    }
    span {
      font-size: 16 / @rem;
      margin-bottom: 16 / @rem;
    }
    .fans {
      width: 180 / @rem;
      height: 50 / @rem;
      display: inline-block;
      line-height: 50 / @rem;
      font-size: 28 / @rem;
      text-align: center;
      border-radius: 20 / @rem;
      background: rgba(255, 255, 255, 0.3);
    }
    .pick {
      width: 120 / @rem;
      height: 50 / @rem;
      display: inline-block;
      line-height: 50 / @rem;
      font-size: 28 / @rem;
      text-align: center;
      border-radius: 20 / @rem;
      background: rgba(255, 255, 255, 0.3);
      position: absolute;
      right: 25 / @rem;
    }
  }
}
.albumWrap {
  width: 100%;
  height: 94 / @rem;
  background: #eef0f1;
  margin-top: 22 / @rem;
}
.singerNav {
  width: 100%;
  height: 130 / @rem;
}
.singerSongWrap {
  width: 100%;
  height: auto;

  .singerSongPlay {
    width: 100%;
    height: 75 / @rem;
    padding: 0 28 / @rem;
    box-sizing: border-box;
    position: relative;
    .play {
      font-size: 46 / @rem;
      position: absolute;
      left: 28 / @rem;
    }
    a {
      display: inline-block;
      width: 188 / @rem;
      height: 46 / @rem;
      line-height: 46 / @rem;
      position: absolute;
      left: 46 / @rem;
      font-size: 20 / @rem;
      top: 0;
    }
  }
  .singerSong {
    width: 100%;
    height: 80 / @rem;
    padding: 10 / @rem 28 / @rem;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 30 / @rem;
    .songInfo {
      width: 584 / @rem;
      height: 80 / @rem;
      h6 {
        font-size: 26 / @rem;
        text-align: left;
      }
      span {
        display: inline-block;
        float: left;
        font-size: 20 / @rem;
        text-align: left;
      }
    }
    .songPlay {
      width: 120 / @rem;
      height: 100%;
    }
  }
}
.singerAlbumWrap {
  width: 100%;
  height: auto;
  ul {
    width: 100%;
    height: auto;
    li {
      width: 100%;
      height: 110 / @rem;
      display: flex;
      padding-left: 30 / @rem;
      box-sizing: border-box;
      margin-bottom: 22 / @rem;
      .albumPic {
        width: 110 / @rem;
        height: 110 / @rem;
        border-radius: 5 / @rem;
        margin-right: 30 / @rem;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 5 / @rem;
        }
      }
      .albumInfo {
        width: 532 / @rem;
        height: 110 / @rem;
        padding-top: 20 / @rem;
        box-sizing: border-box;
        text-align: left;
        font-size: 18 / @rem;
        color: #848484;
        h6 {
          font-size: 26 / @rem;
          color: #292929;
          font-weight: normal;
          margin-bottom: 10 / @rem;
        }
        .time {
          display: inline-block;
          margin-right: 20 / @rem;
        }
      }
      .more {
        text-align: left;
        line-height: 110 / @rem;
        font-size: 22 / @rem;
        color: #848484;
      }
    }
  }
}
.singerInfoWrap {
  width: 100%;
  height: auto;
  .info {
    width: 100%;
    height: 275 / @rem;
    box-sizing: border-box;
    padding: 0 26 / @rem;
    margin-bottom:28/@rem;
    .infoTitle {
      width: 100%;
      height: 34 / @rem;
      display: flex;
      line-height: 100%;
      position: relative;
      h3 {
        font-size: 28 / @rem;
      }
      h6 {
        position: absolute;
        right: 0;
        font-size: 22 / @rem;
        color: #a1a1a1;
      }
    }
    .infoText {
      width: 100%;
      height: 224 / @rem;
      padding-top: 20 / @rem;
      box-sizing: border-box;
      text-align: left;
      line-height: 42 / @rem;
      font-size: 24 / @rem;
      color:#898989;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
    }
  }
  .article{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 26 / @rem;
    .articleTitle{
      width: 100%;
      height: 75/ @rem;
      display: flex;
      line-height: 100%;
      position: relative;
      h3 {
        font-size: 28 / @rem;
      }
      h6 {
        position: absolute;
        right: 0;
        font-size: 22 / @rem;
        color: #a1a1a1;
      }
    }
    .articleList{
      width:100%;
      height:auto;
      li{
        width:100%;
        height:165/@rem;
        margin-bottom:20/@rem;
        display:flex;
        .img{
          width:165/@rem;
          height:165/@rem;
          border-radius: 5/@rem;
          margin-right:20/@rem;
          img{
            display:block;
            width:100%;
            height:100%;
            border-radius: 5/@rem;
          }
        }
        .title{
          width:468/@rem;
          height:100%;
          overflow: hidden;
          padding-top:40/@rem;
          box-sizing: border-box;
          text-align:left;
          h5{
            font-size:24/@rem;
            color:#2b2b2b;
            margin-bottom: 20/@rem;
          }
          span{
            font-size:18/@rem;
            color:#a7a7a7;
          }
        }
      }
    }
  }
}
</style>