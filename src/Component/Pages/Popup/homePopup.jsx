import React from 'react';
import style from './Popup.module.sass';

function Popup({ isOpen, onClose, children }) {
    return (
        <>
            {isOpen && (
                <div className={style.popup}>
                    <div className={style.popupContent}>
                        {children}
                        <button className={style.closeBtn} onClick={onClose}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Popup;
