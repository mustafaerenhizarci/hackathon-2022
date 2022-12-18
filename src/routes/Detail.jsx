import { ReactComponent as ArrowLeftIcon } from "../assets/images/icons/arrow-left.svg";
import { ReactComponent as TopBarRightIcon } from "../assets/images/icons/top-bar-right.svg";
import { ReactComponent as ClockIcon } from "../assets/images/icons/clock.svg";
import { ReactComponent as CalendarIcon } from "../assets/images/icons/calendar.svg";
import { ReactComponent as TicketIcon } from "../assets/images/icons/ticket.svg";

import { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import apiCall from "../utils/apiCall";
import MovieCard from "../components/MovieCard";

function Detail() {
  const navigate = useNavigate();
  const id = useParams().id;
  const [movie, setMovie] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [cast, setCast] = useState([]);

  const AboutMovie = () => {
    return <h1 className=" font-normal text-xs px-4">{movie.overview}</h1>;
  };

  const Reviews = ({ reviews }) => {
    return <div>reviews</div>;
  };

  const Cast = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {cast.map((c) => {
          return (
            <>
              <img className="rounded-full" src={import.meta.env.VITE_API_IMG + c.profile_path} />
            </>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getMovie(id);
    getCast();
  }, []);

  async function getMovie(id) {
    const data = await apiCall("/movie/" + id);
    console.log(data);
    setMovie(data);
  }

  async function getCast() {
    const data = await apiCall("/movie/" + id + "/credits");
    setCast(data.cast);
  }

  return (
    <div className="w-full h-[100vh] py-8">
      {/** Header */}
      <div className="flex justify-between items-center px-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <h1 className="text-center text-primary text-base font-medium font-montserrat">Search</h1>
        <button onClick={() => navigate(-1)}>
          <TopBarRightIcon />
        </button>
      </div>
      {/** Top */}
      <div className="mt-10 w-full relative">
        <img
          className="h-[40vh] w-full object-cover"
          src={import.meta.env.VITE_API_IMG + movie.backdrop_path}
          alt="backdrop"
        />
        <div className="flex justify-center items-end absolute -bottom-20 left-[10%] w-3/4 gap-x-2">
          <MovieCard className="w-32" image={movie} />
          <h1 className="mb-2 text-primary text-lg font-semibold text-left">
            {movie.original_title}
          </h1>
        </div>
      </div>
      {/** Middle */}
      <div className="mt-28 flex justify-center items-center gap-x-4">
        <div className="flex justify-center items-center gap-x-2 text-base-300">
          <CalendarIcon />
          <h1 className="text-xs">{movie && new Date(movie.release_date).getFullYear()}</h1>
        </div>

        <div className="flex justify-center items-center gap-x-2 text-base-300">
          <ClockIcon />
          <h1 className="text-xs">148 Minutes</h1>
        </div>

        <div className="flex justify-center items-center gap-x-2 text-base-300">
          <TicketIcon />
          <h1 className="text-xs">Action</h1>
        </div>
      </div>
      {/** Bottom Tabs */}
      <div className="mt-10 tabs justify-center flex-nowrap overflow-x-auto w-full pb-8 hide-scrollbar font-normal">
        <button
          onClick={() => {
            setActiveTab(0);
          }}
          className={`tab text-primary whitespace-nowrap tab-bordered border-transparent ${
            activeTab === 0 && "tab-active font-medium"
          }`}
        >
          About Movie
        </button>

        <button
          onClick={() => {
            setActiveTab(1);
          }}
          className={`tab text-primary whitespace-nowrap tab-bordered border-transparent ${
            activeTab === 1 && "tab-active font-medium"
          }`}
        >
          Reviews
        </button>

        <button
          onClick={() => {
            setActiveTab(2);
          }}
          className={`tab text-primary whitespace-nowrap tab-bordered border-transparent ${
            activeTab === 2 && "tab-active font-medium"
          }`}
        >
          Cast
        </button>
      </div>
      <div>{activeTab === 0 ? <AboutMovie /> : activeTab === 1 ? <Reviews /> : <Cast />}</div>
    </div>
  );
}

export default Detail;
