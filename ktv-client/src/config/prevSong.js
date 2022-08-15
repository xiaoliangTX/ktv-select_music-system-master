// 判断前一首歌

import store from "@/store"
function songIndex(song){
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
            if(songIndex == 0){
                return songList[songList.length - 1]
            }else{
                return songList[songIndex - 1]
            }
        }
    }else{
        return {_id:0}
    }
}

export default songIndex