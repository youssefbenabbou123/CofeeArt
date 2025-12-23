"use client"

import { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  duration?: "fast" | "normal" | "slow"
}

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = "normal",
}: ScrollAnimationProps) {
  const { ref, isVisible } = useScrollAnimation()

  const durationClass = {
    fast: "duration-500",
    normal: "duration-700",
    slow: "duration-1000",
  }[duration]

  const directionClass = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    fade: "",
  }[direction]

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        durationClass,
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${directionClass}`,
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

