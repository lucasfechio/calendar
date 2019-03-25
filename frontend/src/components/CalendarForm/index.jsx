import React from 'react'
import Calendar from 'react-calendar';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import consts from '../../consts'
import qs from 'qs'
import './CalendarForm.css'

class CalendarForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            date: new Date(),
            startTime: '',
            endTime: '',
            list: [],
            show: false
        }
    }

    onChangeDate = (date) => {
        this.setState({ date })
    }

    onChange = (e, state) => {
        this.setState({ [state]: e.target.value })
    }

    submit = async () => {
        const eventData = {
            date: this.state.date,
            description: this.state.description,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            userID: localStorage.getItem('USER_ID')
        };
        try {
            const resp = await axios.post(consts.EVENTS_URL, qs.stringify(eventData), {
                headers: {
                    "x-access-token": localStorage.getItem('USER_TOKEN'),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            if (resp.data.message === 'Event already exists') {
                this.setState({show: true})
            } else {
                this.props.refresh()
                this.setState({ description: '', date: new Date(), startTime: '', endTime: '' })
            }
        } catch (err) {
            console.log(err)
        }  
    }

    handleClose = () => {
        this.setState({show: false})
    }

    render() {
        return (
            <div >
                <Row className='rowForm'>
                    <Col sm={8}>
                        <Calendar
                            className='calendar'
                            onChange={this.onChangeDate}
                            value={this.state.date}
                        />
                    </Col>
                    <Col>
                        <Form >
                            <Row>
                                <Col>
                                    <Form.Group className='formRow'>
                                        <Form.Label>Horário de início</Form.Label>
                                        <Form.Control value={this.state.startTime} type="time" onChange={(e) => this.onChange(e, 'startTime')} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className='formRow'>
                                        <Form.Label>Horário de término</Form.Label>
                                        <Form.Control value={this.state.endTime} min={this.state.startTime} type="time" onChange={(e) => this.onChange(e, 'endTime')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Form.Group className='formRow'>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control value={this.state.description} as="textarea" rows="5" onChange={(e) => this.onChange(e, 'description')} />
                        </Form.Group>
                        <Button className='formButton' onClick={this.submit} disabled={this.state.description === '' || this.state.startTime === '' || this.state.endTime === ''}>Agendar</Button>
                    </Col>
                </Row>
                <Modal show={this.state.show}>
                    <Modal.Body>Você já tem um evento agendado para essa data</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default CalendarForm