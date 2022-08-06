import axios from "axios";

axios.defaults.params = {
    key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
    token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
}

export function GetBoards() {
    return axios.get('https://api.trello.com/1/members/me/boards');
}

export function CreateBoard(name) {
    return axios.post('https://api.trello.com/1/boards', null, {
        params: {name}
    })
}

export function GetLists(boardId) {
    return axios.get(`https://api.trello.com/1/boards/${boardId}/lists`)
}

export function AddList(name, idBoard) {
    return axios.post('https://api.trello.com/1/lists', null, {
        params: {
            name,
            idBoard
        }
    })
}

export function RemoveList(id) {
    return axios.put(`https://api.trello.com/1/lists/${id}/closed`, null, {
        params: {
            value: true
        }
    })
}

export function GetCards(listId) {
    return axios.get(`https://api.trello.com/1/lists/${listId}/cards`)
}

export function AddCard(name, idList) {
    return axios.post('https://api.trello.com/1/cards', null, {
        params: {
            name,
            idList,
        }
    })
}

export function RemoveCard(cardId) {
    return axios.delete(`https://api.trello.com/1/cards/${cardId}`)
}

export function GetChecklist(id){
    return axios.get(`https://api.trello.com/1/cards/${id}/checklists`)
}

export function AddCheckList(id,name){
    return axios.post(`https://api.trello.com/1/cards/${id}/checklists`,null,{
        params:{name}
    })
}

export function DeleteCheckList(id){
    return axios.delete(`https://api.trello.com/1/checklists/${id}`)
}

export function GetCheckItems(id){
    return axios.get(`https://api.trello.com/1/checklists/${id}/checkItems`)
}

export function AddCheckItem(id,name){
    return axios.post(`https://api.trello.com/1/checklists/${id}/checkItems`,null,{
        params:{name}
    })
}

export function UpdateCheckItem(idCard,idCheckItem,state){
    return axios.put(`https://api.trello.com/1/cards/${idCard}/checkItem/${idCheckItem}`,null,{
        params:{state}
    })
}

export function DeleteCheckItem(id,idCheckItem){
    return axios.delete(`https://api.trello.com/1/checklists/${id}/checkItems/${idCheckItem}`)
}



