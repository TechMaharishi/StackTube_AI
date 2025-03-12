import * as Headless from '@headlessui/react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export function Loading({
  show = true,
  className,
  size = 'md',
  color = 'text-zinc-500 dark:text-zinc-400',
  background = 'bg-transparent',
  text,
}: {
  show?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  background?: string;
  text?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <Headless.Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <motion.div
        className={clsx('flex flex-col items-center justify-center h-[82svh] w-full', background, className)}
        aria-live="polite"
        aria-busy={show}
      >
        <motion.div
          className={clsx('flex items-center justify-center', color)}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <svg
            className={clsx('animate-spin', sizeClasses[size])}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0H4z"
            ></path>
          </svg>
        </motion.div>
        {text && (
          <p className={clsx('mt-2 text-sm', color)}>
            {text}
          </p>
        )}
      </motion.div>
    </Headless.Transition>
  );
}