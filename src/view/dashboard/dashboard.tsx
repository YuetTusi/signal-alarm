import { FC, useEffect } from "react";
import WapInfo from '@/component/special/wap-info';
import { DashboardBox } from "./styled/box";

const Dashboard: FC<{}> = () => {

    useEffect(() => {

    }, []);

    return <DashboardBox>
        <div className="left-box"></div>
        <div className="center-box"></div>
        <div className="right-box">
            <WapInfo />
        </div>
    </DashboardBox>
};

export { Dashboard };