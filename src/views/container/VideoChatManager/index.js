import VideoChatManager from './VideoChatManager';

let instance;
let getContainer = () => HTMLElement;

// 获取单例实例
function getInstance(callback) {
    if (instance) {
        callback(instance);
        return;
    }
    VideoChatManager.newInstance({},
        (ins => {
            if (instance) {
                callback(instance);
                return;
            }
            instance = ins;
            callback(instance);
        })
    );
}

const api = {
    init() {
        getInstance((ins) => {
            console.log(ins);
        });
    },
};

export default api;