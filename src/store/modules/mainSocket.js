import io from 'socket.io-client';
export const MainSocket = {
    state: {
        socket: "", notifications: {},
    },
    getters: {
      getSocket(state) {
            return state.socket;
        }, getnotifications(state) {
         //   console.log("state setnotificationsnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",state)
            return state.notifications;

        }



    },
    actions: {

    },
    mutations: {

        startSocket(state) {
            state.socket =  io.connect( "http://ssn.tvapps.ir:3006/");

        },
        disconnectSocket(state) {
         //   console.log("disconnectSockettttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",state.socket)
            if(state.socket!=""){
                state.socket.disconnect();
            }


         //   console.log("bad disss")

        }, setnotifications(state, payload) {
         //   console.log("state setnotificationsnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",payload)
            state.notifications = payload;

        }, updateNotifications(state, payload) {
          //  console.log("state setnotificationsnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", payload["msg"]+payload["msgCount"])
         //   console.log(" befmsggggggggggggggggggggggggggggggggg",state.notifications[ payload["msg"]])
          //  alert( state.notifications[payload["msg"]])
         //   delete state.notifications[payload["msg"]]
            state.notifications[ payload["msg"]]=payload["msgCount"]
          //  console.log(" afterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",state.notifications[ payload["msg"]])
          //  window.app1.set( state.notifications[0], payload["msg"], payload["msgCount"]);




        }


    },
};
