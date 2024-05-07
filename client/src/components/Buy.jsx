import { ethers } from "ethers";
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import React, { useState } from 'react';



const Buy = ({ state, onTransactionSuccess }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const buyChai = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const { contract } = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        const amount = ethers.parseEther("0.0001");
        const transaction = await contract.buyChai(name, message, { value: amount });

        await transaction.wait();
        setIsLoading(false);
        setShowAlert(true);
        // window.location.reload();
    }

    return (
        <div className="full-width-container">
            <Form onSubmit={buyChai} className="buy-form">
                <Form.Group as={Row} controlId="name" className="mb-3">
                    <Form.Label column sm={2}>
                        Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" required placeholder="Enter your name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="message" className="mb-3">
                    <Form.Label column sm={2}>
                        Message
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" required placeholder="Write a message with your coffee" />
                    </Col>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" disabled={!state.contract} style={{ backgroundColor: '#CD7F32', width: '100px' }}>
                        {isLoading ? (
                            <>
                                <Spinner animation="border" size="sm" /> Loading...
                            </>
                        ) : (
                            "Pay"
                        )}
                    </Button>
                </div>
                {showAlert && (
                    <SweetAlert
                        success
                        title="Transaction Successful!"
                        onConfirm={() => {
                            onTransactionSuccess();
                            setShowAlert(false);
                        }}
                    />
                )}
            </Form>
        </div>

    );
}

export default Buy;