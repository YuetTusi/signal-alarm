import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/component/layout';
import Login from '@/view/login';
import Dashboard from '@/view/dashboard';
import Device from '@/view/device';
import Zone from '@/view/zone';
import SysUser from '@/view/sys-user';
import {
    RealSpectrum,
    HistorySpectrum,
    BaseSpectrum
} from '@/view/spectrum';

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
            path="/real-spectrum"
            element={
                <Layout>
                    <RealSpectrum />
                </Layout>
            }
        />
        <Route
            path="/history-spectrum"
            element={
                <Layout>
                    <HistorySpectrum />
                </Layout>
            }
        />
        <Route
            path="/base-spectrum"
            element={
                <Layout>
                    <BaseSpectrum />
                </Layout>
            }
        />
        <Route
            path="/device"
            element={
                <Layout>
                    <Device />
                </Layout>
            } />
        <Route
            path="/zone"
            element={
                <Layout>
                    <Zone />
                </Layout>
            }
        />
        <Route
            path="/sys-user"
            element={
                <Layout>
                    <SysUser />
                </Layout>
            }
        />
        <Route
            path="*"
            element={
                <Layout>
                    <div>NotFound</div>
                </Layout>
            } />
    </Routes>
</Router>;