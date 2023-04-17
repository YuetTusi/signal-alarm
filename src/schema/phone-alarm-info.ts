// {
//     "hash":"39bd662b7942418595c21a1ef0af7fad",
//     "protocolName":"中国电信FDD-LTE",
//     "deviceId":"rs123",
//     "siteName":"中软通二楼111"
// }

class PhoneAlarmInfo {
    /**
     * hash值
     */
    public hash: string = ''
    /**
     * 设备Id
     */
    public deviceId?: string
    /**
     * 地址
     */
    public siteName?: string
    /**
     * 协议名称
     */
    public protocolName?: string
}

export { PhoneAlarmInfo };