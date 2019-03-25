import React from 'react'
import axios from 'axios'
import consts from '../../consts'
import CalendarForm from '../CalendarForm'
import EventsList from '../EventsList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import MessageModal from '../MessageModal'

class CalendarPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            show: false
        }
    }

    componentDidMount = () => {
        if (!localStorage.getItem('LOGGEDIN')) {
            this.props.history.push('/')
            return
        }
        this.refresh()
    }

    refresh = async () => {
        try {
            const resp = await axios.get(consts.EVENTS_URL, {
                headers: {
                    "x-access-token": localStorage.getItem('USER_TOKEN'),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            if (resp.data.message === 'jwt expired') {
                this.setState({ show: true })
            } else {
                this.setState({ list: resp.data.data.events })
            }
        } catch (err) {
            console.log(err)
        }
    }

    logout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    handleClose = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    render() {
        const { list } = this.state;
        return (
            <div>
                <Navbar  expand="xs" bg="dark" variant="dark">
                    <Navbar.Brand>Calendário</Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={this.logout}>
                            Sair
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <div className='container'>
                    <CalendarForm
                        refresh={this.refresh}
                    />
                    <EventsList
                        events={list}
                        refresh={this.refresh}
                        handleRemove={this.handleRemove}
                    />
                    <MessageModal
                        show={this.state.show}
                        onHide={this.handleClose}
                        message='A sessão expirou! Faça novamente o login no sistema. '
                    />
                </div>
            </div>
        )
    }
}

export default CalendarPage