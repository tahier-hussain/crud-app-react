import React, { Component } from 'react';
import AppNavbar from '../navbar/navbar';
import axios from 'axios';
import PostModal from '../postModal/postModal';

import {
    Container, 
    Col, 
    Form,
    FormGroup, 
    Label, 
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Button,
  } from 'reactstrap';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth_user_id: '',
            auth_user_name: '',
            auth_user_email: '',
            posts: [],
            modal: false,
            delete_post: false,
            modal_id: '',
            delete_post_id: ''
        }
    }

    componentDidMount() {
        let requestOptions = {
            method: 'GET',
            url: 'http://localhost:5000/api/auth/get',
            headers: {
                'x-auth-token': localStorage.getItem('auth-token')
            }
        }

        axios(requestOptions).then(res => {
            this.setState({
                auth_user_id:       res.data._id,
                auth_user_name:     res.data.name,
                auth_user_email:    res.data.email
            })
        })

        requestOptions = {
            method: 'GET',
            url: 'http://localhost:5000/api/posts/get'
        }

        axios(requestOptions).then(res => {
            this.setState({
                posts: res.data
            })
            console.log(res.data)
        })
    }

    toggle = (id) => {
        this.setState({
            modal_id: id,
            modal: !this.state.modal
        })
    }

    toggle_delete = (id) => {
        this.setState({
            delete_post_id: id,
            delete_post: !this.state.delete_post
        })
    }
    render() {
        return(
            <div>
                <AppNavbar/>
                <Container>
                    <h1 className="mb-5">Welcome {this.state.auth_user_name}</h1>
                    <h2>POSTS</h2>
                    {this.state.posts.map(post => 
                        <Container className="border mt-3 mb-3">
                            <h3 className="mt-2">{post.title}</h3>
                            <p>{post.post}</p>
                            <p>by <mark>{post.auth_user}</mark></p>
                            {this.state.auth_user_id == post.auth_id? 
                            <div className="mb-3">
                                <Button color="primary" className="mr-3" onClick={() => this.toggle(post._id)}>Edit</Button>
                                <Button color="danger" onClick={() => this.toggle_delete(post._id)}>Delete</Button>
                                {this.state.delete_post === true && this.state.delete_post_id === post._id? 
                                <div className="mt-2">
                                <p>Are you sure?</p>
                                <Button className="mr-3" color="info">Yes</Button>
                                <Button color="info">No</Button>
                                </div>:
                                ""
                                }
                            </div>:
                            ""
                            }
                            <Modal
                                isOpen={this.state.modal && this.state.modal_id === post._id}
                                toggle={this.toggle}
                            >
                                <ModalHeader toggle={this.toggle}>
                                    Update Post
                                </ModalHeader>
                                <ModalBody>
                                    <PostModal message={post}/>
                                </ModalBody>
                            </Modal>
                        </Container>
                    )}
                </Container>
            </div>
        )
    }
}

export default HomePage;