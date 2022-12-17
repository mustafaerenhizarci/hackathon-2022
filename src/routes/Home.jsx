import { ReactComponent as SearchRightIcon } from "../assets/images/icons/search-right.svg";
import MovieCard from "../components/MovieCard";
import Test from "../assets/images/movie-1.png";
import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";
function Home() {
  const [rated, setRated] = useState([]);

  useEffect(() => {
    getTopRated();
  }, []);

  async function getTopRated() {
    const data = await apiCall("/movie/top_rated");
    setRated(data);
    console.log(data);
  }

  return (
    <div className="w-full h-[90vh] py-4 px-5">
      <h1 className="text-left text-lg text-primary font-semibold">What do you want to watch?</h1>
      {/** Search Bar */}
      <div className="mt-10 w-full bg-base-200 h-11 rounded-full flex justify-between items-center relative">
        <input
          className="bg-transparent text-primary text-sm h-full rounded-l-full w-full px-8 outline-none placeholder:text-base-300 focus:placeholder:text-transparent "
          type="text"
          placeholder="Search"
        />
        <SearchRightIcon className="absolute right-8" />
      </div>
      {/** Top Rated Movies */}
      <div className="w-full flex justify-start items-center gap-x-[10%] overflow-x-hidden mt-10 px-5">
        {rated.results?.map((movie,i) => {
          console.log(import.meta.env.VITE_API_IMG + movie.backdrop_path)
          return <MovieCard key={i} image={import.meta.env.VITE_API_IMG + movie.backdrop_path} className="object-cover w-[40%] h-60 bg-center bg-cover"/>
        })}
      </div>
    </div>
  );
}

export default Home;
