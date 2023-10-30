import alarm from '@/assets/audio/alarm.wav';
import { FC, useEffect, useRef } from 'react';
import { useModel } from '@/model';
import { VoiceBox } from './styled/box';
import { VoiceProp } from './prop';
import { StorageKeys } from '@/utility/storage-keys';

/**
 * 音频播放
 */
const Voice: FC<VoiceProp> = () => {

    const $audio = useRef<HTMLAudioElement>(null);

    const {
        sound,
        setSound,
        phoneAlarmData
    } = useModel(state => ({
        sound: state.sound,
        setSound: state.setSound,
        phoneAlarmData: state.phoneAlarmData
    }));

    useEffect(() => {
        const voice = localStorage.getItem(StorageKeys.Voice);
        setSound(voice === '1');
    }, []);

    useEffect(() => {
        //当有报警数据且开启声音，则播放报警音
        if ($audio.current !== null) {
            phoneAlarmData.length > 0 && sound
                ? $audio.current.play()
                : $audio.current.pause();
        }
    }, [phoneAlarmData, sound]);

    return <VoiceBox>
        <audio
            ref={$audio}
            src={alarm}
            autoPlay={sound}
            loop={true} />
    </VoiceBox>
};

export { Voice };