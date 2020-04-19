import React, { Component } from 'react';
import {
    Container, 
    Col, 
    Form,
    FormGroup, 
    Label, 
    Input,
    Button,
    Alert
  } from 'reactstrap';
  
import {Link} from 'react-router-dom'; 
import axios from 'axios';
import AppNavbar from '../navbar/navbar';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error_message: ''
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()

        const requestOptions = {
            method: 'POST',
            url: 'http://localhost:5000/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email:      this.state.email,
                password:   this.state.password
            }
        }

        axios(requestOptions).then(res => {
            if(res.data.status == 200) {
                localStorage.setItem('auth-token',res.data.token)
                this.props.history.push('/home')
            }
            else if(res.data.status == 400) {
                this.setState({
                    error_message: res.data.msg
                })
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
                    <h2>LogIn</h2>
                    </Col>
                    {this.state.error_message?
                        <Alert color="danger">{this.state.error_message}</Alert>:
                        ""
                    }
                    <Col>
                        <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            size="5"
                            name="email"
                            id="exampleEmail"
                            placeholder="myemail@email.com"
                            onChange={this.changeHandler}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                            onChange={this.changeHandler}
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                    <Button color="dark">Login</Button>
                    </Col>
                    <Col>
                    Don't have an account?
                    <Button color="link"><Link to="/signup">Register</Link></Button>
                    </Col>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Login;