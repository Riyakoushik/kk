'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InfiniteMarqueeProps {
    items: React.ReactNode[];
    speed?: number;
    className?: string;
    itemClassName?: string;
}

export function InfiniteMarquee({
    items,
    speed = 20,
    className,
    itemClassName
}: InfiniteMarqueeProps) {
    return (
        <div className={cn("relative flex overflow-hidden w-full", className)}>
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
                <div className={cn("flex shrink-0 items-center", itemClassName)}>
                    {items}
                </div>
                <div className={cn("flex shrink-0 items-center", itemClassName)}>
                    {items}
                </div>
            </motion.div>
        </div>
    );
}
