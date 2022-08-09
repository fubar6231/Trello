import actionsTypes from "./ActionTypes";



const reducer = (state={boards:[]}, action) => {
    switch (action.type) {
        case actionsTypes.addBoard:
            return {...state,boards:action.payload}
        case actionsTypes.getBoard:
            console.log(3789)
            return {...state,boards:action.payload}
        default:
            return state
    }
}

export default reducer