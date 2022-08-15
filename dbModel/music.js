// 音乐模型

const mongoose = require("mongoose");

const musicModel = mongoose.Schema({
    songName:{
        require:true,
        type:String
    },
    artist:{
        require:true,
        type:String
    },
    poster:{
        require:true,
        type:String
    },
    src:{
        require:true,
        type:String
    },
    language:{
        type:String
    },
    style:{
        type:String
    },
    playcount:{
        type:String
    },
    date:{
        type:String,
        require:true
    },
    isLike:{
        type:Boolean,
        require:true,
        default:false
    }
})

module.exports = mongoose.model("Music", musicModel)