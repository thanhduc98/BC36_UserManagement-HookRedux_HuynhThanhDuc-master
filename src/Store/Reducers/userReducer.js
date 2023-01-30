import { ADD_USER, DELETE_USER, EDIT_USER, UPDATE_USER } from '../types/user'

let userLocalStorage = JSON.parse(localStorage.getItem('USER'))

if (!userLocalStorage) {
    userLocalStorage = []
}

const DEFAULT_STATE = {
    userList: userLocalStorage,
    selectedUser: null,
}

export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case ADD_USER: {
            const data = [...state.userList]

            data.push({ ...payload, id: Date.now() })

            localStorage.setItem('USER', JSON.stringify(data))

            state.userList = data

            return { ...state }
        }

        case DELETE_USER: {
            const data = [...state.userList]

            const index = data.findIndex((ele) => ele.id === payload)

            if (index !== -1) {
                data.splice(index, 1)
            }

            console.log(data)

            localStorage.setItem('USER', JSON.stringify(data))

            state.userList = data

            return { ...state }
        }

        case EDIT_USER: {
            state.selectedUser = payload
            return { ...state }
        }

        case UPDATE_USER: {
            const data = [...state.userList]

            const index = data.findIndex((ele) => payload.username === ele.username)

            if (index !== -1) {
                data[index] = payload
            }

            state.userList = data

            return { ...state }
        }
        default:
            return state
    }
}
