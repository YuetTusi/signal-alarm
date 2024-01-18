import { ComDevice } from "@/schema/com-device";

/**
 * 转为Select组件数据
 * @param devices 设备数据
 * @param useAll 增加全部选项
 */
export const toSelectData = (devices: ComDevice[], useAll = false) => {
    let set = new Set(devices.map(i => i.siteName));
    let data: any[] = [];
    if (devices.length === 0) {
        return [];
    }
    for (let [, v] of set.entries()) {
        const devInSite = devices.filter(i => i.siteName === v);
        if (devInSite.length !== 0) {
            data.push({
                label: v ?? '-',
                value: JSON.stringify({ type: 'site', deviceId: devInSite.map(i => i.deviceId) }),
                options: devInSite.map(j => ({
                    label: j.deviceName,
                    value: j.deviceId//JSON.stringify({ type: 'device', deviceId:  })
                }))
            });
        }
    }

    if (useAll) {
        data.unshift({ label: '全部', value: '-1' });
    }

    return data
};
