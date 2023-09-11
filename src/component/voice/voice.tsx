import alarm from '@/assets/audio/alarm.wav';
import { FC, useEffect, useRef } from 'react';
import { useModel } from '@/model';
import { VoiceBox } from './styled/box';
import { VoiceProp } from './prop';

/**
 * 音频播放
 */
const Voice: FC<VoiceProp> = () => {

    const $audio = useRef<HTMLAudioElement>(null);

    const {
        sound,
        phoneAlarmData
    } = useModel(state => ({
        sound: state.sound,
        phoneAlarmData: state.phoneAlarmData
    }));

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