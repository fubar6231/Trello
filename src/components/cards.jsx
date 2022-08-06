import React, {Component} from 'react';
import {Card, Button, Form} from "react-bootstrap";

import * as ApiCall from "./ApiCall"
import Checklist from "./Checklist";


class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {listCards: [], newCardName: "" }
    }

    componentDidMount() {
        ApiCall.GetCards(this.props.listId).then(object => {
            this.setState({listCards: object.data})
        })
    }



    handleCardDelete = (cardId) => {
        ApiCall.RemoveCard(cardId).then(object => {
            let listCards=this.state.listCards.filter(card=>{
                if (card.id !== cardId) {
                    return card
                }
            })
            this.setState({listCards})
        }).catch(error => console.error(error))
    }


    handleCardAddition = (e) => {
        e.preventDefault()
        if (this.state.newCardName.length !== 0) {
            ApiCall.AddCard(this.state.newCardName,this.props.listId).then(object => {
                this.setState({listCards: [object.data,...this.state.listCards],newCardName:""})
            }).catch(error => console.error(error))
        }
    }

    render() {
        let finalElement
        if (this.state.listCards.length !== 0) {
        }
        finalElement = this.state.listCards.map(listCrd => {
            return (<Checklist handleCardDelete={this.handleCardDelete} card={listCrd}/>)
        })
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Add Card</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Card Name"
                                    value={this.state.newCardName}
                                    onInput={e => this.setState({newCardName: e.target.value})}
                                />
                            </Form.Group>
                            <Button key="add List" variant="primary" type="submit"
                                    onClick={this.handleCardAddition}>
                                Add
                            </Button>
                        </Form>
                    </Card.Body>
                    {finalElement}
                </Card>
            </div>
        );

    }
}

export default Cards;