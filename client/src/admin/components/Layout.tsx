import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Breadcrumb from './Breadcrumb'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function Layout() {
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        <Breadcrumb />
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
