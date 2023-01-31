require('es6-promise').polyfill();


import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import axios from 'axios';
import VeeValidate from 'vee-validate';
import {CustomValidator} from './js/validation'
import VueAnalytics from 'vue-analytics'
import {page} from 'vue-analytics'




Vue.use(VeeValidate);

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {
}
Vue.use(VueAnalytics, {
    id: 'UA-138249105-1',set: [
        { field: 'fieldname', value: 'fieldvalue'}
    ]

})

window.app1 = new Vue({
    router,
    store,
    render: h => h(App),
    methods: {
        Test() {


        },
        notify(data) {
            this.$root.$emit('save_notif', data);
        }
    },   created () {
        this.$ga.set('checkProtocolTask', null)
    }
    , mounted() {
        this.$validator.localize('en', CustomValidator.Rules)
    }
}).$mount('#app');

tizen.tvinputdevice.getSupportedKeys().forEach(function (k) {
    //console.log(k.name + ' - ' + k.code);
    if ([37, 38, 39, 40, 48, 49, 50, 51, 13, 8, 52, 53, 54, 55, 56, 57, 10190, 10009, 10182, 46, 65376, 65385, 412, 413, 415, 417, 19, 427, 428
        ].indexOf(k.code) > -1) {
        tizen.tvinputdevice.registerKey(k.name);
    }
});


