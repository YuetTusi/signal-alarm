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

    const { phoneAlarmData } = useModel(state => ({
        phoneAlarmData: state.phoneAlarmData
    }));

    useEffect(() => {
        //当有报警数据，播放报警音
        if ($audio.current !== null) {
            phoneAlarmData.length === 0 ? $audio.current.pause() : $audio.current.play();
        }
    }, [phoneAlarmData]);

    return <VoiceBox>
        <audio
            ref={$audio}
            src={alarm}
            autoPlay={false}
            loop={true} />
    </VoiceBox>
};

export { Voice };