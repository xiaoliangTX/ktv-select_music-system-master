// 管理员管理歌曲的回调

// 自定义方法
const uploadMusic = require("../config/uploadMusic");
const uploadImg = require('../config/uploadImg');
const newAccount = require("../config/newaccount");
const delNoUse = require("../config/delNoUse");
require("../config/Date");
// 插件
const bcrypt = require("bcryptjs"); // 加密解密
const jwt = require("jsonwebtoken");
const jwt_key = require("../secret/jwtkey").KEYORSECRET;


// 数据库模型
const Admin = require("../dbModel/admin");
const Music = require("../dbModel/music");
const AdminLike = require("../dbModel/adminlike");
const UserAndOrders = require("../dbModel/user");



// 上传歌曲到服务器文件夹下 
const uploadMusicHandler =  async (req, res) => {
    console.log("歌曲上传成功");
    await uploadMusic(req, res);
}

// 上传歌曲海报到服务器文件下
const uploadPosterHandler = async (req, res) => {
    console.log("歌曲海报上传成功")
    await uploadImg(req, res);
}

// 添加歌曲
const addMusicHandler = (req, res) => {
    let flag = false;
    console.log(req.body);
    Music.findOne({
            songName: req.body.songName
        })
        .then(hasOne => {
            // hasOne == true && hasOne.artist == req.body.artist ? flag = true : flag = false;
            if (hasOne) {
                // 如果歌曲同名、歌手同名则认为歌曲存在
                hasOne.artist == req.body.artist ? flag = true : flag = false;
                if (flag) {
                    res.status(422).json({
                        status: "422",
                        result: "歌曲存在,请勿重复添加~"
                    })
                } else {
                    const song = {
                        songName: req.body.songName,
                        artist: req.body.artist,
                        poster: req.body.poster,
                        src: req.body.src,
                        language: req.body.language ? req.body.language : null,
                        style: req.body.style ? req.body.style : null,
                        playcount: "0",
                        date: new Date().format("yyyy/MM/dd HH:mm:ss")
                    };
                    const newSong = new Music(song);
                    newSong.save()
                        .then(() => {
                            res.json({
                                status: "200",
                                result: "添加成功"
                            })
                            delNoUse.delAll();
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                status: "500",
                                result: "未知错误,添加失败"
                            })
                        })
                }
            } else {
                const song = {
                    songName: req.body.songName,
                    artist: req.body.artist,
                    poster: req.body.poster,
                    src: req.body.src,
                    language: req.body.language ? req.body.language : null,
                    style: req.body.style ? req.body.style : null,
                    playcount: "0",
                    date: new Date().format("yyyy/MM/dd HH:mm:ss")
                };
                const newSong = new Music(song);
                newSong.save()
                    .then(() => {
                        res.json({
                            status: "200",
                            result: "添加成功"
                        })
                        delNoUse.delAll();

                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            status: "500",
                            result: "未知错误,添加失败"
                        })
                    })
            }
        })
}

// 编辑歌曲
const editMusicHandler = async (req, res) => {
    const _id = req.body._id;
    const nowSong = {};
    nowSong.songName = req.body.songName;
    nowSong.artist = req.body.artist;
    nowSong.src = req.body.src;
    nowSong.poster = req.body.poster;
    nowSong.language = req.body.language;
    nowSong.style = req.body.style;
    await Music.findOneAndUpdate({
        _id: _id
    }, {
        $set: nowSong
    }, {
        new: true
    }).then(newSong => {
        newSong.save()
            .then(() => {
                console.log("歌曲更新成功");
                res.status(200).json({
                    status: "200",
                    result: "歌曲更新成功"
                });
                delNoUse.delAll();
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    status: "500",
                    result: "更新失败,未知错误"
                });
            })
    })
}

// 删除歌曲
const deleteMusicHandler = async (req, res) => {
    const _id = req.body._id;
    await Music.findOneAndRemove({
            _id
        })
        .then(() => {
            res.json({
                status: "200",
                result: "删除成功"
            });
            delNoUse.delAll();
            AdminLike.findOneAndRemove({
                    s_id: _id
                })
                .then(() => {
                     console.log("同时移除喜欢歌曲");
                })
                    
                
        })
}

// admin收藏歌曲
const addAdminlikeHandler = async (req, res) => {
    const s_id = req.body.s_id;
    await AdminLike.findOne({
            s_id
        })
        .then(song => {
            if (song) {
                return res.status(416).json({
                    status: "416",
                    result: "歌曲已存在,请勿重复收藏"
                });
            } else {
                const newLike = new AdminLike({
                    s_id
                });
                newLike.save()
                    .then(() => {
                        console.log("收藏成功");
                        res.json({
                            status: "200",
                            result: "收藏成功"
                        });
                    })
            }
        })
    await Music.updateOne({
        _id: s_id
    },
        {
            $set:{'isLike':true}
        })
}

// 获取admin收藏的歌曲
const getAdminlikeHandler = async (req, res) => {
    await Music.find()
        .then(allsongs => {
            AdminLike.find()
                .then(adminlikes => {
                    var result = [];
                    allsongs.forEach(item => {
                        adminlikes.forEach(al => {
                            if (item._id == al.s_id) {
                                result.push(item)
                            }
                        })
                    })
                    res.send(result);
                })
        })
} 

// 通过id删除admin收藏的歌曲
const deleteAdminlikeByIdHandler = async (req, res) => {
    await AdminLike.findOneAndRemove({
            s_id: req.body._id
        }).then(()=>{
            res.json({
                status: "200",
                result: "删除成功"
            })
        })
    await Music.updateOne({
        _id: req.body._id
    },{
        $set:{'isLike':false}
    })    
}

// 搜索admin收藏歌曲
const searchAdminlikeHandler = async (req, res) => {
    const songName = req.body.searchName.toLowerCase().trim();
    await Music.find()
        .then(allsongs => {
            AdminLike.find()
                .then(adminlikes => {
                    var result = [];
                    allsongs.forEach(item => {
                        var flag = false;
                        adminlikes.forEach(al => {
                            if (item._id == al.s_id) {
                                item.songName.toLowerCase().indexOf(songName) == -1 ? flag = true : result.push(item)
                                if (flag) {
                                    item.artist.indexOf(songName) == -1 ? "" : result.push(item)
                                }
                            }
                        })
                    })
                    res.send(result)
                })
        })
}

// 创建ktv账号和密码
const newAccountHandler = async (req, res) => {
    const orderInfo = {
        account: newAccount(req.body.order_id).account,
        password: newAccount(req.body.order_id).password,
        order_id: req.body.order_id,
        money: req.body.totalMoney
    }
    const user = {
        order_id: req.body.order_id,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        money: req.body.totalMoney,
        account: orderInfo.account,
        password: orderInfo.password,
        publicpwd: orderInfo.password
    }

    const newUser = new UserAndOrders(user);
    await newUser.save(() => {
        res.send(orderInfo)
        console.log("开户成功");
    })
}

// 获取所有订单
const getOrder = async (req, res) => {
    UserAndOrders.find()
        .then(orders => {
            res.send(orders);
        })
}

// 以订单编号删除订单
const deleteOrderHandler = async (req, res) => {
    const order_id = req.body.order_id;
    await UserAndOrders.findOneAndRemove({
            order_id
        })
        // .then(orders => {
        //     orders.save()
        //         .then(() => {
        //             console.log("订单删除成功");
        //             res.json({
        //                 status: "200",
        //                 result: "删除成功"
        //             });
        //         })
        // })
        .then(()=>{
            res.json({
                status:"200",
                result:"删除成功"
            })
        })
}

// 管理员注册
const adminRegisterHandler = (req, res) => {
    const email = req.body.email;
    Admin.findOne({
            email
        })
        .then(hasOne => {
            if (hasOne) {
                return res.status(422).json({
                    status: "422",
                    result: "邮箱被占用"
                });
            } else {
                const username = req.body.username;
                const password = req.body.password;
                const identity = req.body.identity ? req.body.identity : null;
                const date = new Date().format("yyyy/MM/dd HH:mm:ss");
                const newAdmin = new Admin({
                    email,
                    username,
                    password,
                    identity,
                    date
                });
                newAdmin.save()
                    .then(() => {
                        res.json({
                            status: "200",
                            result: "注册成功"
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            status: "500",
                            result: "未知错误,注册失败"
                        })
                    })
            }
        })
}

// 管理员登录
const adminLoginHandler = (req, res) => {
    const email = req.body.email;
    Admin.findOne({
            email
        })
        .then(admin => {
            if (!admin) {
                return res.status(406).json({
                    status: "406",
                    result: "用户名或密码错误"
                })
            } else {
                const password = req.body.password;
                const isValidPassword = bcrypt.compareSync(password, admin.password);
                if (!isValidPassword) {
                    return res.status(406).json({
                        status: "406",
                        result: "用户名或密码错误"
                    })
                } else {
                    // 设置token
                    const rule = {
                        id: String(admin._id),
                        email: admin.email,
                        username: admin.username,
                        date: admin.date,
                        identity: admin.identity
                    };
                    // 签证
                    jwt.sign(rule, jwt_key, {
                        expiresIn: 36000
                    }, (err, token) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                status: "500",
                                result: "未知错误"
                            });
                        } else {
                            res.status(200).json({
                                status: "200",
                                result: "登录成功",
                                token: "Bearer " + token
                            })
                        }
                    })
                }
            }
        })
}

// 管理员操作时验证身份
const isLegalHandler = async (req, res) => {
    const email = req.body.email;
    await Admin.findOne({
            email
        })
        .then(islegal => {
            if (!islegal) {
                return res.status(416).json({
                    status: "416",
                    result: "未知错误"
                });
            } else {
                const password = req.body.password;
                const isValidPassword = bcrypt.compareSync(password, islegal.password);
                if (!isValidPassword) {
                    return res.status(416).json({
                        status: "416",
                        result: "用户名或密码错误"
                    });
                } else {
                    res.send("true");
                }
            }
        })
}

module.exports = {
    uploadMusicHandler,
    uploadPosterHandler,
    addMusicHandler,
    editMusicHandler,
    deleteMusicHandler,
    addAdminlikeHandler,
    getAdminlikeHandler,
    deleteAdminlikeByIdHandler,
    searchAdminlikeHandler,
    newAccountHandler,
    getOrder,
    deleteOrderHandler,
    adminRegisterHandler,
    adminLoginHandler,
    isLegalHandler
}