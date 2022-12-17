import { motion } from "framer-motion";

function MovieCard({ image, className }) {
  return (
    <motion.img
      animate={{ translateY: [-5, 0] }}
      src={import.meta.env.VITE_API_IMG + image}
      className={className + " rounded-3xl "}
    />
  );
}

export default MovieCard;
