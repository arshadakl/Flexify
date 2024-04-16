import { Variants } from "framer-motion";

type Direction = 'up' | 'down' | 'left' | 'right';

export const fadeIn = (direction: Direction, delay: number): Variants => {
    return {
        hidden: {
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            opacity: 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.4,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            }
        }
    };
};
