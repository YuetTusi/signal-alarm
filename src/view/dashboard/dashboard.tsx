import { FC, memo } from "react";
import WapInfo from "@/component/special/wap-info";
import { AlarmInfo } from '@/component/alarm';
import { AlarmTypeChart, AlarmSiteTopChart, SpecialTypeChart } from '@/component/statis';
import { DashboardBox } from "./styled/box";

const Dashboard: FC<{}> = memo(() => {

    return <DashboardBox>
        <div className="left-box">
            <AlarmSiteTopChart />
            <AlarmTypeChart />
            <SpecialTypeChart />
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
});

export { Dashboard };