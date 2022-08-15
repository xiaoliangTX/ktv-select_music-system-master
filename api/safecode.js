// 获取验证码路由

const router = require("express").Router();

const safecodeHandler = require('../handler/safecode')
router.get("/" , safecodeHandler)


module.exports = router