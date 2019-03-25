import React from 'react'
import EditEvent from '../EditEvent'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import consts from '../../consts'
import './EventsList.css'

class EventsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            selectedEvent: {},
            list: [],
            eventID: ''
        }
    }

    componentDidMount = () => {
        this.setState({ list: this.props.events || [] })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ list: nextProps.events || [] })
    }

    handleOpen = (data, state, modal) => {
        this.setState({ [modal]: true, [state]: data })
    }

    handleClose = (modal, state) => {
        this.setState({ [modal]: false, [state]: '' })
    }

    handleRemove = async (id) => {
        try {
            await axios.delete(`${consts.EVENTS_URL}${id}`, {
                headers: {
                    "x-access-token": localStorage.getItem('USER_TOKEN'),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
        } catch (err) {
            console.log(err)
        }
        this.handleClose('show', 'eventID')
        this.props.refresh()
    }

    render() {
        return (
            <div>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Início</th>
                            <th>Fim</th>
                            <th className='tableActions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map(event => {
                            if (event.userID === localStorage.getItem('USER_ID')) {
                                return (
                                    <tr key={event.id}>
                                        <td >{event.description}</td>
                                        <td >{moment(event.date).format('DD/MM/YYYY')}</td>
                                        <td >{event.startTime}</td>
                                        <td >{event.endTime}</td>
                                        <td>
                                            <Button className="actionButtons" variant="primary" onClick={() => this.handleOpen(event, 'selectedEvent', 'modalShow')}>Editar</Button>
                                            <Button className="actionButtons" variant="danger" onClick={() => this.handleOpen(event.id, 'eventID', 'show')}>Excluir</Button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (null)
                            }
                        })}
                    </tbody>
                </Table>
                <EditEvent
                    show={this.state.modalShow}
                    onHide={() => this.handleClose('modalShow', 'selectedEvent')}
                    event={this.state.selectedEvent}
                    refresh={this.props.refresh}
                />
                <Modal show={this.state.show} centered>
                    <Modal.Body>Tem certeza que deseja excluir o evento?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.handleClose('show', 'eventID')}>
                            Não
                        </Button>
                        <Button variant="primary" onClick={() => this.handleRemove(this.state.eventID)}>
                            Sim
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EventsList