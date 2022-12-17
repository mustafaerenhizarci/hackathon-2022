import { ReactComponent as HomeIcon } from "../../assets/images/icons/home.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/icons/search.svg";
import { ReactComponent as SavedIcon } from "../../assets/images/icons/saved.svg";
import { Link, useLocation } from "react-router-dom";

function Navigator() {
  const location = useLocation().pathname;

  return (
    <div className="h-[10vh] border-t border-info bg-base-200 w-full flex justify-around items-center">
      <Link to="/">
        <HomeIcon className={`${location === "/" && "active-route"}`} />
      </Link>
      <Link to="/search">
        <SearchIcon className={`${location === "/search" && "active-route"}`} />
      </Link>
      <Link to="/saved">
        <SavedIcon className={`${location === "/saved" && "active-route"}`} />
      </Link>
    </div>
  );
}

export default Navigator;
