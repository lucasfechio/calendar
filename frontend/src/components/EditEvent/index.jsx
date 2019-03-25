import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Calendar from 'react-calendar';
import consts from '../../consts'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'

class EditEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newEvent: {
                description: '',
                startTime: '',
                endTime: '',
                startDate: new Date()
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (Object.keys(nextProps.event).length !== 0) {
            const startDate = moment(nextProps.event.date).format('DD/MM/YYYY').split('/')
            this.setState({
                newEvent: nextProps.event,
                startDate: new Date(+startDate[2], +startDate[1] - 1, +startDate[0])
            })
        }
    }

    onChangeDate = (date) => {
        const { newEvent } = this.state;
        newEvent['date'] = date
        this.setState({ newEvent })
    }

    onChange = (e, state) => {
        const { newEvent } = this.state;
        newEvent[state] = e.target.value
        this.setState({ newEvent })
    }

    submit = async () => {
        try {
            await axios.put(`${consts.EVENTS_URL}${this.state.newEvent.id}`, qs.stringify(this.state.newEvent), {
                headers: {
                    "x-access-token": localStorage.getItem('USER_TOKEN'),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
        } catch (err) {
            console.log(err)
        }
        this.props.onHide()
    }

    render() {
        const { refresh, ...rest } = this.props;
        return (
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Evento
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Calendar
                        className='calendar'
                        onChange={this.onChangeDate}
                        value={this.state.startDate}
                    />
                    <Form>
                        <Form.Group>
                            <Form.Label>Horário de início</Form.Label>
                            <Form.Control value={this.state.newEvent.startTime} type="time" onChange={(e) => this.onChange(e, 'startTime')} />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group>
                            <Form.Label>Horário de término</Form.Label>
                            <Form.Control value={this.state.newEvent.endTime} type="time" onChange={(e) => this.onChange(e, 'endTime')} />
                        </Form.Group>
                    </Form>
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control value={this.state.newEvent.description} as="textarea" rows="3" onChange={(e) => this.onChange(e, 'description')} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Cancelar</Button>
                    <Button onClick={this.submit}>Aplicar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditEvent