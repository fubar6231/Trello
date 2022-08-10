import React, {Component} from 'react';
import {Button, Card, CardGroup, Dropdown, DropdownButton} from "react-bootstrap";

import * as ApiCall from "./ApiCall"
import AddModal from "./AddModal";
import NavBar from "./navBar";
import Cards from "./cards";
import {connect} from "react-redux";
import * as Actions from "./redux/Actions";

const mapStateToProps = (state) => {
    return {lists: state.lists}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLists: (object) => dispatch(Actions.GetLists(object)),
        addList: (object) => dispatch(Actions.AddList(object)),
        deleteList: (object) => dispatch(Actions.DeleteList(object))
    }
}


class Board extends Component {

    state = {show: false, newListName: ""}


    componentDidMount() {
        let boardId = this.props.match.params.boardName
        ApiCall.GetLists(boardId).then(res => {
            this.props.getLists(res.data)
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
                this.props.addList(res.data)
                this.setState({newListName: ""})
            }).catch(error => console.error(error))
        }
        this.handleShow()
    }

    handleListDelete = (id) => {
        ApiCall.RemoveList(id).then(() => {
            let newList = this.props.lists.filter(list => {
                if (list.id !== id) {
                    return list
                }
            })
            this.props.deleteList(newList)
        }).catch(error => console.error(error))
    }


    render() {
        let finalElement
        if (this.props.lists.length !== 0) {
            finalElement = this.props.lists.map((list) => {
                return (
                    <Card key={list.id} style={{width: '300px', display: "inline-block"}}>
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
                    <Button variant="primary" key="addList" onClick={this.handleShow}>Add List</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Board);