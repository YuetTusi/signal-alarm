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

/**
 * 返回对应树节点的枚举字串（多个用逗号分割）
 * @param type 树节点值
 */
export const getTypes = (type: string) => {
    switch (type) {
        case 'all':
            return helper.protocolToString([
                Protocol.WiFi24G,
                Protocol.WiFi58G,
                Protocol.Bluetooth50
            ]);
        case 'hotspot':
            return helper.protocolToString([
                Protocol.WiFi24G,
                Protocol.WiFi58G
            ]);
        case 'others':
            return helper.protocolToString([
                Protocol.Bluetooth50
            ]);
        default:
            return type;
    }
};