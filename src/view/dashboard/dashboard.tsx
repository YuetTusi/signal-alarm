import { FC } from "react";
import WapInfo from "@/component/special/wap-info";
import { AlarmInfo } from '@/component/alarm';
import { AlarmTypeChart, AlarmSiteTopChart } from '@/component/statis';
import { DashboardBox } from "./styled/box";

const Dashboard: FC<{}> = () => {

    return <DashboardBox>
        <div className="left-box">
            <AlarmSiteTopChart />
            <AlarmTypeChart />
        </div>
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