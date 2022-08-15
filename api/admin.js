// 管理员管理歌曲路由

const router = require("express").Router();
const passport = require("passport");
// 解构admin中的回调函数
const {uploadMusicHandler, uploadPosterHandler, addMusicHandler, editMusicHandler, deleteMusicHandler, addAdminlikeHandler, getAdminlikeHandler, deleteAdminlikeByIdHandler, searchAdminlikeHandler, newAccountHandler, getOrder, deleteOrderHandler, adminRegisterHandler, adminLoginHandler, isLegalHandler} = require("../handler/admin")


// 上传歌曲到服务器文件夹下
router.post("/upload/music", uploadMusicHandler)

// 上传歌曲海报到服务器文件下
router.post("/upload/poster", uploadPosterHandler)

// 添加歌曲
router.post("/music/add", passport.authenticate("jwt", { session: false }), addMusicHandler)

// 编辑歌曲
router.post("/music/edit", passport.authenticate("jwt", { session: false }), editMusicHandler)

// 删除歌曲
router.post("/music/delete", passport.authenticate("jwt", { session: false }), deleteMusicHandler)

// admin收藏歌曲
router.post("/adminlike/add", passport.authenticate("jwt", { session: false }), addAdminlikeHandler)

// 获取所有admin收藏歌曲
router.get("/adminlike/all", passport.authenticate("jwt", { session: false }), getAdminlikeHandler)

// 通过id删除admin收藏歌曲
router.post("/adminlike/del",  deleteAdminlikeByIdHandler)

// 搜索admin收藏歌曲
router.post("/adminlike/search", passport.authenticate("jwt", { session: false }), searchAdminlikeHandler)

// 创建ktv账号和密码
router.post("/account/new", passport.authenticate("jwt", { session: false }), newAccountHandler)

// 获取所有订单
router.get("/orders/all", passport.authenticate("jwt", { session: false }), getOrder)

// 以订单编号删除订单
router.post("/orders/del", passport.authenticate("jwt", { session: false }), deleteOrderHandler)


// 管理员注册
router.post("/account/register", adminRegisterHandler)

// 管理员登录
router.post("/account/login", adminLoginHandler);

// 验证身份
router.post("/islegal", passport.authenticate("jwt", { session: false }), isLegalHandler)


module.exports = router