import React, { Component } from 'react';
import axios from 'axios';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    button,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

class PostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            method: '',
            title: '',
            post: '',
            auth_id: '',
            auth_user: ''
        }
    }

    componentDidMount() {
        if(this.state.message == 'create') {
            console.log("Create");
            this.setState({
                method: 'create'
            })

            const requestOptions = {
                method: 'GET',
                url: 'http://localhost:5000/api/auth/get',
                headers: {
                    'x-auth-token': localStorage.getItem('auth-token')
                }
            }

            axios(requestOptions).then(user => {
                this.setState({
                    auth_id:    user.data._id,
                    auth_user:  user.data.name,
                    method: 'Post'
                })
            })
        }
        else {
            console.log("Update")
            this.setState({
                title:      this.props.message.title,
                post:       this.props.message.post,
                auth_id:    this.props.message.auth_id,
                auth_user:  this.props.message.auth_user,
                method:     'Update'
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()

        let requestOptions
        if(this.state.method == 'Post') {
            requestOptions = {
                method: 'POST',
                url: 'http://localhost:5000/api/posts/add',
                headers: {
                    'x-auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                },
                data: {
                    title:      this.state.title,
                    post:       this.state.post,
                    auth_id:    this.state.auth_id,
                    auth_user:  this.state.auth_user
                }
            }

            console.log(this.state)
        }
        else {
            requestOptions = {
                method: 'PUT',
                url: 'http://localhost:5000/api/posts/update-post',
                headers: {
                    'x-auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                },
                data: {
                    id:         this.props.message._id,
                    title:      this.state.title,
                    post:       this.state.post
                }
            }
        }

        console.log(requestOptions)

        axios(requestOptions).then(res => {
            console.log(res)
            location.reload()
        })
    }

    render() {
        return(
            <Form onSubmit={this.submitHandler}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="title"
                        className="mb-3"
                        value={this.state.title}
                        onChange={this.changeHandler}
                    />
                    <Label for="post">Post</Label>
                    <Input
                        type="textarea"
                        name="post"
                        id="post"
                        placeholder="post"
                        className="mb-3"
                        rows="5"
                        value={this.state.post}
                        onChange={this.changeHandler}
                    />
                    <Button color="primary" className="float-right">{this.state.method}</Button>
                </FormGroup>
            </Form>
        )
    }
}

export default PostModal