// Icons
import { ReactComponent as ArrowLeftIcon } from "../assets/images/icons/arrow-left.svg";
import { ReactComponent as InfoCircleIcon } from "../assets/images/icons/info-circle.svg";
import { ReactComponent as SearchRightIcon } from "../assets/images/icons/search-right.svg";
import { ReactComponent as StarIcon } from "../assets/images/icons/star.svg";
import { ReactComponent as ClockIcon } from "../assets/images/icons/clock.svg";
import { ReactComponent as CalendarIcon } from "../assets/images/icons/calendar.svg";
import { ReactComponent as TicketIcon } from "../assets/images/icons/ticket.svg";
import { ReactComponent as NoResultIcon } from "../assets/images/no-result.svg";

import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const NoResult = () => {
  return (
    <div className="mt-32 text-center w-1/2 mx-auto flex flex-col justify-center items-center">
      <NoResultIcon />
      <h1 className="mt-5 font-montserrat font-semibold text-[#EBEBEF]">
        We Are Sorry, We Can Not Find The Movie :(
      </h1>
      <p className="mt-2 text-xs text-[#92929D] font-montserrat font-medium">
        Find your movie by Type title,categories,years,etc
      </p>
    </div>
  );
};

function Search() {
  const navigate = useNavigate();
  const [results, setResults] = useState([0]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function searchMovie(query) {
    const uri =
      import.meta.env.VITE_API_URL +
      "/search/movie" +
      "?api_key=" +
      import.meta.env.VITE_API_TOKEN +
      "&query=" +
      query;

    const data = await axios.get(uri);
    setResults(data.data.results);

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }

  useEffect(() => {
    query !== "" ? searchMovie(query) : setResults([0]);
  }, [query]);

  return (
    <div className="w-full h-[100vh] py-8 px-3">
      {/** Header */}
      <div className="flex justify-between items-center px-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <h1 className="text-center text-primary text-base font-medium font-montserrat">Search</h1>
        <button onClick={() => navigate(-1)}>
          <InfoCircleIcon />
        </button>
      </div>

      {/** Search Bar */}
      <div className="mt-10 w-full bg-base-200 h-11 rounded-full flex justify-between items-center relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-primary text-sm h-full rounded-l-full w-full px-6 outline-none placeholder:text-base-300 focus:placeholder:text-transparent "
          type="text"
          placeholder="Search"
        />
        <SearchRightIcon className="absolute right-5" />
      </div>
      {/** Results */}
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <ThreeDots
            height="80"
            width="50"
            radius="9"
            color="#FF8700"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : results.length === 0 ? (
        <NoResult />
      ) : (
        <div className="mt-10 flex flex-col justify-center items-start gap-y-4 pb-20">
          {results.map((movie, i) => {
            return (
              movie.poster_path && (
                <div key={i} className="w-full flex h-60 justify-center items-start">
                  <MovieCard className="w-1/3" image={movie} />
                  <div className="w-1/2 flex flex-col items-start px-2">
                    <h1 className="w-full text-primary text-left py-2">{movie.original_title}</h1>
                    <div className="flex justify-center items-center gap-x-1 mt-10">
                      <StarIcon />
                      <h6 className="text-accent text-xs">{movie.vote_average}</h6>
                    </div>

                    <div className="text-primary flex justify-center items-center gap-x-1 mt-2">
                      <TicketIcon />
                      <h6 className="text-xs">Action</h6>
                    </div>

                    <div className="text-primary flex justify-center items-center gap-x-1 mt-2">
                      <CalendarIcon />
                      <h6 className="text-xs">{new Date(movie.release_date).getFullYear()}</h6>
                    </div>

                    <div className="flex justify-center items-center gap-x-1 mt-2 text-primary">
                      <ClockIcon />
                      <h6 className="text-xs">139 Minutes</h6>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
