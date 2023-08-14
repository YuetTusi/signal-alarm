import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/component/layout';
import Login from '@/view/login';
import Dashboard from '@/view/dashboard';
import Device from '@/view/device';

/**
 * 路由定义 
 */
export const ViewRouter: FC<{}> = () => <Router>
    <Routes>
        <Route
            path="/"
            element={
                <Login />
            } />
        <Route
            path="/dashboard"
            element={
                <Layout>
                    <Dashboard />
                </Layout>
            } />
        <Route
            path="/device"
            element={
                <Layout>
                    <Device />
                </Layout>
            } />
        <Route
            path="*"
            element={
                <Layout>
                    <div>NotFound</div>
                </Layout>
            } />
    </Routes>
</Router>;