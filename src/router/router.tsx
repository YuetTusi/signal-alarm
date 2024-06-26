import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/component/layout';
import Login from '@/view/login';
import Dashboard from '@/view/dashboard';
import SpecialDetail from '@/view/special-detail';
import Device from '@/view/device';
import Zone from '@/view/zone';
import SysUser from '@/view/sys-user';
import WhiteList from '@/view/white-list';
import FakeHotspot from '@/view/fake-hotspot';
import SignalSetInfo from '@/view/signal-setinfo';
import {
    BaseSpectrum,
    Live,
    Past
} from '@/view/spectrum';

/**
 * 路由定义 
 */
export const ViewRouter: FC<{}> = () => <Router>
    <Routes>
        <Route
            path="/"
            element={<Login />} />
        <Route
            path="/dashboard"
            element={
                <Layout>
                    <Dashboard />
                </Layout>
            } />
        <Route
            path="/special-detail/:type"
            element={
                <Layout>
                    <SpecialDetail />
                </Layout>
            }
        />
        <Route
            path="/real-spectrum"
            element={
                <Layout>
                    <Live />
                </Layout>
            }
        />
        <Route
            path="/history-spectrum"
            element={
                <Layout>
                    <Past />
                    {/* <HistorySpectrum /> */}
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
            path="/white-list"
            element={
                <Layout>
                    <WhiteList />
                </Layout>
            }
        />
        <Route
            path="/fake-hotspot"
            element={
                <Layout>
                    <FakeHotspot />
                </Layout>
            }
        />
        <Route
            path="/signal-set-info"
            element={
                <Layout>
                    <SignalSetInfo />
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