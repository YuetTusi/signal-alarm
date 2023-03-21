import { FC, useEffect } from "react";
import WapInfo from "@/component/special/wap-info";
import { AlarmInfo } from '@/component/alarm';
import { DashboardBox } from "./styled/box";

const Dashboard: FC<{}> = () => {

    useEffect(() => {

    }, []);

    return <DashboardBox>
        <div className="left-box"></div>
        <div className="center-box">
            <div className="bottom-box">
                <AlarmInfo />
            </div>
        </div>
        <div className="right-box">
            <WapInfo />
        </div>
    </DashboardBox>
};

export { Dashboard };