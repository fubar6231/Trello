import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {Component} from 'react';

class AddModal extends Component {
    state={show:false}

    handleShow = () => {
        this.setState({show:!this.state.show})
    }

    render() {
        return (
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button key="close" variant="secondary" onClick={this.handleShow}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddModal;

// <Modal show={this.state.show} onHide={this.handleClose}>
//     <Modal.Header>
//         <Modal.Title>Add Board</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//         <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Board Name"
//                     autoFocus
//                     value={this.state.newBoardName}
//                     onInput={e => this.setState({newBoardName: e.target.value})}
//                 />
//             </Form.Group>
//             <Button variant="primary" onClick={this.handleBoardAddition} type="submit">
//                 Add
//             </Button>
//         </Form>
//     </Modal.Body>
//     <Modal.Footer>
//         <Button key="close" variant="secondary" onClick={this.handleClose}>Close</Button>
//     </Modal.Footer>
// </Modal>
//
// <Modal show={this.state.show} onHide={this.handleClose}>
//     <Modal.Header>
//         <Modal.Title>Add List</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//         <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label>List Name</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="List Name"
//                     autoFocus
//                     value={this.state.newListName}
//                     onInput={e => this.setState({newListName: e.target.value})}
//                 />
//             </Form.Group>
//             <Button key="add List" variant="primary" type="submit"
//                     onClick={this.handleListAddition}>
//                 Add
//             </Button>
//         </Form>
//     </Modal.Body>
//     <Modal.Footer>
//         <Button key="close" variant="secondary" onClick={this.handleClose}>Close</Button>
//     </Modal.Footer>
// </Modal>