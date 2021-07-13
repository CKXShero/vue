<template>
    <div>
        <div class="lyric">{{txt}}</div>
    </div>
</template>

<script>
    import Lyric from 'lyric-parser';
    import {getLyric} from '../../api/Singer.js';
    import {mapState} from 'vuex'
    export default {
        props: {
            mid: {
                type: String, 
            },
            time:{
            }
        },
        data() {
            return {
                lyrics:'',
                txt:'',
            }
        },
        computed: {
            ...mapState({
                isPlay:state=>state.song.isPlay,
                curIdx:state=>state.song.currentSongIndex,

            })
        },
        watch: {
            isPlay(){
               //  console.log(this.isPlay);
                if(this.isPlay){
                    //触发播放时如果不将当前时间传过来，歌词有一瞬间会显示开始的第一句
                   this.lyric.play(this.time*1000);
                }else{
                    this.lyric.stop();
                }
            },
            //监听播放时间变化来决定歌词展示
            time(){
                this.lyric.seek(this.time*1000);
            },
            //监听当前播放歌曲的变化，来切换歌词
            curIdx(){
                
                getLyric(this.mid).then(res=>{
                this.lyrics = res.data.data.lyric;
                //此时有个问题，会出现两首歌的歌词穿插播放
                //切歌时，先将上一首停掉
                if(this.lyric){
                    this.lyric.stop();
                }
                this.lyric = new Lyric(this.lyrics,(obj)=>{
                    this.txt = obj.txt;
                });
               
                if(this.isPlay){
                   this.lyric.play();
                }else{
                    this.lyric.stop();
                }
                
            });
            }
        },
        created () {
            getLyric(this.mid).then(res=>{
                this.lyrics = res.data.data.lyric;
                //此时有个问题，会出现两首歌的歌词穿插播放
                //切歌时，先将上一首停掉
                if(this.lyric){
                    this.lyric.stop();
                }
                this.lyric = new Lyric(this.lyrics,(obj)=>{
                    this.txt = obj.txt;
                });
               
                if(this.isPlay){
                   this.lyric.play(this.time*1000);
                }else{
                    this.lyric.stop();
                }
                
            });
            
            
            
        },
    }
</script>

<style lang="less" scoped>
@import url("../../style/var.less");
   .lyric{
       margin:10/@rem 0;
   }
</style>