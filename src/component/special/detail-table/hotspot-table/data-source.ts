import { Protocol } from "@/schema/protocol";

export const getTypeSelectSource = () => [
    {
        value: 'all',
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