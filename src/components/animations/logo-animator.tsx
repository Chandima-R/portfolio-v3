"use client";

import {motion} from "framer-motion";

export const  LogoAnimator = ()=> {
    return (
        <motion.svg
            width="140"
            height="140"
            viewBox="0 0 120 120"
            fill="none"
            initial="hidden"
            animate="visible"
        >
            {/* Top node */}
            <motion.circle
                cx="60"
                cy="22"
                r="3.5"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            />

            {/* Left curve */}
            <motion.path
                d="M60 22 C60 42, 38 58, 28 78 C24 86, 26 92, 32 96"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Right curve */}
            <motion.path
                d="M60 22 C60 42, 82 58, 92 78 C96 86, 94 92, 88 96"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            />

            {/* Bottom curve */}
            <motion.path
                d="M40 98 C50 104, 70 104, 80 98"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                pathLength={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />
        </motion.svg>
    );
}
