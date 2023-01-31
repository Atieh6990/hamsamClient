import { ROAST_CONFIG } from '../config.js';
import axios from 'axios';

export default {
	/*
		GET     /api/v1/cafes
	*/
	getUser: function(){
		return axios.get( ROAST_CONFIG.API_URL + '/cafes' );
	},
	getUrl: function(){
		return ROAST_CONFIG.API_URL;
	},
    test: function(){
        return axios.get(ROAST_CONFIG.API_URL).then(responce =>{
        	return responce.data;
		}).catch(error=>{
            return 'error';
		})
		;
    },
}