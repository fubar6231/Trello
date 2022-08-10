import actionsTypes from "./ActionTypes";

export const GetBoards = (boards) => {
    return {
        type: actionsTypes.getBoards,
        payload: boards
    }
}

export const AddBoard = (board) => {
    return {
        type: actionsTypes.addBoard,
        payload: board
    }
}

export const GetLists = (lists) => {
    return {
        type: actionsTypes.getLists,
        payload: lists
    }
}

export const AddList = (list) => {
    return {
        type: actionsTypes.addList,
        payload: list
    }
}

export const DeleteList = (list) => {
    return {
        type: actionsTypes.deleteList,
        payload: list
    }
}

export const GetCards = ({cards, listId}) => {
    return {
        type: actionsTypes.getCards,
        payload: {cards, listId}
    }
}

export const AddCard = ({card, listId}) => {
    return {
        type: actionsTypes.addCard,
        payload: {card, listId}
    }
}
export const DeleteCard = ({updatedCards, listId}) => {
    return {
        type: actionsTypes.deleteCard,
        payload: {updatedCards, listId}
    }
}