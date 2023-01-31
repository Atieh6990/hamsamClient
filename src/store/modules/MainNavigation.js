const state = {
    items: [
        {id: 0, name: "upMenu", Selected: 0, Show: 1},
        {id: 1, name: "rightMenu", Selected: 1, Show: 1},
        {id: 2, name: "onlineUser", Selected: 0, Show: 1},
        {id: 3, name: "coin", Selected: 0, Show: 1},
        {id: 4, name: "mainView", Selected: 0, Show: 1}
    ],
    itemSelectedId: 1,
};

const getters = {

};

const actions = {

};


const mutations = {
    ChangeSelected() {

        state.items = products;
    },
    ShowAll() {

        state.all = products;
    },
    HideAll() {

        state.all = products;
    },



};


export default {
    state,
    getters,
    actions,
    mutations
}

