// 展示歌曲、歌曲列表、搜索歌曲路由

const express = require("express");
const router = express.Router();
const isBadAccount = require("../config/isBadAccount");
// 身份验证
const passport = require("passport");
// 解构处理函数
const {getALLHandler, nowmusicHandler, posterHandler, searchByNameHandler, hotHandler, adminLikeHandler, languageHandler, styleHandler, artistHandler, userGetAllHandler, searchSongHandler} = require("../handler/music")


// 获取所有歌曲
router.get("/all", passport.authenticate("jwt", {session: false }), getALLHandler)

// 通过歌曲id获取歌曲
router.get("/nowmusic", nowmusicHandler)

// 获取歌曲海报
router.get("/poster", posterHandler)

// 通过songName搜索歌曲
router.post("/search/byname", passport.authenticate("jwt", { session: false }), searchByNameHandler)




// user操作
// 获取热歌
router.post("/hot", passport.authenticate("jwt", { session: false }), hotHandler)

// 获取所有admin收藏歌曲
router.post("/user/adminlike", passport.authenticate("jwt", { session: false }), adminLikeHandler)

// 语种点歌
router.post("/language", passport.authenticate("jwt", { session: false }), languageHandler)

// 风格点歌
router.post("/style", passport.authenticate("jwt", { session: false }), styleHandler)

// 明星点歌
router.post("/artist", passport.authenticate("jwt", { session: false }), artistHandler)

// 搜索歌曲
router.post("/search", passport.authenticate("jwt", { session: false }), searchSongHandler)

// 用户获取所有歌曲
router.post("/all", passport.authenticate("jwt", { session: false }), userGetAllHandler)





module.exports = router;