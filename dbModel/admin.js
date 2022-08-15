// 管理员模型

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const adminModel = mongoose.Schema({
    email:{
        require:true,
        type:String
    },
    username:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String,
        set(val){
            return bcrypt.hashSync(val, 10)
        }
    },
    identity:{
        // require:true,
        type:String
    },
    date:{
        require:true,
        type:String
    }
})

module.exports = mongoose.model("Admin", adminModel)