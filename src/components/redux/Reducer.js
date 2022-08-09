import actionsTypes from "./ActionTypes";



const reducer = (state={boards:[]}, action) => {
    switch (action.type) {
        case actionsTypes.addBoard:
            return {...state,boards:[...state.boards,action.payload]}
        case actionsTypes.getBoard:
            return {...state,boards:action.payload}
        default:
            return state
    }
}

export default reducer