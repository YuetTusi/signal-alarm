import { Protocol } from "@/schema/protocol";
import { helper } from "@/utility/helper";

export const getTypeSelectSource = () => [
    {
        value: 'all',
        title: '全部',
        children: [
            {
                value: 'hotspot',
                title: '热点',
                children: [
                    {
                        value: Protocol.WiFi58G,
                        title: 'WiFi5.8G'
                    }, {
                        value: Protocol.WiFi24G,
                        title: 'WiFi2.4G'
                    }
                ]
            }, {
                value: 'others',
                title: '其他',
                children: [
                    {
                        value: helper.protocolToString([
                            Protocol.Bluetooth50
                        ]),
                        title: '蓝牙5.0'
                    }
                ]
            }
        ]
    }
];