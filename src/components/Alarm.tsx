import { useEffect, useRef } from "react";

export type AlarmHandle = {
    play: () => void;
    stop: () => void;
};

type AlarmProps = {
    alarmRef: React.RefObject<AlarmHandle | null>;
};

export const Alarm = ({ alarmRef }: AlarmProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (alarmRef) {
            alarmRef.current = {
                play: () => {
                    if (audioRef.current) {
                        audioRef.current.loop = true;
                        audioRef.current.volume = 0.75;
                        audioRef.current.currentTime = 0;
                        audioRef.current.play();
                    }
                },
                stop: () => {
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                }
            };
        }
    }, [alarmRef]);

    return (
        <audio ref={audioRef}>
            <source src="/alarm.mp3" type="audio/mpeg" />
        </audio>
    );
};
