import { Protocol } from "@/schema/protocol";
import { helper } from "@/utility/helper";

export const getTypeSelectSource = () => [
    {
        value: helper.protocolToString([
            Protocol.WiFi58G,
            Protocol.WiFi24G
        ]),
        title: '全部',
        children: [
            {
                value: Protocol.WiFi58G,
                title: 'WiFi5.8G'
            }, {
                value: Protocol.WiFi24G,
                title: 'WiFi2.4G'
            }
        ]
    }
];