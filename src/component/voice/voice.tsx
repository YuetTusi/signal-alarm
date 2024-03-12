import alarm from '@/assets/audio/alarm.wav';
import { FC, useEffect, useRef } from 'react';
import { useModel } from '@/model';
import { helper } from '@/utility/helper';
import { AlarmType } from '@/schema/conf';
import { AlarmMessage } from '@/schema/phone-alarm-info';
import { VoiceBox } from './styled/box';
import { VoiceProp } from './prop';

const { alarmType } = helper.readConf();

/**
 * 音频播放
 */
const Voice: FC<VoiceProp> = () => {

    const $audio = useRef<HTMLAudioElement>(null);

    const {
        sound,
        devicesOnMap,
        alarmsOfDevice,
        phoneAlarmData
    } = useModel(state => ({
        sound: state.sound,
        devicesOnMap: state.devicesOnMap,
        alarmsOfDevice: state.alarmsOfDevice,
        phoneAlarmData: state.phoneAlarmData
    }));

    useEffect(() => {
        if ($audio.current === null) {
            return;
        }

        if (sound) {
            if (alarmType === AlarmType.Single) {
                //非地图版，有报警就播放声音
                if (phoneAlarmData.length > 0) {
                    $audio.current.play();
                } else {
                    $audio.current.pause();
                }
            } else {
                //地图版，当前地图下的设备有报警，播放声音
                let has = false;
                if (alarmsOfDevice === undefined) {
                    has = false;
                } else {
                    for (let i = 0; i < devicesOnMap.length; i++) {
                        const { deviceId } = devicesOnMap[i];
                        if (alarmsOfDevice[deviceId] && alarmsOfDevice[deviceId].length > 0) {
                            has = true;
                            break;
                        }
                    }
                }

                if (has) {
                    $audio.current.play();
                } else {
                    $audio.current.pause();
                }
            }
        } else {
            $audio.current.pause();
        }

    }, [sound, phoneAlarmData, devicesOnMap]);

    // useEffect(() => {
    //     console.clear();
    //     console.log('Voice Effect...');
    //     if ($audio.current === null) {
    //         return;
    //     }
    //     const on = localStorage.getItem(StorageKeys.Voice) === '1';

    //     console.log(sound);
    //     if (sound) {
    //         //开关打开且配置允许播放，则播放报警音
    //         $audio.current.play();
    //     } else {
    //         $audio.current.pause();
    //     }
    // }, [sound]);

    return <VoiceBox>
        <audio
            ref={$audio}
            src={alarm}
            loop={true}
            autoPlay={false} />
    </VoiceBox>
};

export { Voice };