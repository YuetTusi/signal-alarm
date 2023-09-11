import { FC } from "react";
import { helper } from "@/utility/helper";
import { SpecialBase } from "@/schema/special-base";
import { getProtocolLabel } from "@/schema/protocol";
import { SpiTab } from "../wap-info/prop";
import { NoWarpLabel } from "@/component/panel/panel";

/**
 * 渲染内容
 */
const ContentLabel: FC<{ type: SpiTab, data: SpecialBase }> = ({ type, data }) => {

    const getText = () => {
        switch (type) {
            case SpiTab.All:
                return <NoWarpLabel width={330}>
                    {
                        helper.isNullOrUndefined(data?.siteName) || data?.siteName === ''
                            ? '-'
                            : data.siteName
                    }
                </NoWarpLabel>;
            case SpiTab.Signal:
            case SpiTab.Camera:
            case SpiTab.Wiretap:
            case SpiTab.Others:
                return <NoWarpLabel width={330}>
                    {
                        helper.isNullOrUndefined(data?.siteName) || data?.siteName === ''
                            ? '-'
                            : data.siteName
                    }
                </NoWarpLabel>;
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