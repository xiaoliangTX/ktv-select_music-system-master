// 判断下一首歌

import store from "@/store"
function nextSong(){
    if(store.getters.currentSong){
        if(localStorage.playModle == -1){
            return store.getters.currentSong;
        }else{
            const songList = store.getters.songList;
            const currentSong = store.getters.currentSong;
            var songIndex = 0;
            songList.forEach((item, index) => {
                if(item._id == currentSong._id){
                    songIndex = index;
                }
            })
            // 播放到最后一首
            if(songIndex == songList.length - 1){
                return songList[0]
            }else{
                return songList[songIndex + 1]
            }
        }
    }else{
        return {_id:0}
    }
}

export default nextSong