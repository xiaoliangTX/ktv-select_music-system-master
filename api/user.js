// 用户登录路由

const express = require("express");
const router = express.Router();
const loginHandler = require('../handler/user')

// 用户登录
router.post("/login", loginHandler)

// 测试创建文件夹
// router.post("/add", (req, res) => {
//     const user = req.body.username;
//     fs.mkdir(path.resolve(__dirname, "../static/avatar/" + user), (error) => {
//         if(error){  // 如果存在
//             console.log("已存在");
//             res.send("已存在");
//             return;
//         }else{
//             res.send("创建成功");
//         }
//     })
// })

// 测试  isBadAccount(params)方法
// router.post("/test", passport.authenticate("jwt", {session:false}), async (req, res) => {
//     // console.log(req.user)
//     if(await isBadAccount(req.user)){
//         // do something
//         res.send("OK");
//     }else{
//         res.status(401).json({status:"401", result:"帐号过期,请联系管理员"})
//     }
// })

module.exports = router;
