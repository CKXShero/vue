<template>
  <div>
    <div id="usualSinger">
      <ul id="usual">
        <li>
          <a href="#">常听歌手</a>
        </li>
        <li>
          <a href="#">
            关注歌手
            <span>></span>
          </a>
        </li>
      </ul>
      <div id="singerSwiper" class="swiper" ref="wrapper">
        <ul :style="{width:`${singerSwiperWidth}`}" ref="content">
          <li v-for="(item) in singerUsual" :key="item.singer_id">
            <div class="avator">
              <img :src="item.singer_pic" alt>
              <span>{{item.singer_name}}</span>
              <i class="el-icon-video-play"></i>
              <i class="el-icon-video-pause" style="display:none;"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="slideLine">
        <div :style="{'transform':`translateX(${slideOffset})`}"></div>
      </div>
      <div id="navList">
        <ul class="navList_box">
          <li class="nav-row" v-for="(cateArr,name,row) in singerCategory" :key="name">
            <div :class="['nav-wrap','navWrap'+row]" :style="{width:cateArr.length*100/37.5+'rem'}">
  
              <van-button
                round
                class="navBtn"
                v-for="(item,col) in cateArr"
                :key="item.id"
                :type="col == idxArr[row]?'primary':'default'"
                @click="handleSwitch(row,col,item.id)"
              >{{item.name}}</van-button>
            </div>
          </li>
        </ul>
      </div>
      <div id="hot">
        <div class="hot-text">
          <span>热</span>
        </div>
        <div class="hot-singer">
          <div class="hot-singer-list" v-for="(item) in singerHot" :key="item.singer_id"
            @click="handleToSinger(item)"
          >
            <div class="hot-singer-avator">
              <img :src="item.singer_pic" alt>
            </div>
            <div class="hot-singer-info">
              <h3>{{item.singer_name}}</h3>
              <h6>
                粉丝
                <span>{{item.singer_id/1000}}</span>万
              </h6>
            </div>
            <div class="pick">
              <button class="pick-btn">+关注</button>
              <button class="pick-btn active">已关注</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import { getSingerCategory, getHotSinger } from "../../api/Singer.js";
export default {
  data() {
    return {
      singerCategory: {},
      singerHot: [],
      singerUsual: [],
      slideOffset: 0,
      singerCateList:[],
      idxArr:[0,0,0,],//记录每行对应被激活的
      cateId:[-100,-100,-100],//记录点击的分类id
    };
  },
  computed: {
    singerSwiperWidth() {
      return (this.singerUsual.length * 171) / 37.5 + "rem";
    },
   
  },
  methods: {
    handleSwitch(row,col,cateId) {
       //this.idxArr[col] = row;   //避免数据劫持
       let arr = [...this.idxArr];
       arr[row] = col;
       this.idxArr = arr;
       this.cateId[row] = cateId;
       getHotSinger(this.cateId[0],this.cateId[1],this.cateId[2]).then(res=>{
         console.log(res.data.data.list)
         this.singerHot = res.data.data.list;
       })
    },
    handleToSinger(singer){
      this.$router.push({
        path:'/singerIndex',
        query:{
          singer:singer
        }
      })
    }
  },
  created() {
    getSingerCategory().then(res => {
      let cat = res.data.data;
      delete cat.index;
      this.singerCategory = cat;
      this.$nextTick(()=>{
        let bs1 = new BScroll(".navWrap0", {// eslint-disable-line no-unused-vars
          scrollX: true,
        });
        let bs2 = new BScroll(".navWrap1", {// eslint-disable-line no-unused-vars
          scrollX: true,
        });
        let bs3 = new BScroll(".navWrap2", {// eslint-disable-line no-unused-vars
          scrollX: true,
        });
      })
    });
    getHotSinger().then(res => {
      this.singerUsual = res.data.data.list;
      this.singerHot = res.data.data.list;
      this.$nextTick(() => {
        let { wrapper, content } = this.$refs;
        let wrapperWidth = wrapper.offsetWidth;
        let contentWidth = content.offsetWidth;
        //swiper最大滑动距离
        let maxSroWidth = contentWidth - wrapperWidth; // eslint-disable-line no-unused-vars
        // slide最大滑动距离
        let maxSlideWidth = 160 - 30;
        let bs = new BScroll(".swiper", {
          // eslint-disable-line no-unused-vars
          scrollX: true,
          probeType: 3
        });
        bs.on("scroll", position => {
          //eslint-disable-line no-unused-vars
          this.slideOffset =
            ((Math.abs(position.x) / maxSroWidth) * maxSlideWidth) / 37.5 +
            "rem";
        });
      });
    }).catch({
      
    });
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/var.less");

#usualSinger {
  width: 100%;
  height: auto;
  #usual {
    width: 100%;
    height: 60 / @rem;
    display: flex;
    position: relative;
    margin-bottom: 10 / @rem;
    li {
      width: 200 / @rem;
      height: 100%;
      position: absolute;
      a {
        color: #989898;
        font-size: 20 / @rem;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 60 / @rem;
        font-weight: 400;
      }
    }
    li:first-child {
      left: 24 / @rem;
    }
    li:last-child {
      right: 3 / @rem;
    }
  }
  #singerSwiper {
    width: 100%;
    height: 226 / @rem;
    box-sizing: border-box;
    padding-left: 22 / @rem;
    //  overflow-x: scroll;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      li {
        width: 145 / @rem;
        height: 212 / @rem;
        box-sizing: border-box;
        border-radius: 8 / @rem;
        margin-right: 26 / @rem;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
        .avator {
          width: 90 / @rem;
          height: 90 / @rem;
          margin-top: 20 / @rem;
          margin-bottom: 10 / @rem;
          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            margin-bottom: 4 / @rem;
          }
          span {
            font-size: 18 / @rem;
            margin-bottom: 16 / @rem;
            display: block;
            width: 90 / @rem;
            height: 36 / @rem;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .slideLine {
    width: 160 / @rem;
    height: 6 / @rem;
    background: #b9b9b9;
    margin: 6 / @rem auto 0;
    border-radius: 4 / @rem;
    div {
      width: 30 / @rem;
      height: 100%;
      background: #65da10;
    }
  }
  #navList {
    width: 100%;
    height: auto;
    .navList_box {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 35 / @rem;
      .nav-row {
        width: 100%;
        height: auto;
       // overflow-x: scroll;
        .nav-wrap {
          //width: 100%;
          height: auto;
          display: flex;
          flex-wrap: nowrap;
          margin-bottom: 22 / @rem;
          padding-left: 28 / @rem;
          box-sizing: border-box;
          .navBtn {
            width: 85 / @rem;
            height: 52 / @rem;
            flex-shrink: 0;
            font-size: 22 / @rem;
            border-radius: 20 / @rem;
            text-align: center;
            padding: 0;
            line-height: 100%;
            margin-right: 15 / @rem;
          }
        }
      }
    }
  }
  #hot {
    width: 100%;
    height: auto;
    .hot-text {
      width: 100%;
      height: 80 / @rem;
      span {
        font-size: 22 / @rem;
        display: block;
        margin-top: 15 / @rem;
        margin-left: 30 / @rem;
        color: #989898;
        width: 30 / @rem;
      }
    }
    .hot-singer {
      width: 100%;
      height: auto;
      .hot-singer-list {
        width: 100%;
        height: 110 / @rem;
        display: flex;
        position: relative;
        margin-bottom: 20 / @rem;
        .hot-singer-avator {
          width: 150 / @rem;
          height: 100%;
          img {
            display: block;
            width: 110 / @rem;
            height: 110 / @rem;
            border-radius: 50%;
            margin-left: 28 / @rem;
          }
        }
        .hot-singer-info {
          width: 440 / @rem;
          height: 100%;
          box-sizing: border-box;
          padding-top: 22 / @rem;
          padding-left: 8 / @rem;
          h3 {
            font-size: 28 / @rem;
            text-align: left;
            margin-bottom: 16 / @rem;
          }
          h6 {
            font-weight: normal;
            font-size: 18 / @rem;
            color: #b9b9b9;
            text-align: left;
          }
        }
        .pick {
          width: 160 / @rem;
          height: auto;
          box-sizing: border-box;
          padding-top: 34 / @rem;
          .pick-btn {
            margin-left: 26 / @rem;
            width: 110 / @rem;
            height: 40 / @rem;
            line-height: 40 / @rem;
            border-radius: 16 / @rem;
            font-size: 22 / @rem;
            text-align: center;
            border: 1 / @rem solid #b9b9b9;
            background: none;
            color: #000;
            display: none;
          }
          .pick-btn.active {
            display: block;
            color: #b9b9b9;
          }
        }
      }
    }
  }
}
</style>