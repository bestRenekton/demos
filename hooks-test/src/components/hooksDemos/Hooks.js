import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { useHover } from '../Hooks/index'





export default function App() {
    const [hoverRef, isHovered] = useHover();

    return (
        <div ref={hoverRef}>
            {isHovered ? '1111' : '222'}
        </div>
    );
}
