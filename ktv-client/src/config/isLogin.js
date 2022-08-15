// 判断用户是否登录

function isLogin(){
    if(!localStorage.userToken){
        return false;
    }else{
        return true;
    }
}

export default isLogin