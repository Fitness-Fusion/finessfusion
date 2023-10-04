import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '../utils/consts';
import { login, register } from '../http/userAPI';
import { observer } from "mobx-react-lite"
import { Context } from '../index';


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = async () => {
        try {
            let data
    
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await register(email, password)
            }
    
            user.setUser(data)
            user.setIsAuth(true)
            navigate(DASHBOARD_ROUTE);
        } catch (e) {
            console.error("Error:", e);
            alert(e.response.data.message)
        }
    }
    

    return (
        <Row className="justify-content-center">
            <Col xs={10} md={4}>
                <Card className="my-5 px-5 py-3">
                    <h1 className="m-3 text-center">Sign {isLogin ? "In" : "Up"}</h1>
                    <Form.Group className="my-2">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div className="mt-3 text-center">
                        <p>
                        {isLogin ? "Don't" : "Already"} have an account ? {" "}
                        <NavLink
                            to={isLogin ? REGISTER_ROUTE : LOGIN_ROUTE}
                            size="sm"
                            variant="outline-primary"
                        >
                            Sign {isLogin ? "Up" : "In"}
                        </NavLink>
                        </p>
                        <Button className="btn btn-block" onClick={submit}>
                            Sign {isLogin ? "In" : "Up"}
                        </Button>
                    </div>
                </Card>
            </Col>
        </Row>
    )
})

export default Auth;