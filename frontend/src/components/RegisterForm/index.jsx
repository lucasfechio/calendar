import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import MessageModal from '../MessageModal'
import qs from 'qs'
import consts from '../../consts'
import axios from 'axios'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            show: false
        }
    }

    onChange = (e, state) => {
        this.setState({ [state]: e.target.value })
    }

    handleSubmit = () => {
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        axios.post(`${consts.USER_URL}register`, qs.stringify(userData), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(resp => {
            if (resp.data.message === 'User already exists') {
                this.setState({show: true})
            }
        }).catch(err => console.log(err));
        this.props.onHide()
    }

    handleClose = () => {
        this.setState({show: false})
    }

    render() {
        const { onHide, ...rest } = this.props;
        return (
            <div>
                <Modal
                    {...rest}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Cadastrar Usuário
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.onChange(e, 'name')} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.onChange(e, 'email')} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" onChange={(e) => this.onChange(e, 'password')} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onHide}>Cancelar</Button>
                        <Button onClick={this.handleSubmit}>Cadastrar</Button>
                    </Modal.Footer>
                </Modal>
                <MessageModal 
                    show={this.state.show}
                    onHide={this.handleClose}
                    message='O email informado já foi utilizado'
                />
            </div>

        );
    }
}

export default RegisterForm