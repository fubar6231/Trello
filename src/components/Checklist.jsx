import React, {Component} from 'react';
import {Button, Card, InputGroup, Modal, Collapse, Form} from "react-bootstrap";

import * as ApiCall from "./ApiCall"
import CheckItem from "./CheckItem";

class Checklist extends Component {
    state = {checklists: [], show: false, open: false, newChecklistName: ""}

    handleShow = () => {
        this.setState({show: !this.state.show})
    }

    componentDidMount() {
        ApiCall.GetChecklist(this.props.card.id).then((res) => this.setState({checklists: res.data}))
    }

    handleOpen = () => {
        this.setState({open: !this.state.open})
    }

    handleNewChecklist = (e) => {
        e.preventDefault()
        if (this.state.newChecklistName.length !== 0) {
            ApiCall.AddCheckList(this.props.card.id, this.state.newChecklistName).then((res) => this.setState({checklists: [res.data,...this.state.checklists],newChecklistName:""})).catch(error => console.error(error))
            this.handleOpen()
        }
    }

    handleCheckListDelete=(e,id)=>{
        e.preventDefault()
        ApiCall.DeleteCheckList(id).then(() => {
            let checklists=this.state.checklists.filter(checklist=>{
                if (checklist.id !== id) {
                    return checklist
                }
            })
            this.setState({checklists})
        })
    }



    render() {
        let allCheckList
        if (this.state.checklists.length !== 0) {
            allCheckList = this.state.checklists.map(CL => {
                return (
                    <Card key={CL.id}>
                        <Card.Body>
                            <Card.Header style={{display: "flex", justifyContent: "space-between"}}>
                                {CL.name}
                                <div>
                                    <Button variant="primary" key="addBoard" onClick={e=>this.handleCheckListDelete(e,CL.id)}>Delete Checklist</Button>
                                </div>
                            </Card.Header>
                        </Card.Body>
                        <Card.Body>
                            <CheckItem cardId={this.props.card.id} checkListId={CL.id}/>
                        </Card.Body>
                    </Card>)
            })
        }
        return (
            <>
                <Card key={this.props.card.id}>
                    <Card.Body>
                        <Card.Title>{this.props.card.name}</Card.Title>
                        <Button variant="primary" onClick={() => this.props.handleCardDelete(this.props.card.id)}
                                style={{margin: "1%"}}>Delete
                            Card</Button>
                        <Button variant="primary" key="addBoard" onClick={this.handleShow}>Open Card</Button>
                        <Modal size="lg" show={this.state.show} onHide={this.handleShow}>
                            <Modal.Header style={{display: "flex", justifyContent: "space-between"}}>
                                <Modal.Title>{this.props.card.name}</Modal.Title>
                                <Button
                                    onClick={this.handleOpen}
                                    aria-controls="collapse-form"
                                    aria-expanded={this.state.open}
                                >
                                    Add CheckList
                                </Button>
                                <Collapse in={this.state.open}>
                                    <div id="collapse-form">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>CheckList Name</Form.Label>
                                                <Form.Control type="text" placeholder="CheckList Name"
                                                              value={this.state.newChecklistName}
                                                              onInput={e => this.setState({newChecklistName: e.target.value})}/>
                                            </Form.Group>
                                            <Button variant="primary" type="submit"
                                                    onClick={e => this.handleNewChecklist(e)}>
                                                Add
                                            </Button>
                                        </Form>
                                    </div>
                                </Collapse>
                            </Modal.Header>
                            <Modal.Body>
                                {allCheckList}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button key="close" variant="secondary" onClick={this.handleShow}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default Checklist;