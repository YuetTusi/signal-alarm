import { FC } from "react";
import { helper } from "@/utility/helper";
import { SpecialBase } from "@/schema/special-base";
import { getProtocolLabel } from "@/schema/protocol";
import { SpiTab } from "../wap-info/prop";

/**
 * 渲染内容
 */
const ContentLabel: FC<{ type: SpiTab, data: SpecialBase }> = ({ type, data }) => {

    const getText = () => {
        switch (type) {
            case SpiTab.All:
                return helper.isNullOrUndefined((data as any)?.protocolName) || (data as any)?.protocolName === ''
                    ? '-'
                    : (data as any)?.protocolName;
            case SpiTab.Signal:
            case SpiTab.Camera:
            case SpiTab.Others:
                return helper.isNullOrUndefined((data as any)?.protocolName) || (data as any)?.protocolName === ''
                    ? '-'
                    : (data as any)?.protocolName;
            case SpiTab.Hotspot:
                return helper.isNullOrUndefined((data as any)?.ssid) || (data as any)?.ssid === ''
                    ? '-'
                    : (data as any)?.ssid;
            case SpiTab.Terminal:
                return getProtocolLabel(data.protocolType)
        }
    };

    return <div>{getText()}</div>
};

export { ContentLabel };