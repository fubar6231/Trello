import React from 'react';
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function AddModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleShow}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={props.placeholder}
                            autoFocus
                            onInput={e => props.handleName(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={props.handleAddition} type="submit">
                        Add
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button key="close" variant="secondary" onClick={props.handleShow}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddModal;