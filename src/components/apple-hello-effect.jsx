
import { motion } from "framer-motion";

const initialProps = {
  pathLength: 0,
  opacity: 0,
};

const animateProps = {
  pathLength: 1,
  opacity: 1,
};

function AppleHelloVietnameseEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}) {
  const calc = (x) => x * speed;

  return (
    <motion.svg
      className={`h-20 ${className || ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1009 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>xin chào</title>

      {/* x1 */}
      <motion.path
        d="M102.233 96.2277C75.6823 127.245 45.1612 158.759 11.4143 190.521"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.3),
          ease: "easeInOut",
          opacity: { duration: 0.15 },
        }}
      />

      {/* x2 */}
      <motion.path
        d="M7.69214 116.575C9.67725 105.16 16.8733 95.7311 28.5358 95.7311C40.4465 95.7311 46.8981 105.408 53.3497 124.019C56.7409 133.283 60.1322 142.547 63.5234 151.81C73.689 179.58 81.1988 191.513 100.855 191.513C128.722 191.513 154.043 159.148 161.595 118.502C162.929 111.321 164.774 103.736 166.043 96.2273"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeInOut",
          delay: calc(0.4),
          opacity: { duration: 0.35, delay: calc(0.4) },
        }}
      />

      {/* i */}
      <motion.path
        d="M166.043 96.2273C163.191 113.101 160.565 126.997 158.92 139.404C157.989 147.592 157.544 154.54 157.596 161.488C157.729 179.354 164.764 191.513 182.695 191.513C209.39 191.513 236.181 159.123 243.73 118.5C245.064 111.321 247.012 103.759 248.139 96.2273"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.5),
          ease: "easeOut",
          delay: calc(1),
          opacity: { duration: 0.25, delay: calc(1) },
        }}
      />

      {/* n1 */}
      <motion.path
        d="M248.139 96.2278C243.424 127.741 239.454 158.759 234.491 190.272"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.3),
          ease: "easeOut",
          delay: calc(1.5),
          opacity: { duration: 0.15, delay: calc(1.5) },
        }}
      />

      {/* n2 */}
      <motion.path
        d="M235.83 181.135C241.293 133.114 262.08 98.0479 288.631 98.0479C304.512 98.0479 314.605 110.703 311.739 128.817C310.125 139.487 308.255 150.405 306.076 163.06C303.537 178.941 310.796 191.348 332.79 191.348C364.865 191.348 399.857 173.523 417.765 145.915C423.866 136.509 426.348 128.073 426.596 119.884C426.844 104.996 418.407 93.8296 403.519 93.8296C384.66 93.8296 370.268 115.17 370.268 142.465C370.268 171.745 386.149 192.341 419.876 192.341C465.734 192.341 516.528 137.292 539.867 75.8585C546.456 58.513 548.928 42.4065 548.928 31.1512C548.928 17.8057 544.71 7.55823 532.799 7.55823C521.137 7.55823 513.445 16.6141 506.497 30.9129C498.356 47.4967 492.335 71.4162 489.871 98.4549C483.668 166.301 497.564 191.348 530.604 191.348C570.668 191.348 615.21 135.534 637.954 75.6686"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(2.4),
          ease: "easeInOut",
          delay: calc(1.8),
          opacity: { duration: 0.6, delay: calc(1.8) },
        }}
      />

      {/* c */}
      <motion.path
        d="M624.161 176.541C610.138 186.208 596.115 191.041 582.092 191.041C554.045 191.041 539.526 172.936 539.526 146.729C539.526 116.536 558.118 94.8219 582.837 94.8219C605.176 94.8219 618.331 109.919 618.331 137.971C618.331 144.176 617.463 150.132 615.725 155.84"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(4.2),
          opacity: { duration: 0.4, delay: calc(4.2) },
        }}
      />

      {/* h3 */}
      <motion.path
        d="M632.748 181.135C638.211 133.114 658.997 98.0479 685.549 98.0479C701.43 98.0479 711.523 110.703 708.657 128.817C707.043 139.487 705.173 150.405 702.994 163.06C700.455 178.941 707.714 191.348 729.708 191.348C761.783 191.348 796.775 173.523 814.683 145.915C820.784 136.509 823.266 128.073 823.514 119.884C823.762 104.996 815.325 93.8296 800.437 93.8296C781.578 93.8296 767.186 115.17 767.186 142.465C767.186 171.745 783.067 192.341 816.794 192.341C862.652 192.341 913.446 137.292 936.785 75.8585C943.374 58.513 945.846 42.4065 945.846 31.1512C945.846 17.8057 941.628 7.55823 929.717 7.55823C918.055 7.55823 910.363 16.6141 903.415 30.9129C895.274 47.4967 889.253 71.4162 886.789 98.4549C880.586 166.301 894.482 191.348 927.522 191.348C956.98 191.348 972.983 165.67 982.577 138.402C992.061 111.447 1003.72 94.8221 1028.04 94.8221"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(2.4),
          ease: "easeInOut",
          delay: calc(5),
          opacity: { duration: 0.6, delay: calc(5) },
        }}
      />

      {/* à */}
      <motion.path
        d="M991.077 176.541C977.054 186.208 963.031 191.041 949.008 191.041C920.961 191.041 906.442 172.936 906.442 146.729C906.442 116.536 925.034 94.8219 949.753 94.8219C972.092 94.8219 985.247 109.919 985.247 137.971C985.247 144.176 984.379 150.132 982.641 155.84"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(6.2),
          opacity: { duration: 0.4, delay: calc(6.2) },
        }}
      />

      {/* o */}
      <motion.path
        d="M1001.27 66.553C986.239 51.239 961.137 31.548 932.659 8.0295C913.275 -14.8512 902.853 -40.9772 902.356 -58.9974C902.108 -72.3964 908.642 -82.5612 920.719 -82.5612"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(7),
          opacity: { duration: 0.4, delay: calc(7) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

function AppleHelloEnglishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}) {
  const calc = (x) => x * speed;

  return (
    <motion.svg
      className={`h-20 ${className || ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 638 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>hello</title>

      {/* h1 */}
      <motion.path
        d="M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          opacity: { duration: 0.4 },
        }}
      />

      {/* h2, ello */}
      <motion.path
        d="M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(2.8),
          ease: "easeInOut",
          delay: calc(0.7),
          opacity: { duration: 0.7, delay: calc(0.7) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

export { AppleHelloEnglishEffect, AppleHelloVietnameseEffect };
