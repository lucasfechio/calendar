import React from 'react';
import axios from 'axios'
import qs from 'qs'
import RegisterForm from '../RegisterForm'
import MessageModal from '../MessageModal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import consts from '../../consts'

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            email: undefined,
            password: undefined,
            signUp: {
                success: undefined,
                message: undefined
            },
            logged: false,
            users: undefined,
            error: undefined,
            show: false,
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(`${consts.USER_URL}authenticate`, qs.stringify(userData), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(resp => {
            if (resp.data.status === "success") {
                localStorage.setItem('USER_TOKEN', resp.data.data.token);
                localStorage.setItem('LOGGEDIN', true);
                localStorage.setItem('USER_ID', resp.data.data.user._id);
                this.props.history.push("/calendar");
            } else if (resp.data.message === "Invalid email/password!!!") {
                this.setState({ show: true })
            }
        }).catch(err => console.log(err));
        e.target.reset()
    }

    onChange = (e, state) => {
        this.setState({ [state]: e.target.value })
    }

    handleOpen = () => {
        this.setState({ modalShow: true })
    }

    handleClose = (modal) => {
        this.setState({ [modal]: false })
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{ marginTop: '30vh' }}>
                    <div className="col">
                    </div>
                    <div className="col">
                        <div className="card" style={{ width: '20rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                            <div className="card-body">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" onChange={(e) => this.onChange(e, 'email')} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control type="password" onChange={(e) => this.onChange(e, 'password')} />
                                    </Form.Group>
                                    <Button type="submit" className="btn btn-primary btn-block">Login</Button>
                                    <Button type="button" onClick={this.handleOpen} className="btn btn-primary btn-block">Cadastrar</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                    </div>
                </div>
                <RegisterForm
                    show={this.state.modalShow}
                    onHide={() => this.handleClose('modalShow')}
                />
                <MessageModal
                    show={this.state.show}
                    onHide={() => this.handleClose('show')}
                    message='Email ou senha inválido'
                />
            </div>
        );
    }
}
export default LoginForm;