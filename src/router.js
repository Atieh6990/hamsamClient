import Vue from 'vue'
import Router from 'vue-router'
import Seven from './pages/Seven.vue'
import One from './pages/One.vue'
import Two from './pages/Two.vue'
import Three from './pages/Three.vue'
import Four from './pages/Four.vue'
import Five from './pages/Five.vue'
import Six from './pages/Six.vue'

import Eight from './pages/Eight.vue'
import Nine from './pages/Nine.vue'
import Ten from './pages/Ten.vue'
import Eleven from './pages/Eleven.vue'
import Twoelve from './pages/Twoelve.vue'
import Thirteen from './pages/Thirteen.vue'
import Fourteen from './pages/Fourteen.vue'
import Fifteen from './pages/Fifteen.vue'
import Sixteen from './pages/Sixteen.vue'
import Seventeen from './pages/Seventeen.vue'
import Eighteen from './pages/Eighteen.vue'
import Nineteen from './pages/Nineteen.vue'
import Twenty from './pages/Twenty.vue'
import TwoentyOne from './pages/TwoentyOne.vue'
import TwentyTwo from './pages/TwentyTwo'
import TwentyThree from './pages/TwentyThree'
import TwentyFour from './pages/TwentyFour'
import Worldcup from './pages/Worldcup'
import videoDetails from './pages/videoDetails'

Vue.use(Router);


export default new Router({

    routes: [
        {
            path: '/',
            name: 'Seven',
            component: Seven,
            meta: {requiresAuth: true}
        }, {
            path: '/seven/:time',
            name: 'Seven',
            component: Seven,
            meta: {requiresAuth: false}
        },
        {
            path: '/one',
            name: 'One',
            component: One,
            meta: {requiresAuth: false}
        },
        {
            path: '/one/:time',
            name: 'One',
            component: One,
            meta: {requiresAuth: false}
        },
        {
            path: '/two/:time',
            name: 'Two',
            component: Two
        },

        {
            path: '/three/:time',
            name: 'Three',
            component: Three
        },
        {
            path: '/four/:time',
            name: 'Four',
            component: Four
        },
      {
        path: '/twentyFive/:time',
        name: 'TwentyFive',
        component: Four
      },
        {
            path: '/five/:time',//friends
            name: 'Five',
            component: Five
        },
        {
            path: '/six/:time',//profile
            name: 'Six',
            component: Six
        },
        {
            path: '/eight/:time',
            name: 'Eight',
            component: Eight
        },
        {
            path: '/nine/:time',
            name: 'Nine',
            component: Nine
        },
        {
            path: '/ten/:time',
            name: 'Ten',
            component: Ten
        },
        {
            path: '/eleven/:time',
            name: 'Eleven',
            component: Eleven
        },
        {
            path: '/twoelve/:time',//gamecenter
            name: 'Twoelve',
            component: Twoelve
        },
        {
            path: '/thirteen/:time',
            name: 'Thirteen',
            component: Thirteen
        },
        {
            path: '/fourteen',
            name: 'Fourteen',
            component: Fourteen
        },

        {
            path: '/fifteen/:time',
            name: 'Fifteen',
            component: Fifteen
        },
        {
            path: '/sixteen/:time',
            name: 'Sixteen',
            component: Sixteen
        },
        {
            path: '/seventeen/:time',
            name: 'Seventeen',
            component: Seventeen
        },
        {
            path: '/eighteen/:time',
            name: 'Eighteen',
            component: Eighteen
        },
        {
            path: '/nineteen/:time',
            name: 'Nineteen',
            component: Nineteen
        },
        {
            path: '/twenty/:time',
            name: 'Twenty',
            component: Twenty
        },
        {
            path: '/twoentyOne/:time',//game center
            name: 'TwoentyOne',
            component: TwoentyOne
        },
        {
            path: '/twentyTwo/:time',//News
            name: 'TwentyTwo',
            component: TwentyTwo
        },
        {
            path: '/twentyThree/:time',//News
            name: 'TwentyThree',
            component: TwentyThree
        },
        {
            path: '/twentyFour/:time',//News
            name: 'TwentyFour',
            component: TwentyFour
        },
      {
        path: '/worldCupHome/:time',//News
        name: 'Worldcup',
        component: Worldcup
      },
      {
        path: '/videoDetails/:time',//videoDetails
        name: 'videoDetails',
        component: videoDetails
      },
    ]
})

