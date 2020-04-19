import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Modal,
    ModalHeader,
    ModalBody,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import {Link} from 'react-router-dom'; 
import PostModal from '../postModal/postModal';

class AppNavbar extends Component {
    state = {
        isOpen: false,
        post_modal: false
    }

    toggle = (val) => {
        if(val == "drop") {
            this.setState({
                isOpen: !this.state.isOpen
            })
        }
        else {
            this.setState({
                modal: !this.state.modal
            })
        }
    }

    logout = () => {
        localStorage.removeItem('auth-token')
        this.props.history.push('/')
    }

    render() {
        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5 nav-bar-fixed-top">
                    <Container>
                        <NavbarBrand href="/home">
                            Social Media App
                        </NavbarBrand>
                        <NavbarToggler onClick={() => this.toggle("drop")}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {localStorage.getItem('auth-token') ?
                                <NavLink onClick={() => this.toggle("post")}>
                                    Create Post
                                </NavLink>:
                                <NavLink href="/home">
                                Posts
                                </NavLink>
                                }
                                {localStorage.getItem('auth-token') ?
                                <NavLink href="/myposts">
                                    My Posts
                                </NavLink>:
                                <NavLink href="/">
                                    Login
                                </NavLink>
                                }
                                {localStorage.getItem('auth-token') ?
                                <NavLink href="/" onClick={this.logout}>
                                    Logout
                                </NavLink>:
                                <NavLink href="/signup">
                                    Register
                                </NavLink>
                                }
                            </Nav>
                        </Collapse>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                        >
                            <ModalHeader toggle={this.toggle}>
                                Create Post
                            </ModalHeader>
                            <ModalBody>
                                <PostModal message="create" />
                            </ModalBody>
                        </Modal>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppNavbar;