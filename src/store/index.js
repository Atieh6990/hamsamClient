import Vue from 'vue'
import Vuex from 'vuex'
import MainNavigation from './modules/MainNavigation';
import { User} from "./modules/user";
import { MainSocket} from "./modules/mainSocket";
Vue.use( Vuex );


export default new Vuex.Store({
//export const store = new Vuex.Store({
	modules: {
        MainNavigation,User,MainSocket
	}
});
