import {instance} from '../utils/request'
export const getSingerCategory = ()=>{
    return instance.get('/singer/category');

}
export const getHotSinger = (area=-100,genre=-100,sex=-100)=>{
    return instance.get('/singer/list',{
        params:{
            area,
            genre,
            sex
        }
    });

}
// 获取歌手首页歌手歌曲
export const getSingerIndexInfo = (singerId,page,num=10)=>{
    return instance.get('/singer/songs',{
        params:{
           singermid:singerId,
           page,
           num
        }
    });

}
//获取歌手专辑
export const getSingerAlbum = (singerId,page,num=20)=>{
    return instance.get('/singer/album',{
        params:{
           singermid:singerId,
           pageNo:page,
           pageSize:num
        }
    });

}
//获取歌手介绍
export const getSingerInfo = (singerId)=>{
    return instance.get('/singer/desc',{
        params:{
           singermid:singerId
        }
    });

}
//获取歌曲播放连接
export const getSongPlayUrl = (mid)=>{
    return instance.get('/song/urls',{
        params:{
           id:mid
        }
    });

}

//获取播放列表
export const getSongPlayList = (mid)=>{
    return instance.get('/song/urls',{
        params:{
           id:mid
        }
    });

}
//获取歌词 
export const getLyric = (mid)=>{
    return instance.get('/lyric',{
        params:{
           songmid:mid
        }
    });

}
