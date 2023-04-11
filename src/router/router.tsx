import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/component/layout';
import Login from '@/view/login';
import Dashboard from '@/view/dashboard';

export const ViewRouter: FC<{}> = () =>
    <Router>
        <Routes>
            <Route
                path="/"
                element={
                    <Login />
                }>
            </Route>
            <Route
                path="/dashboard"
                element={
                    <Layout>
                        <Dashboard />
                    </Layout>
                }>
            </Route>
            <Route
                path="*"
                element={
                    <Layout>
                        <div>NotFound</div>
                    </Layout>
                } />
        </Routes>
    </Router>;