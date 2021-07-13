<template>
    <van-popup 
     :value="isShow"
      position="bottom" 
     @click-overlay="controlPlayListMut(false)"
    >
       <van-cell-group>
            <van-cell v-for="(song,index) in songList"
                      :title="song.name"
                      :key="index"
                      :title-style="index==curIdx?'color:green':''"
                      @click="curIdxMut(index)"
                       />
        
       </van-cell-group>
    </van-popup>
</template>

<script>
   // import { Popup } from 'vant';
   import {mapState, mapMutations} from 'vuex';
    export default {
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState({
               isShow:state=>state.song.isShow,
               songList:state=>state.song.currentSongList,
               curIdx:state=>state.song.currentSongIndex,
            })
        },
        created () {
        },
        methods: {
            ...mapMutations({
                'controlPlayListMut':'song/controlPlayList',
                'curIdxMut':'song/getCurrentSongIndexMut',
            })
        },
    }
</script>

<style lang="less" scoped>

</style>