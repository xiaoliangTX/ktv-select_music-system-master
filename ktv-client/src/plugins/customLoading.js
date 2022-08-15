// 自定义加载动画

import { Loading } from 'element-ui';
import Vue from 'vue';

let loadingInstance;
let customLoading = {
    start:(notice, bgcolor, fullscreen) => {
        loadingInstance = Loading.service({
            fullscreen: fullscreen ? fullscreen : true,
            text: notice ? notice : '正在加载...',
            background: bgcolor ? bgcolor : "rgba(0,0,0,.7)",
            lock: true,
        })
    },
    end:() => {
        Vue.nextTick(() => {
            loadingInstance.close();
        })
    }
}

export default customLoading