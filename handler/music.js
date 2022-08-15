// 展示歌曲、歌曲列表、搜索歌曲的回调函数

const fs = require("fs");
const path = require("path");
const Music = require("../dbModel/music");
const AdminLike = require("../dbModel/adminlike");
const isBadAccount = require("../config/isBadAccount");


// 获取所有歌曲
const getALLHandler = async (req, res) => {
    await Music.find()
        .then(musics => {
            musics.length ? res.send(musics) : res.json({
                status: 200,
                result: "音乐为空"
            })
        })
}

// 通过歌曲id获取音乐
const nowmusicHandler = async (req, res) => {
    const _id = req.query.id;
    await Music.findOne({
            _id
        })
        .then(music => {
            if (music) {
                res.sendFile(path.resolve(__dirname, "../static/music/" + music.src))
                const sum = parseInt(music.playcount) + 1;
                const count = {
                    playcount: sum
                };
                // 更新播放次数次数
                Music.findOneAndUpdate({
                    _id: _id
                }, {
                    $set: count
                }, {
                    new: true
                }).then(newCount => {
                    newCount.save()
                        .then(() => {
                            // console.log("播放成功");
                        })
                })
            } else {
                res.sendFile(path.resolve(__dirname, "../static/view/404.html"));
            }
        }).catch(() => {
            res.sendFile(path.resolve(__dirname, "../static/view/404.html"));
        })
}

// 获取歌曲海报
const posterHandler = (req, res) => {
    const exists = fs.existsSync(path.resolve(__dirname, "../static/poster/" + req.query.song));
    res.sendFile(path.resolve(__dirname, "../static/poster/" + req.query.img))
}

// 通过songName搜索歌曲
const searchByNameHandler = async (req, res) => {
    const songName = req.body.searchName.trim();
    await Music.find({
            songName: {
                $regex: songName,
                $options: 'i'
            }
        })
        .then(songs => {
            if (songs.length) {
                res.send(songs)
            } else {
                Music.find({
                        artist: {
                            $regex: songName,
                            $options: 'i'
                        }
                    })
                    .then(artists => {
                        res.send(artists)
                    })
            }
        })
}


// user操作
// 获取热歌
const hotHandler = async (req, res) => {
    if (await isBadAccount(req.user)) {
        Music.find()
            .then(musics => {
                const musicList = musics;
                // 将音乐列表按照播放次数进行冒泡排序
                for (let i = 0; i < musicList.length - 1; i++) {
                    for (let j = 0; j < musicList.length - 1 - i; j++) {
                        if (parseInt(musicList[j].playcount) < parseInt(musicList[j + 1].playcount)) {
                            let temp = musicList[j];
                            musicList[j] = musicList[j + 1];
                            musicList[j + 1] = temp;
                        }
                    }
                }
                res.send(musicList);
            })
    } else {
        res.status(401).json({
            status: "401",
            result: "帐号过期,请联系管理员"
        })
    }
}

// 获取所有admin收藏歌曲
const adminLikeHandler = async (req, res) => {
    if (await isBadAccount(req.user)) {
        Music.find()
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
    } else {
        res.status(401).json({
            status: "401",
            result: "帐号过期,请联系管理员"
        })
    }
}

// 语种点歌
const languageHandler = async (req, res) => {
    if (await isBadAccount(req.user)) {
        const language = req.body.language;
        Music.find({
                language
            })
            .then(musics => {
                res.send(musics);
            })
    } else {
        res.status(401).json({
            status: "401",
            result: "帐号过期,请联系管理员"
        })
    }
} 

// #region
// 封装不同类型点歌函数
// function diange(type) {
//     if (await isBadAccount(req.user)) {
//         type = req.body.type;
//         Music.find({
//                 type
//             })
//             .then(musics => {
//                 res.send(musics);
//             })
//     } else {
//         res.status(401).json({
//             status: "401",
//             result: "帐号过期,请联系管理员"
//         })
//     }
// }
// #endregion

// 风格点歌
const styleHandler = async (req, res) => {
    if (await isBadAccount(req.user)) {
        const style = req.body.style;
        Music.find({
                style
            })
            .then(musics => {
                res.send(musics);
            })
    } else {
        res.status(401).json({
            status: "401",
            result: "帐号过期,请联系管理员"
        })
    }
}

// 明星点歌
const artistHandler = async (req, res) => {
    if (await isBadAccount(req.user)) {
        const artist = req.body.artist;
        Music.find({
                artist
            })
            .then(musics => {
                res.send(musics);
            })
    } else {
        res.status(401).json({
            status: "401",
            result: "帐号过期,请联系管理员"
        })
    }
}

// 搜索歌曲
const searchSongHandler = async (req, res) => {
    if (await isBadAccount(req.user)) {
        const songName = req.body.searchName.trim();
        Music.find({
                songName: {
                    $regex: songName,
                    $options: 'i'
                }
            })
            .then(songs => {
                if (songs.length) {
                    res.send(songs)
                } else {
                    Music.find({
                            artist: {
                                $regex: songName,
                                $options: 'i'
                            }
                        })
                        .then(artists => {
                            res.send(artists)
                        })
                }
            })
    } else {
        res.status(401).json({
            status: "401",
            result: "帐号过期,请联系管理员"
        })
    }
}

// 用户获取所有歌曲
const userGetAllHandler = async (req, res) => {
    if (await isBadAccount(req.user)) {
        Music.find()
            .then(musics => {
                res.send(musics);
            })
    } else {
        res.status(401).json({
            status: "401",
            result: "帐号过期,请联系管理员"
        })
    }
}




module.exports = {
    getALLHandler,
    nowmusicHandler,
    posterHandler,
    searchByNameHandler,
    hotHandler,
    adminLikeHandler,
    languageHandler,
    styleHandler,
    artistHandler,
    searchSongHandler,
    userGetAllHandler
}