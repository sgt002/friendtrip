import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class AddDestination extends Component {
    constructor(props) {
        super(props);
    }

    addDestination = (event) => {
        event.preventDefault();
        const {
            name,
            description,
            start,
            end,
            address,
        } = event.target.elements;
        const data = {
            tripId: this.props.tripId,
            travelerId: this.props.travelerId,
            destName: name.value,
            destDescription: description.value,
            destCountryCode: 0,
            destStartDate: start.value,
            destEndDate: end.value,
            destAddress: address.value,
        };
        fetch("http://localhost:9000/destination/addDestination", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            this.props.refreshTrip();
            this.props.handleClose();
        });
    }

    updateDestination = () => {

    }

    render() {
        return (
            <Modal
                show={this.props.show}
                dialogClassName="modal-60w"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={this.props.handleClose}
                animation={false}
                centered
            >
                <Form onSubmit={this.addDestination}>
                    <Modal.Body>
                        <h4>{this.props.kind} Destination</h4>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Destination Name</Form.Label>
                                <Form.Control name="name" as="textarea" rows={1} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea2">
                                <Form.Label>Destination Description</Form.Label>
                                <Form.Control name="description" as="textarea" rows={4} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea3">
                                <Form.Label>Start Date (dd/mm/yyyy)</Form.Label>
                                <Form.Control name="start" as="textarea" rows={1} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea4">
                                <Form.Label>End Date (dd/mm/yyyy)</Form.Label>
                                <Form.Control name="end" as="textarea" rows={1} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="exampleForm.ControlTextarea5">
                                <Form.Label>Destination Address</Form.Label>
                                <Form.Control name="address" as="textarea" rows={2} />
                            </Form.Group>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleClose}>Close</Button>
                        <Button variant="success" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default AddDestination;

