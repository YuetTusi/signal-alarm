// {
//     "hash":"39bd662b7942418595c21a1ef0af7fad",
//     "protocolName":"中国电信FDD-LTE",
//     "deviceId":"rs123",
//     "siteName":"中软通二楼111"
// }

class PhoneAlarmInfo {
    /**
     * 唯一id(前端用)
     */
    public id: string = ''
    /**
     * hash值
     */
    public hash: string = ''
    /**
     * UserID
     */
    public userId: string = ''
    /**
     * 消息（JSON格式串）
     */
    public message: string = ''
}

export { PhoneAlarmInfo };