import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function MovieCard({ image, className }) {
  const navigate = useNavigate();

  return (
    <motion.img
      onClick={() => {
        navigate(`/${image.id}-movie`);
      }}
      animate={{ translateY: [-5, 0] }}
      src={import.meta.env.VITE_API_IMG + image.poster_path}
      className={className + " rounded-3xl "}
    />
  );
}

export default MovieCard;
