import { ReactComponent as SearchRightIcon } from "../assets/images/icons/search-right.svg";
import MovieCard from "../components/MovieCard";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";
import { Link } from "react-router-dom";

function Home() {
  const [rated, setRated] = useState([]);
  const [collection, setCollection] = useState([]);
  const [activeTab, setActiveTab] = useState("Now Playing");
  const [isLoading, setIsLoading] = useState(true);

  const endPoints = {
    "Now Playing": "/movie/now_playing",
    Upcoming: "/movie/upcoming",
    "Top Rated": "/movie/top_rated",
    Popular: "/movie/popular",
  };

  useEffect(() => {
    getMostRated();
    getCollection(endPoints["Now Playing"]);
  }, []);

  async function getMostRated() {
    const data = await apiCall("/movie/top_rated");
    setRated(data);
  }

  async function getCollection(endpoint) {
    setIsLoading(true);
    const data = await apiCall(endpoint);
    setCollection(data);
    console.log(collection);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }

  return (
    <div className="w-full h-[100vh] py-8 px-3">
      <h1 className="text-left text-lg text-primary font-semibold ">What do you want to watch?</h1>
      {/** Search Bar */}
      <Link
        to="/search"
        className="mt-10 w-full bg-base-200 h-11 rounded-full flex justify-between items-center relative"
      >
        <input
          className="bg-transparent text-primary text-sm h-full rounded-l-full w-full px-6 outline-none placeholder:text-base-300 focus:placeholder:text-transparent "
          type="text"
          placeholder="Search"
        />
        <SearchRightIcon className="absolute right-5" />
      </Link>
      {/** Top Rated Movies */}
      <div className=" flex justify-start gap-x-[10%] items-center relative overflow-x-auto mt-10 pl-4 pb-8 hide-scrollbar">
        {rated.results?.map((movie, i) => {
          return (
            <MovieCard key={i} image={movie.poster_path} className="w-[48%] h-52 object-cover" />
          );
        })}
      </div>
      {/** Movie Tabs */}
      <div className="tabs flex-nowrap overflow-x-auto w-full pb-8 hide-scrollbar font-normal">
        <button
          onClick={(e) => {
            getCollection(endPoints[e.currentTarget.textContent]);
            setActiveTab("Now Playing");
          }}
          className={`tab text-primary whitespace-nowrap tab-bordered border-transparent ${
            activeTab === "Now Playing" && "tab-active font-medium"
          }`}
        >
          Now Playing
        </button>
        <button
          onClick={(e) => {
            getCollection(endPoints[e.currentTarget.textContent]);
            setActiveTab("Upcoming");
          }}
          className={`tab text-primary whitespace-nowrap tab-bordered border-transparent ${
            activeTab === "Upcoming" && "tab-active font-medium"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={(e) => {
            getCollection(endPoints[e.currentTarget.textContent]);
            setActiveTab("Top Rated");
          }}
          className={`tab text-primary whitespace-nowrap tab-bordered border-transparent ${
            activeTab === "Top Rated" && "tab-active font-medium"
          }`}
        >
          Top Rated
        </button>
        <button
          onClick={(e) => {
            getCollection(endPoints[e.currentTarget.textContent]);
            setActiveTab("Popular");
          }}
          className={`tab text-primary whitespace-nowrap tab-bordered border-transparent ${
            activeTab === "Popular" && "tab-active font-medium"
          }`}
        >
          Popular
        </button>
      </div>

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
      ) : (
        <div className="grid grid-cols-3 gap-3 px-4 pb-[15vh]">
          {collection.results?.map((movie, i) => {
            return <MovieCard key={i} image={movie.poster_path} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
