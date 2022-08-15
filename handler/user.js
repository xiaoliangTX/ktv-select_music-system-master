// 用户登录回调函数

const isBadAccount = require("../config/isBadAccount");
const UserOrOrders = require("../dbModel/user");
// 密码加密解密
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_key = require("../secret/jwtkey").KEYORSECRET;

// 用户登录
const loginHandler = async(req, res) => {
    const account = req.body.account;
    try {
        const flag = await isBadAccount(req.body)
        const user = await UserOrOrders.findOne({account});
        if(!user){
            return res.status(406).json({status:"406", result:"账号或密码错误"})
        }else{
            if(flag){
                const password = req.body.password;
                // 先解密再匹配
                const isValidPassword = bcrypt.compareSync(password, user.password);
                if(!isValidPassword){
                    return res.status(406).json({status:"406",result:"账号或密码错误"})
                }else{
                    // 设置token
                    const rule = {
                        id:String(user._id),
                        account:user.account,
                        startTime:user.startTime,
                        endTime:user.endTime,
                        order_id:user.order_id,
                        money:user.money
                    };  
                    // 签证
                    jwt.sign(rule, jwt_key, (err, token) => {
                        if(err){
                            console.log(err);
                            return res.status(500).json({status:"500",result:"未知错误"});
                        }else{
                            res.status(200).json({status:"200", result:"登录成功", token:"Bearer " + token})
                        }
                    })
                }
            }else{
                res.status(401).json({status:"401", result:"帐号过期,请联系管理员"})
            }
        }
    } catch (error) {

        res.status(500).json({status:"500", result:"服务器内部错误"})
    }
}

module.exports = loginHandler