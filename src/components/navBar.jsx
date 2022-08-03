import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NavBar() {
    return (

        <Navbar bg="primary" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand key="logo">Trello</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/" key="Boards">Boards</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-light" bg={"light"}>Search</Button>
                </Form>
            </Container>
        </Navbar>
    );
}

export default NavBar;