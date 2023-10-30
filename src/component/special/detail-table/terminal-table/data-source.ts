import { Protocol } from "@/schema/protocol";
import { helper } from "@/utility/helper";

export const getTypeSelectSource = () => [
    {
        value: 'all',
        title: '全部',
        children: [
            {
                value: 'hotspot',
                title: '终端',
                children: [
                    {
                        value: Protocol.WiFi58G,
                        title: '终端5.8G'
                    }, {
                        value: Protocol.WiFi24G,
                        title: '终端2.4G'
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
                Protocol.WiFi58G
            ]);
        case 'hotspot':
            return helper.protocolToString([
                Protocol.WiFi24G,
                Protocol.WiFi58G
            ]);
        default:
            return type;
    }
};