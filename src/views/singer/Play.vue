<template>
  <div>
    <ul class="play-header">
      <li>
        <van-icon name="arrow-down" class="down"/>
      </li>
      <li class="header-text">
        <a href>推荐</a>
        <span></span>
        <a href>歌曲</a>
        <span></span>
        <a href>歌词</a>
      </li>
      <li>
        <van-icon name="share-o"/>
      </li>
    </ul>
    <div class="song-poster">
      <img :src="`http://y.gtimg.cn/music/photo_new/T002R300x300M000${playSongList.album.mid}.jpg?max_age=2592000`" alt>
    </div>
    <div class="play-info">
      <ul>
        <li class="song-name">
          <h3>七里香</h3>
        </li>
        <li class="song-singer" 
            v-for="(singer) in playSongList.singer" 
            :key="singer.mid">
            {{singer.name}}
        </li>
        <li>词：方文山</li>
      </ul>
      <div class="play-pick">
        <van-icon name="like"/>
      </div>
    </div>
    <ol class="play-link">
      <li>唱吧</li>
      <li>唱吧</li>
      <li>唱吧</li>
      <li>唱吧</li>
      <li>唱吧</li>
    </ol>
    <Lyric :mid="playSongList.mid" :time="startTime"/>
    <div class="play-progress">
       <span>{{startTime | timeFilter}}</span>
       <div class="progress"
             @touchstart="touchStart"
             @touchmove="touchMove"
             @touchend="touchEnd"
             ref="pro"
        >
           <div class="playing" ref="progress"
            
           ></div>
           <div class="drag-btn" ref="drag"
             
           ></div>
       </div>
       <span>{{endTime | timeFilter}}</span>
    </div>
    <!-- 播放组件 -->
    <ol class="play-tools">
      <li @click="handleLoop">
        <i :class="['iconfont', loopData[loop].icon]"></i>
      </li>
      <li @click="switchToPrev">
        <i class="iconfont icon-huaban10"></i>
      </li>
      <li @click="handlebofang">
        <i :class="['iconfont',isPlay?'icon-bofang':'icon-bofang1']"></i>
      </li>
      <li @click="switchToNext">
        <i class="iconfont icon-huaban11"></i>
      </li>
      <li @click="playListShow">
        <i class="iconfont icon-iconfront-"></i>
      </li>
    </ol>
    <!-- 播放列表 -->
    <PlayList/>
    <!-- 播放器 -->
    <audio ref="playAudio"
      :src="playSongUrl" 
      @canplay = "canplay"
      @timeupdate="timeupdate"
      @ended="handleEnd"
    ></audio>
  </div>
</template>

<script>
import {getSongPlayUrl} from '../../api/Singer.js';
import PlayList from './PlayList.vue'
import Lyric from './Lyric'
//import {mapMutations} from 'vuex';
export default {
  components: {
     PlayList,
     Lyric,
  },
    data() {
        return {
            playSongList: null,//当前待播放歌曲
            playSongUrl:'',//当前播放歌曲的播放url
            startTime:'',//歌曲开始时间
            endTime:'',//结束时间
            
        }
    },
    computed: {
        songList() {
            return this.$store.state.song.currentSongList;
        },
        curSongIdx(){
            return this.$store.state.song.currentSongIndex;
        },
        loop(){
          return this.$store.state.song.loop;
        },
        loopData(){
          return this.$store.state.song.loopData;
        },
        isPlay(){
          return this.$store.state.song.isPlay;
        }
    },
    watch: {
      startTime(){
          let{progress,drag} = this.$refs;
          progress.style.width = `${this.startTime/this.endTime*100}%`;
          drag.style.left = `${this.startTime/this.endTime*100}%`;
      },
      isPlay(){
        let{playAudio} = this.$refs;
        if(this.isPlay){
          
           playAudio.play();
        }else{
          playAudio.pause();
        }
      },
      //监听切换歌曲
      curSongIdx(){
        //要让当前isplay改变状态
        this.$store.commit('song/controlSongPlay',true);
        //更新当前的歌曲
        let{songList,curSongIdx} = this;
        this.playSongList = songList[curSongIdx];
        let {mid} = this.playSongList;
        //获取当前播放歌曲的内容
        getSongPlayUrl(mid).then(res=>{
          
            this.playSongUrl = res.data.data[mid];
        })
      }
    },
    created () {
        
        let{songList,curSongIdx} = this;
        this.playSongList = songList[curSongIdx];
        
        let {mid} = this.playSongList;
        console.log(songList,curSongIdx);
        console.log(mid);
        //获取当前播放歌曲的内容
        getSongPlayUrl(mid).then(res=>{
          
            this.playSongUrl = res.data.data[mid];
        })
    },
    methods: {
      //处理歌曲播放完毕事件
      handleEnd(){
         this.$store.commit('song/controlSongPlay',false);
         //判断当前播放模式
         switch(this.loop){
           case 1:{
            //列表循环
            this.$store.commit('song/getCurrentSongIndexMut',Number(this.curSongIdx)+1); 
            break;}
          case 2:{
          //随机播放
            let num =Math.floor(Math.random()*this.songList.length);
            this.$store.commit('song/getCurrentSongIndexMut',num);
            break;}
          default:{
            //继续播放当前歌曲，此时监听不到curIdx的变化，让歌曲当前变为0
            let {playAudio} = this.$refs;
            playAudio.currentTime = 0;
            
        
            this.$store.commit('song/controlSongPlay',true)
            break;}
         }
      },
      //展示播放列表
      playListShow(){
        this.$store.commit('song/controlPlayList',true);
      },
      //拖拽进度条
      touchStart(){
         console.log('手指按下');
         //按下时音乐暂停
        this.$store.commit('song/controlSongPlay',false)
         //阻止默认事件
      },
      touchMove(e){
         //console.log("手指移动")
         //获取pro,progress距离屏幕的左偏移量
         let{pro,playAudio} = this.$refs;
         let proLeft = pro.getBoundingClientRect().left;
         //获取鼠标移动最大距离
         let max = pro.getBoundingClientRect().width;
         //鼠标距离左侧距离为：
         let mouse = e.touches[0].clientX;
         let dis = mouse-proLeft;
        // console.log(mouse,dis,max)
         if(dis<=max){
            playAudio.currentTime = dis/max*this.endTime;
         }
         
      },
      touchEnd(){
         //继续播放音乐
         //this.controlIsplay(true);
         this.$store.commit('song/controlSongPlay',true)
      },
      //播放模式
      handleLoop(){
         this.$store.commit('song/getPlayLoopMut');
      },
      //处理上一首
      switchToPrev(){
         let num = Number(this.curSongIdx)-1;
         this.$store.commit('song/getCurrentSongIndexMut',num);
      },
      //处理下一首
      switchToNext(){
        //console.log(11);
         let num = Number(this.curSongIdx)+1;
         this.$store.commit('song/getCurrentSongIndexMut',num);
      },
      //处理播放
      handlebofang(){
         this.$store.commit('song/controlSongPlay',!this.isPlay);
      },
      //音频资源可播放
      canplay(){
        //获取音频当前播放时间、总时长
          let{playAudio} = this.$refs;
          this.startTime = playAudio.currentTime;
          this.endTime = playAudio.duration;
         if(this.isPlay){
            playAudio.play();
          }else{
            playAudio.pause();
          }
      },
      //监听音乐播放时间的变化
      timeupdate(){
        let{playAudio} = this.$refs;
        this.startTime = playAudio.currentTime;
        //console.log(this.startTime)

      }
    },
    filters: {
      // 时间过滤器，对时间进行处理
      timeFilter: function(time) {
        let min = Math.floor(time/60);
        let sec = Math.round(time%60);
        min = min>=10?min:'0'+min;
        sec = sec>=10?sec:'0'+sec;
        return `${min}:${sec}`;
      }
    }
};
</script>

<style lang="less" scoped>
@import url("../../style/var.less");
.play-header {
  width: 100%;
  height: 99 / @rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 42 / @rem;
  box-sizing: border-box;
  .down {
    font-size: 20 / @rem;
  }
  .header-text {
    display: flex;
    color: #887565;
    overflow: hidden;
    a {
      font-size: 26 / @rem;
    }
    span {
      width: 2 / @rem;
      height: 10 / @rem;
      margin-left: 20 / @rem;
      margin-right: 20 / @rem;
      margin-top: 20 / @rem;
      background: #887565;
    }
  }
}
.song-poster {
  width: 100%;
  height: 693 / @rem;
  padding: 26 / @rem 56 / @rem;
  box-sizing: border-box;
  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 20 / @rem;
  }
}
.play-info {
  width: 100%;
  height: 245 / @rem;
  padding-left: 48 / @rem;
  box-sizing: border-box;
  font-size: 26 / @rem;
  color: #887565;
  display: flex;
  ul {
    width: 545 / @rem;
    height: 100%;
    overflow: hidden;
    text-align: left;
    .song-name {
      margin-top: 36 / @rem;
      font-size: 48 / @rem;
      color: #fff;
      margin-bottom: 24 / @rem;
    }
    .song-singer {
      margin-bottom: 36 / @rem;
    }
  }
  .play-pick {
    width: 127 / @rem;
    height: 100%;
    padding-top: 54 / @rem;
    padding-left: 18 / @rem;
    box-sizing: border-box;
    font-size: 60 / @rem;
  }
}
.play-link {
  width: 100%;
  height: 208 / @rem;
  padding-top: 118 / @rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}
.play-progress{
    width:100%;
    height:92/@rem;
    padding-left:0;
    box-sizing: border-box;
    overflow: hidden;
    display:flex;
    justify-content: space-around;
    .progress{
        width:540/@rem;
        height:4/@rem;
        background:#887565;
        margin-top:26/@rem;
        position:relative;
        .playing{
            width:0;
            height:100%;
            position:absolute;
            top:0;
            left:0;
            background:red;
        }
        .drag-btn{
            width:15/@rem;
            height:15/@rem;
            border-radius: 50%;
            background:red;
            position:absolute;
            top:-5/@rem;
            left:0;
        }
    }
}
.play-tools{
  width:100%;
  display:flex;
  justify-content: space-around;
  .iconfont{
    font-size:60/@rem;
  }
}
</style>