import { FC, useEffect } from "react";
import WapInfo, { TopTable } from '@/component/special/wap-info';
import { getProtocolLabel, Protocol } from "@/schema/protocol";
import { helper } from "@/utility/helper";

const Dashboard: FC<{}> = () => {

    useEffect(() => {

    }, []);

    return <div>
        <h1>Dashboard</h1>
        <WapInfo />
    </div>
};

export { Dashboard };