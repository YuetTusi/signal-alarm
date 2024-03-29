//IP地址
export const IP = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
//端口号（0-32768）
export const Port = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
//密码
export const UserPassword = /.{6,}/;
//MAC地址
export const Mac = /([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/
//数字
export const Num = /\d+/
