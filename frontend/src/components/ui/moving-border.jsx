import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const MovingBorderButton = ({
  borderRadius = "1.75rem",
  children,
  className,
  containerClassName,
  borderClassName,
  duration = 2000,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        "bg-transparent relative text-xl h-16 w-40 p-[1px] overflow-hidden",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      onClick={onClick}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <motion.div
          className={cn(
            "h-full w-full absolute inset-0 rounded-full",
            "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500",
            borderClassName
          )}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased font-medium",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </button>
  );
};
