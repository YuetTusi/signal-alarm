import { Locate } from "@/schema/locate";
import { PointLocateState } from ".";
import { GetState, SetState } from "..";

const pointLocate = (setState: SetState, getState: GetState): PointLocateState => ({

    /**
     * 多点定位数据
     */
    pointLocates: [],
    /**
     * 更新多点定位数据
     */
    appendPointLocate(payload: Locate) {
        const prev = getState().pointLocates;
        const next = prev.concat({
            ...payload,
            actionTime: new Date().getTime()
        });
        setState({ pointLocates: next });
    },
    /**
     * 删除某时刻的点
     * @param time 时间值
     */
    removePointByTime(time: number) {
        const next = getState()
            .pointLocates
            .filter(item => item.actionTime !== time);
        setState({ pointLocates: next });
    }
});

export { pointLocate };