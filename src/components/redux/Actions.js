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