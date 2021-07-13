import { Toast } from 'vant';
export default {
    namespaced:true,
    state:()=>({
        //存放当前播放歌曲列表
        currentSongList:[],
        //存放当前播放歌曲的索引下标
        currentSongIndex:0,
        isPlay:false,//控制歌曲的播放与暂停
        loop:0,//播放形式
        loopData:[
            {title:'单曲循环',icon:'icon-hanhan-01-01'},
            {title:'列表循环',icon:'icon-icon-'},
            {title:'随机播放',icon:'icon-suiji'}
        ],
        //控制播放列表的展示
        isShow:false,
    }),
    mutations:{
        //初始化播放歌曲列表
        initCurrentSongListMut(state,CurSongList){
            
            state.currentSongList = CurSongList;
        },
        //控制当前播放歌曲的下标
        getCurrentSongIndexMut(state,curIndex){
          
            if(curIndex<0){curIndex = 0;}
            if(curIndex<state.currentSongList.length-1){
                state.currentSongIndex = curIndex;
            }
        },
        getPlayLoopMut(state){
            state.loop++;
            if(state.loop >2){
                state.loop = 0;
            }
            let{loop,loopData} = state;
            //轻提示
            Toast({
                message: loopData[loop].title,
                icon: 'like-o',
              });
        },
        //控制歌曲播放与暂停
        controlSongPlay(state,flag){
            state.isPlay = flag;
            console.log(state.isPlay)
        },
        //控制播放列表展示
        controlPlayList(state,flag){
            state.isShow = flag;
        }
        
     
    }
  }