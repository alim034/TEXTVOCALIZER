import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const HeroParallax = ({
  products,
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={cn("relative h-[50rem] overflow-hidden", className)}>
      <Header title={title} subtitle={subtitle} />
      <ProductGrid products={products} />
    </div>
  );
};

const Header = ({ title, subtitle }) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-7xl font-bold dark:text-white text-center"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200 text-center mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

const ProductGrid = ({ products }) => {
  const firstRow = products?.slice(0, 5) || [];
  const secondRow = products?.slice(5, 10) || [];
  const thirdRow = products?.slice(10, 15) || [];
  
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <motion.div
        className="flex gap-4 -ml-20"
        animate={{
          translateX: [0, -200, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {firstRow.map((product, idx) => (
          <ProductCard product={product} key={idx} />
        ))}
      </motion.div>
      <motion.div
        className="flex gap-4 -ml-40 mt-8"
        animate={{
          translateX: [-200, 0, -200],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {secondRow.map((product, idx) => (
          <ProductCard product={product} key={idx} />
        ))}
      </motion.div>
      <motion.div
        className="flex gap-4 -ml-60 mt-8"
        animate={{
          translateX: [0, -200, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {thirdRow.map((product, idx) => (
          <ProductCard product={product} key={idx} />
        ))}
      </motion.div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{
        y: -20,
      }}
      className="group/product h-60 w-80 relative flex-shrink-0"
    >
      <div className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail || '/api/placeholder/400/300'}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
          alt={product.title}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
