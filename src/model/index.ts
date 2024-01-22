import { create, StoreApi } from 'zustand';
import { zustandLog } from '@/utility/zustand-log';
import { reading, ReadingState } from './reading';
import { specialWap, SpecialWapState } from './special-wap';
import { specialHotspot, SpecialHotspotState } from './special-hotspot';
import { specialTerminal, SpecialTerminalState } from './special-terminal';
import { specialCamera, SpecialCameraState } from './special-camera';
import { specialBluetooth, SpecialBluetoothState } from './special-bluetooth';
import { specialWiretap, SpecialWiretapState } from './special-wiretap';
import { specialOthers, SpecialOthersState } from './special-others';
import { alarm, AlarmState } from './alarm';
import { alarmTypeStatis, AlarmTypeStatisState } from './alarm-type-statis';
import { alarmSiteTopStatis, AlarmSiteTopStatisState } from './alarm-site-top-statis';
import { specialTypeStatis, SpecialTypeStatisState } from './special-type-statis';
import { alarmWeekStatis, AlarmWeekStatisState } from './alarm-week-statis';
import { quickCheck, QuickCheckState } from './quick-check';
import { login, LoginState } from './login';
import { phoneAlarm, PhoneAlarmState } from './phone-alarm';
import { device, DeviceState } from './device';
import { specialTop, SpecialTopState } from './special-top';
import { checkReport, CheckReportState } from './check-report';
import { sysMenu, SysMenuState } from './sys-menu';
import { realSpectrum, RealSpectrumState } from './real-spectrum';
import { historySpectrum, HistorySpectrumState } from './history-spectrum';
import { baseSpectrum, BaseSpectrumState } from './base-spectrum';
import { compareSpectrumModal, CompareSpectrumModalState } from './compare-spectrum-modal';
import { sysUser, SysUserState } from './sys-user';
import { sysRole, SysRoleState } from './sys-role';
import { zone, ZoneState } from './zone';
import { bibo, BiboState } from './bibo';
import { whiteList, WhiteListState } from './white-list';
import { alarmChart, AlarmChartState } from './alarm-chart';
import { fakeHotspot, FakeHotspotState } from './fake-hotspot';

interface OtherState {
    [stateName: string]: any
}

/**
 * State tree
 */
type State = OtherState
    & ReadingState
    & LoginState
    & SpecialWapState
    & SpecialHotspotState
    & SpecialTerminalState
    & SpecialCameraState
    & SpecialBluetoothState
    & SpecialWiretapState
    & SpecialOthersState
    & AlarmState
    & AlarmTypeStatisState
    & AlarmSiteTopStatisState
    & SpecialTypeStatisState
    & AlarmWeekStatisState
    & QuickCheckState
    & PhoneAlarmState
    & DeviceState
    & SpecialTopState
    & CheckReportState
    & SysMenuState
    & RealSpectrumState
    & HistorySpectrumState
    & BaseSpectrumState
    & CompareSpectrumModalState
    & SysUserState
    & SysRoleState
    & ZoneState
    & BiboState
    & WhiteListState
    & AlarmChartState
    & FakeHotspotState;

type GetState = StoreApi<State>['getState'];
type SetState = StoreApi<State>['setState'];

/**
 * 使用仓库model
 */
const useModel = create<State>(zustandLog((setState: SetState, getState: GetState) => ({

    ...reading(setState, getState),
    ...login(setState, getState),
    ...specialTop(setState, getState),
    ...specialTypeStatis(setState, getState),
    ...specialWap(setState, getState),
    ...specialHotspot(setState, getState),
    ...specialTerminal(setState, getState),
    ...specialCamera(setState, getState),
    ...specialBluetooth(setState, getState),
    ...specialWiretap(setState, getState),
    ...specialOthers(setState, getState),
    ...alarm(setState, getState),
    ...alarmTypeStatis(setState, getState),
    ...alarmSiteTopStatis(setState, getState),
    ...alarmWeekStatis(setState, getState),
    ...quickCheck(setState, getState),
    ...phoneAlarm(setState, getState),
    ...device(setState, getState),
    ...checkReport(setState, getState),
    ...sysMenu(setState, getState),
    ...realSpectrum(setState, getState),
    ...historySpectrum(setState, getState),
    ...baseSpectrum(setState, getState),
    ...compareSpectrumModal(setState, getState),
    ...sysUser(setState, getState),
    ...sysRole(setState, getState),
    ...zone(setState, getState),
    ...bibo(setState, getState),
    ...whiteList(setState, getState),
    ...alarmChart(setState, getState),
    ...fakeHotspot(setState, getState)
}), false));

export type { State, GetState, SetState };
export { useModel };
export default useModel;