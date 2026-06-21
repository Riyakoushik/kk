import React from 'react';
import { motion } from 'framer-motion';

export function InfiniteMarquee({
    items,
    speed = 20,
    className,
    itemClassName
}) {
    return (
        <div className={`relative flex overflow-hidden w-full ${className || ''}`}>
            <motion.div
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap shrink-0"
            >
                <div className={`flex shrink-0 items-center ${itemClassName || ''}`}>
                    {items}
                </div>
                <div className={`flex shrink-0 items-center ${itemClassName || ''}`}>
                    {items}
                </div>
            </motion.div>
        </div>
    );
}
