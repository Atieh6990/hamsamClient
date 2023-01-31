import {ROAST_CONFIG} from '../config';
import axiosback from './ajax'
import axios from 'axios';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

var url = ROAST_CONFIG.url_Domain+'hamsam/pservice//api/v1/picture/list';

export default {
  getAll(){
    return axios({
      method: 'POST',
      url: ROAST_CONFIG.URL_Newssn + 'picture/list',
      headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFhMjc5NzhmMzg0MzAyOGVlM2NhYThiNDJlMjk4YzFmMDVhZmY0YWIyYmYxNDA0NjM5ZWU0ODEzNGQwNDUxMTcxODJhZmZiNTRmMjdmYzZiIn0.eyJhdWQiOiIxIiwianRpIjoiYWEyNzk3OGYzODQzMDI4ZWUzY2FhOGI0MmUyOThjMWYwNWFmZjRhYjJiZjE0MDQ2MzllZTQ4MTM0ZDA0NTExNzE4MmFmZmI1NGYyN2ZjNmIiLCJpYXQiOjE1NTA5OTU2NjksIm5iZiI6MTU1MDk5NTY2OSwiZXhwIjoxNTgyNTMxNjY5LCJzdWIiOiIyNzYyOTYiLCJzY29wZXMiOltdfQ.xEr85Zo3Cuoxyx0vOd8SMrDf9x_sbJjCIqMxVo0NPNDZGp1yQiqbdgGQbNTcLs5aWufzQcIVwTHEQkl9oHtV-LP87oLCfwlvQyrz1RphmdGaalsdmYHhzV4AvpjcN7Agb1WPenSxizTVNcrSY2b58-x12ASWwZmjW_h5fevmKxV2UMahgcCpxNrr_rk_xHRAI40mSIEd8nht5MWm4fWL6HuxHnRtBz-sBXFxrDwk0lN9owqCqgGdqDSwG703m3u43eWCwxdLgbHIaFpUEe7df6QsEbD9L8eg0FGpgbQVUkxsLLLWdofhWEzEM7TpMqXkeuy-Fzs_MgdgO-17yCQ9DHlsMAibFy6V9bpSdA8zB8d_CpNe5Dkcrp4Y8P3HD207APAUrp_jFV_XlVSkMew6a-boV-hhCbFh_OFH4IxSK0qIvqayLKn0jTqQRvJDD9nyJs9SwD9nekG74lm3d_U4ye__O6bybK2Bf6PAaeUh0XBU2kcb-Re1dZz9pxfrrTUoYLughl0BtQcDRMpSKvlOUNB8-mS_0otahOFCQrx0VgJXnnQ1hcMGl8mf6HF2dtDJzcyWBjz0XVvfsNyG3bUjzbIwDkHNSQn8IKHIEvy7X-0wJDQjpsezqjMak6mgV_V2e6_1Gkj4EB-SR_JAMr9n3TAiM5HVjeLXNxK5xtlM1ys'},
    })
      .then(data => {
        return data.data;
      })
  }
}
