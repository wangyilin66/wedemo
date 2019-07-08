import Login from '../container/Login/Login.js';
import Deploy from '../container/deploy/index.js';
import Admin from '../container/Admin/Admin.js';
// import Exchange from '../container/Exchange/Exchange.js'
// import Exchange1 from '../container/Exchange1/Exchange1.js'
import Swiper from '../component/Swiper/index.js';
// import Exchange from '../container/deploy/child/Exchange/Exchange.js'
const Routes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/deploy",
        component: Deploy,
    },
    {
        path: "/admin",
        component: Admin,
    },
    // {
    //     path: "/exchange",
    //     component: Exchange
    // },
    // {
    //     path: "/exchange1",
    //     component: Exchange1
    // },
    {
        path: "/swiper",
        component: Swiper,
    },
    // {
    //     path: "/deploy/exchange",
    //     component: Exchange
    // },
];

export default Routes;