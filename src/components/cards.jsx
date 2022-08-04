import React, {Component} from 'react';
import axios from "axios";
import {Card, Button, Modal, Form} from "react-bootstrap";

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {listCards: [],show:false}
    }

    componentDidMount() {
        axios.get(`https://api.trello.com/1/lists/${this.props.listId}/cards`, {
            params: {
                key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
            }
        }).then(object => {
            this.setState({listCards: object.data})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.listCards !== this.state.listCards){
            axios.get(`https://api.trello.com/1/lists/${this.props.listId}/cards`, {
                params: {
                    key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                    token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
                }
            }).then(object => {
                this.setState({listCards: object.data})
            })
        }
    }

    handleShow = () => {
        this.setState({show:!this.state.show})
    }

    handleCardDelete=(cardId)=>{
        axios.delete(`https://api.trello.com/1/cards/${cardId}`,{
            params:{
                key: "9762cda5d8c1ddc1bd0c8aba672a0faa",
                token: "b04f1f278030c05434b88d797482e54152d6756957424c97daecc04bf6da9571"
            }
        })
    }

    render() {
        let finalElement
        if (this.state.listCards.length !== 0) {}
            finalElement=this.state.listCards.map(listCrd=>{
                return(<Card>
                    <Card.Body>
                        <Card.Title>{listCrd.name}</Card.Title>
                        <Button variant="primary" onClick={()=>this.handleCardDelete(listCrd.id)} style={{margin:"1%"}}>Delete Card</Button>
                        <Button variant="primary" key="addBoard" onClick={this.handleShow}>Open Card</Button>
                        <Modal show={this.state.show} onHide={this.handleShow}>
                            <Modal.Header closeButton>
                                <Modal.Title>{listCrd.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button key="close" variant="secondary" onClick={this.handleShow}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>
                </Card>)
            })
            return (
                <div>
                    {finalElement}
                </div>
            );

    }
}

export default Cards;