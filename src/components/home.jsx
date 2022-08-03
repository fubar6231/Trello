import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import axios from "axios";
import {Card, Modal, Form} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";


import NavBar from "./navBar";
import Board from "./board";


class Home extends Component {
    state = {
        boards: [],
        show: false,
        selectedBoard:{},
        newBoardName: ""
    }


    componentDidMount() {
        axios.get('https://api.trello.com/1/members/me/boards', {
            params: {
                key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
            }
        }).then(object => {
            this.setState({boards: object.data})
        }).catch(error => console.error(error))
    }

    handleShow = () => {
        this.setState({show:!this.state.show})
    }


    handleBoardAddition = () => {
        axios.post('https://api.trello.com/1/boards', null, {
            params: {
                name: this.state.newBoardName,
                key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
            }
        }).catch(error => console.error(error))

    }


    render() {
        let finalElement
        if (this.state.boards.length !== 0) {
            finalElement = this.state.boards.map(object => {
                return (<Link style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "20%",
                }} to={`/${object.id}`}><Card style={{width: '100%'}} onSubmit={()=>this.setState({selectedBoard:object})}>
                    <Card.Img variant="top"
                              src="https://media.istockphoto.com/photos/vintage-scratched-wooden-cutting-board-picture-id484854910?k=20&m=484854910&s=612x612&w=0&h=GRNaWpJoNfo4-yD_F9H95XYktpfwfb4fu519ysqmKww="/>
                    <Card.Body>
                        <Card.Title>{object.name}</Card.Title>
                    </Card.Body>
                </Card></Link>)
            })
        }

        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <NavBar/>
                        <br/>
                        <div>
                            <Button variant="primary" key="addBoard" onClick={this.handleShow}>Add Board</Button>
                            <Modal show={this.state.show} onHide={this.handleShow}>
                                <Modal.Header>
                                    <Modal.Title>Add Board</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Board Name"
                                                autoFocus
                                                value={this.state.newBoardName}
                                                onInput={e => this.setState({newBoardName: e.target.value})}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={this.handleBoardAddition} type="submit">
                                            Add
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button key="close" variant="secondary" onClick={this.handleShow}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                            <div style={{display: "flex", flexWrap: "wrap"}}>
                                {finalElement}
                            </div>
                        </div>
                    </Route>
                    <Route path="/:boardName">
                        <Board objects={this.state.selectedBoard}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Home;