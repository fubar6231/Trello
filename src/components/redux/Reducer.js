import actionsTypes from "./ActionTypes";

const initialState={boards:[],lists:[]}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionsTypes.addBoard:
            return {...state,boards:[...state.boards,action.payload]}
        case actionsTypes.getBoard:
            return {...state,boards:action.payload}
        case actionsTypes.getLists:
            return {...state,lists: action.payload}
        case actionsTypes.addList:
            return {...state,lists:[...state.lists,action.payload]}
        case actionsTypes.deleteList:
            return {...state,lists: action.payload}
        default:
            return state
    }
}

export default reducer