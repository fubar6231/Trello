import actionsTypes from "./ActionTypes";

export const GetBoard=(boards)=>{
    return{
        type:actionsTypes.getBoard,
        payload:boards
    }
}

export const AddBoard=(board)=>{
    return{
        type:actionsTypes.addBoard,
        payload:board
    }
}

export const GetLists=(lists)=>{
    return{
        type:actionsTypes.getLists,
        payload:lists
    }
}

export const AddList=(list)=>{
    return{
        type:actionsTypes.addList,
        payload:list
    }
}

export const DeleteList=(list)=>{
    return{
        type:actionsTypes.deleteList,
        payload:list
    }
}