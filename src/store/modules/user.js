import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Cookies from 'js-cookie'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: state => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // user logout
    logout({ commit, state }) {
        removeToken() // must remove  token  first
        Cookies.remove('_n')
        Cookies.remove('_m')
        Cookies.remove('user')
        Cookies.remove('skin')
        resetRouter()
        commit('RESET_STATE')
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },

    //set token
    setToken({ commit }, str) {
        commit('SET_TOKEN', str)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
