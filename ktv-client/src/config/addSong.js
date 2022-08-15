// 添加歌曲

import store from "@/store"
import { MessageBox } from 'element-ui';

function isExit(songInfo){
    const songList = store.getters.songList;
    if(songList.length == 0){
        localStorage.setItem("currentSong", JSON.stringify(songInfo));
        localStorage.setItem("play", 1);
        store.dispatch("setCurrentSong", songInfo)
    }
    let isexit = false;
    songList.forEach(item => {
        item._id == songInfo._id ? isexit = true : "";
    })
    if(isexit){
        MessageBox.confirm("歌曲已添加,请勿重复添加", "提示", {
            confirmButtonText:"确定",
            cancelButtonText:"取消",
            type:"warning"
        }).then(() => {}).catch(() => {})
        return false;
    }else{
        // console.log(songInfo);
        songInfo.playcount++;
        store.dispatch("setSongList", songInfo);
        const list = store.getters.songList;
        localStorage.setItem("songList", JSON.stringify(list));
        console.log("已添加");
        return true;
    }
}

export default isExit
