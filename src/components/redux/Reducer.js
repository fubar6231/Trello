import actionsTypes from "./ActionTypes";

const initialState = {boards: [], lists: [], cardsByList: {}}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.getBoards:
            return {...state, boards: action.payload}
        case actionsTypes.addBoard:
            return {...state, boards: [...state.boards, action.payload]}
        case actionsTypes.getLists:
            return {...state, lists: action.payload}
        case actionsTypes.addList:
            return {...state, lists: [...state.lists, action.payload]}
        case actionsTypes.deleteList:
            return {...state, lists: action.payload}
        case actionsTypes.getCards:
            return {...state, cardsByList: {...state.cardsByList,[action.payload.listId]: action.payload.cards}}
        case actionsTypes.addCard:
            return {...state, cardsByList:{...state.cardsByList,[action.payload.listId]: [...state.cardsByList[action.payload.listId],action.payload.card]}}
        case actionsTypes.deleteCard:
            return {...state, cardsByList: {...state.cardsByList,[action.payload.listId]: action.payload.updatedCards}}
        default:
            return state
    }
}

export default reducer