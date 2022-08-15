// 搭建数据库

const mongoose = require("mongoose");
const mongodbURI = require("../secret/mongodbURI").mongodbURI;

mongoose.connect(mongodbURI, {
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongodb is Connected.Please have a great coding.`);
})