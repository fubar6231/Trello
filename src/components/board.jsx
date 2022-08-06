import React, {Component} from 'react';
import {Card, Button, CardGroup, DropdownButton, Dropdown} from "react-bootstrap";

import * as ApiCall from "./ApiCall"
import AddModal from "./AddModal";
import NavBar from "./navBar";
import Cards from "./cards";

class Board extends Component {

    state = {lists: [], show: false, newCardName: ""}


    componentDidMount() {
        let boardId = this.props.match.params.boardName
        ApiCall.GetLists(boardId).then(res => {
            this.setState({lists: res.data})
        }).catch(error => console.error(error))
    }


    handleShow = () => {
        this.setState({show: !this.state.show})
    }

    handleNewListName = (name) => {
        this.setState({newListName: name})
    }

    handleListAddition = (e) => {
        e.preventDefault()
        let boardId = this.props.match.params.boardName
        if (this.state.newListName.length !== 0) {
            ApiCall.AddList(this.state.newListName, boardId).then(res => {
                this.setState({lists: [res.data,...this.state.lists]})
            }).catch(error => console.error(error))
        }
        this.handleShow()
    }

    handleListDelete = (id) => {
        ApiCall.RemoveList(id).then(res=>{
            let newList = this.state.lists.filter(list => {
                if (list.id !== id) {
                    return list
                }
            })
            this.setState({lists: newList})
        }).catch(error => console.error(error))


    }



    render() {
        let finalElement
        if (this.state.lists.length !== 0) {
            finalElement = this.state.lists.map((list) => {
                return (
                    <Card style={{width: '300px', display: "inline-block"}}>
                        <Card.Body>
                            {list.name}
                            <DropdownButton title="options">
                                <Dropdown.Item as="button" onClick={() => this.handleListDelete(list.id)}>Delete
                                    List</Dropdown.Item>
                            </DropdownButton>
                        </Card.Body>
                        <Card.Body>
                            <Cards listId={list.id}/>
                        </Card.Body>
                    </Card>
                )
            })
        }
        return (
            <>
                <NavBar/>
                <br/>
                <div>
                    <Button variant="primary" key="addBoard" onClick={this.handleShow}>Add List</Button>
                    <AddModal show={this.state.show}
                              handleShow={this.handleShow}
                              title={"Add List"}
                              placeholder={"List Name"}
                              handleAddition={this.handleListAddition}
                              handleName={this.handleNewListName}/>
                </div>
                <br/>
                <CardGroup>
                    {finalElement}
                </CardGroup>
            </>
        );
    }
}

export default Board;