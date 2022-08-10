import React, {Component} from 'react';
import {Button, Card, Form} from "react-bootstrap";

import * as ApiCall from "./ApiCall"
import Checklist from "./Checklist";
import * as Actions from "./redux/Actions";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {listCards: state.cardsByList}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCards: (object) => dispatch(Actions.GetCards(object)),
        addCard: (object) => dispatch(Actions.AddCard(object)),
        deleteCard: (object) => dispatch(Actions.DeleteCard(object))
    }
}

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {newCardName: ""}
    }

    componentDidMount() {
        ApiCall.GetCards(this.props.listId).then(res => {
                this.props.getCards({cards: res.data, listId: this.props.listId})
            }
        )
    }


    handleCardDelete = (cardId) => {
        ApiCall.RemoveCard(cardId).then(() => {
            let listCards = this.props.listCards[this.props.listId].filter(card => card.id !== cardId)
            this.props.deleteCard({updatedCards: listCards, listId: this.props.listId})
        }).catch(error => console.error(error))
    }


    handleCardAddition = (e) => {
        e.preventDefault()
        if (this.state.newCardName.length !== 0) {
            ApiCall.AddCard(this.state.newCardName, this.props.listId).then(res => {
                this.props.addCard({card: res.data, listId: this.props.listId})
                this.setState({newCardName: ""})
            }).catch(error => console.error(error))
        }
    }

    render() {
        let finalElement
        let currentListCard = this.props.listCards[this.props.listId]


        if (currentListCard) {
            finalElement = currentListCard.map(listCrd => {
                return (<Checklist key={listCrd.id} handleCardDelete={this.handleCardDelete} card={listCrd}/>)
            })
        }

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

export default connect(mapStateToProps, mapDispatchToProps)(Cards);