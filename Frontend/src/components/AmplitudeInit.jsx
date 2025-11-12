// Frontend/src/components/AmplitudeInit.jsx
import { useEffect } from 'react';
import { initAmplitude } from '../lib/amplitude';

export default function AmplitudeInit() {
    useEffect(() => {
        initAmplitude();
    }, []);

    return null;
}