// ktv推荐歌曲

const mongoose = require("mongoose");

const adminLikeModel = mongoose.Schema({
    s_id:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("AdminLike", adminLikeModel);