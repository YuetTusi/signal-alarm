import alarm from '@/assets/audio/alarm.wav';
import { FC, useEffect, useRef } from 'react';
import { useModel } from '@/model';
import { StorageKeys } from '@/utility/storage-keys';
import { VoiceBox } from './styled/box';
import { VoiceProp } from './prop';

/**
 * 音频播放
 */
const Voice: FC<VoiceProp> = () => {

    const $audio = useRef<HTMLAudioElement>(null);

    const {
        sound
    } = useModel(state => ({
        sound: state.sound
    }));

    useEffect(() => {
        //当有报警数据且开启声音，则播放报警音
        if ($audio.current === null) {
            return;
        }
        const on = localStorage.getItem(StorageKeys.Voice) === '1';
        if (on && sound) {
            $audio.current.play();
        } else {
            $audio.current.pause();
        }
    }, [sound]);

    return <VoiceBox>
        <audio
            ref={$audio}
            src={alarm}
            autoPlay={false}
            loop={true} />
    </VoiceBox>
};

export { Voice };