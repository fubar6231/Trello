import React, {Component} from 'react';
import axios from "axios";
import {Card, Form, Modal, Collapse, Button, CardGroup, DropdownButton, Dropdown} from "react-bootstrap";

import NavBar from "./navBar";
import Cards from "./cards";

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {lists: [], newListName: "", show: false, cardShow: false, newCardName: ""}
    }


    componentDidMount() {
        let boardId = window.location.href.split('/')[3]
        axios.get(`https://api.trello.com/1/boards/${boardId}`, {
            params: {
                key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
            }
        }).then(object => {
            axios.get(`https://api.trello.com/1/boards/${object.data.id}/lists`, {
                params: {
                    key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                    token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
                }
            }).then(res => {
                this.setState({lists: res.data})
            }).catch(error => console.error(error))
        })
    }


    handleShow = () => {
        this.setState({show: !this.state.show})
    }

    handleCardShow = () => {
        this.setState({cardShow: !this.state.cardShow})
    }


    handleListAddition = () => {
        let boardId = window.location.href.split('/')[3].split("?")[0]
        if(this.state.newListName.length!==0){
            axios.post('https://api.trello.com/1/lists', null, {
                params: {
                    name: this.state.newListName,
                    idBoard: boardId,
                    key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                    token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
                }
            }).catch(error => console.error(error))
        }
    }

    handleListDelete = (id) => {
        axios.put(`https://api.trello.com/1/lists/${id}/closed`, null, {
            params: {
                key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571",
                value: true
            }
        }).catch(error => console.error(error))

        let newList = this.state.lists.filter(list => {
            if (list.id !== id) {
                return list
            }
        })
        this.setState({lists: newList})
    }

    handleCardAddition = (id) => {
        if(this.state.newCardName.length!==0){
            axios.post('https://api.trello.com/1/cards', null, {
                params: {
                    name: this.state.newCardName,
                    idList: id,
                    key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                    token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
                }
            }).catch(error => console.error(error))
        }

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
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Add Card</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Card Name"
                                        onInput={e => this.setState({newCardName: e.target.value})}
                                    />
                                </Form.Group>
                                <Button key="add List" variant="primary" type="submit"
                                        onClick={() => this.handleCardAddition(list.id)}>
                                    Add
                                </Button>
                            </Form>
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
                    <Modal show={this.state.show} onHide={this.handleShow}>
                        <Modal.Header>
                            <Modal.Title>Add List</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>List Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="List Name"
                                        autoFocus
                                        value={this.state.newListName}
                                        onInput={e => this.setState({newListName: e.target.value})}
                                    />
                                </Form.Group>
                                <Button key="add List" variant="primary" type="submit"
                                        onClick={this.handleListAddition}>
                                    Add
                                </Button>
                                <Button key="close" variant="secondary" onClick={this.handleShow} style={{margin:"1%"}}>Close</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <br/>
                <CardGroup >
                    {finalElement}
                </CardGroup>
            </>
        );
    }
}

export default Board;