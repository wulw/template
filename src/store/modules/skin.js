import Cookies from 'js-cookie'

const state = {
    skin: Cookies.get('skin')
}

const mutations = {
    CHANGE_SKIN: (state, skins) => {
        Cookies.set('skin', skins)
        state.skin = skins
    }
}

const actions = {
    changeSkin({ commit }, skins) {
        commit('CHANGE_SKIN', skins)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
