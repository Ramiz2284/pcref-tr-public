import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <BeatLoader size={20} color="#123abc" />
        </div>
    );
};

export default Loader;

