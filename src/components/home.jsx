import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import {Card, CardGroup} from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import * as Actions from "./redux/Actions"
import AddModal from "./AddModal";
import * as ApiCall from "./ApiCall"
import NavBar from "./navBar";
import Board from "./board";

const mapStateToProps = (state) => {
    return {boards: state.boards}

}

const mapDispatchToProps = (dispatch) => {
    return {
        getBoard: (object) => dispatch(Actions.GetBoards(object)),
        addBoard: (object) => dispatch(Actions.AddBoard(object))
    }
}

class Home extends Component {
    state = {
        show: false, newBoardName: ""
    }


    componentDidMount() {
        ApiCall.GetBoards().then(object => {
            this.props.getBoard(object.data)
        }).catch(error => <p>Boards Not Loaded</p>)
    }

    handleShow = () => {
        this.setState({show: !this.state.show})
    }


    handleBoardAddition = (e) => {
        e.preventDefault()
        if (this.state.newBoardName.length !== 0) {
            ApiCall.CreateBoard(this.state.newBoardName).then(object => {
                this.props.addBoard(object.data)
                this.setState({newBoardName: ""})
            }).catch(error => console.error(error))
        }
        this.handleShow()
    }

    handleNewBoardName = (name) => {
        this.setState({newBoardName: name})
    }


    render() {
        let finalElement
        if (this.props.boards.length !== 0) {
            finalElement = this.props.boards.map(object => {
                return (<Link key={object.name} style={{
                    display: "flex", flexWrap: "wrap", width: "20%",
                }} to={`/${object.id}`}><Card style={{width: '100%'}}>
                    <Card.Img variant="top"
                              src="https://media.istockphoto.com/photos/vintage-scratched-wooden-cutting-board-picture-id484854910?k=20&m=484854910&s=612x612&w=0&h=GRNaWpJoNfo4-yD_F9H95XYktpfwfb4fu519ysqmKww="/>
                    <Card.Body>
                        <Card.Title>{object.name}</Card.Title>
                    </Card.Body>
                </Card></Link>)
            })
        }

        return (<Router>
            <Switch>
                <Route exact path="/">
                    <NavBar/>
                    <br/>
                    <div>
                        <Button variant="primary" key="addBoard" onClick={this.handleShow}>Add Board</Button>
                        <AddModal show={this.state.show}
                                  handleShow={this.handleShow}
                                  title={"Add Board"}
                                  placeholder={"Board Name"}
                                  handleAddition={this.handleBoardAddition}
                                  handleName={this.handleNewBoardName}/>
                        <CardGroup>
                            {finalElement}
                        </CardGroup>
                    </div>
                </Route>
                <Route path="/:boardName" component={Board}>
                </Route>
            </Switch>
        </Router>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);