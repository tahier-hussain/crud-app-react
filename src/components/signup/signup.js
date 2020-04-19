import React, { Component } from 'react';
import {
    Container, 
    Col, 
    Form,
    FormGroup, 
    Label, 
    Input,
    Button,
  } from 'reactstrap';

import { Link, Redirect } from 'react-router-dom'; 
import axios from 'axios';
import AppNavbar from '../navbar/navbar';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            error_message: ''
        }
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()

        const requestOptions = {
            method: 'POST',
            url: 'http://localhost:5000/api/register',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                name:               this.state.name,
                email:              this.state.email,
                password:           this.state.password,
                confirm_password:   this.state.confirm_password
            }
        }

        axios(requestOptions).then(res => {
            console.log(res)
            if(res.status == 200) {
                this.props.history.push('/')
            }
        })

    }
    render() {
        return(
            <div>
                <AppNavbar/>
                <Container className="border">
                    <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
                    <Col>
                    <h2>SignUp</h2>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="name"
                            onChange={this.changeHandler}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="myemail@email.com"
                            onChange={this.changeHandler}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="********"
                            onChange={this.changeHandler}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="********"
                            onChange={this.changeHandler}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                    <Button color="dark">Register</Button>
                    </Col>
                    <Col>
                    Already have an account?
                    <Button color="link"><Link to="/">Login</Link></Button>
                    </Col>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Signup;