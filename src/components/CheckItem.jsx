import React, {Component} from 'react';
import {Button, Card, CloseButton, Form, InputGroup} from "react-bootstrap";
import * as ApiCall from "./ApiCall";

class CheckItem extends Component {
    state = {checkItems: [], newCheckItem: ""}

    componentDidMount() {
        ApiCall.GetCheckItems(this.props.checkListId).then(res => this.setState({checkItems: res.data}))
    }


    handleNewCheckItem = (e, id) => {
        e.preventDefault()
        if (this.state.newCheckItem.length !== 0) {
            ApiCall.AddCheckItem(id, this.state.newCheckItem).then((res) => this.setState({
                checkItems: [res.data, ...this.state.checkItems],
                newCheckItem: ""
            })).catch(error => console.error(error))
        }
    }

    handleCheckItemUpdate = (e, CheckItemId) => {
        if (e) {
            ApiCall.UpdateCheckItem(this.props.cardId, CheckItemId, "complete").then(() => ApiCall.GetCheckItems(this.props.checkListId)).then((res) => this.setState({
                checkItems: res.data
            })).catch(error => console.error(error))
        } else {
            ApiCall.UpdateCheckItem(this.props.cardId, CheckItemId, "incomplete").then(() => ApiCall.GetCheckItems(this.props.checkListId)).then((res) => this.setState({
                checkItems: res.data
            })).catch(error => console.error(error))
        }

    }

    handleCheckItemDelete = (e, idCheckItem) => {
        e.preventDefault()
        ApiCall.DeleteCheckItem(this.props.checkListId, idCheckItem).then(() => {
            let checkItems = this.state.checkItems.filter(checkItem => {
                if (checkItem.id !== idCheckItem) {
                    return checkItem
                }
            })
            this.setState({checkItems})
        }).catch(error => console.error(error))
    }

    render() {
        let items
        if (this.state.checkItems.length !== 0) {
            items = this.state.checkItems.map(item => {
                return (
                    <InputGroup>
                        <InputGroup.Checkbox
                            onChange={(e) => this.handleCheckItemUpdate(e.target.checked, item.id)}/>
                        <InputGroup.Text>
                            {item.name}
                            <CloseButton onClick={e => this.handleCheckItemDelete(e, item.id)}/>
                        </InputGroup.Text>
                    </InputGroup>
                )
            })
        }
        return (
            <div>
                <Card>
                    <Card.Body>
                        {items}
                    </Card.Body>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>CheckItem Name</Form.Label>
                                <Form.Control type="text"
                                              placeholder="CheckItem Name"
                                              value={this.state.newCheckItem}
                                              onInput={e => this.setState({newCheckItem: e.target.value})}/>
                            </Form.Group>
                            <Button variant="primary" type="submit"
                                    onClick={e => this.handleNewCheckItem(e, this.props.checkListId)}>
                                Add
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}

export default CheckItem;

// <Form>
//     //     <Form.Group>
//     //         <Form.Check type={"checkbox"}
//                     checked={status}
//                     label={item.name}
//                     onChange={(e) => this.handleCheckItemUpdate(e.target.checked, item.id)}>
//         </Form.Check>
//         <Button onClick={e => this.handleCheckItemDelete(e, item.id)}>X</Button>
//     </Form.Group>
//
//     {/*<CloseButton onClick={e => this.handleCheckItemDelete(e, item.id)}/>*/}
// </Form>

