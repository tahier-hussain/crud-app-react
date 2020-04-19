import React, { Component } from 'react';
import AppNavbar from '../navbar/navbar';
import axios from 'axios';

import {
    Container, 
    Col, 
    Form,
    FormGroup, 
    Label, 
    Input,
    Button,
  } from 'reactstrap';

class MyPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:   []
        }
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            url: 'http://localhost:5000/api/posts/get-user-posts',
            headers: {
                'x-auth-token': localStorage.getItem('auth-token')
            }
        }

        axios(requestOptions).then(res => {
            this.setState({
                posts: res.data
            })
        })
    }
    render() {
        return(
            <div>
                <AppNavbar/>
                <Container>
                    <h2 className="mb-3">My Posts</h2>
                    {this.state.posts.map(post =>
                        <Container className="border mt-3 mb-3">
                            <h3 className="mt-3">{post.title}</h3>
                            <p>{post.post}</p>
                            <p>by <mark>{post.auth_user}</mark></p>
                            <div className="mb-3">
                                <Button color="primary mr-3">Edit</Button>
                                <Button color="danger">Delete</Button>
                            </div>
                        </Container>
                    )}
                </Container>
            </div>
        )
    }
}

export default MyPosts