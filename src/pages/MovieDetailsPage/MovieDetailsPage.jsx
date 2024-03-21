import Loader from "../../components/Loader/Loader";
import { movieDetails } from "../../movies-api";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function MovieDetails() {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");
  const { movieId } = useParams();
  const defaultImg =
    "https://images.unsplash.com/photo-1660305638472-8bc975a82652?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getMovieById() {
      try {
        setIsLoading(true);
        const data = await movieDetails(movieId);
        setInfo(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieById();
  }, [movieId]);

  return (
    <>
      <Link className={css.goBackBtn} to={backLink.current}>
        <FaArrowLeftLong />
        <p>Go back</p>
      </Link>
      {isLoading && <Loader />}
      {error && <div>Something went wrong. Try reload</div>}
      {info && (
        <div className={css.wraper}>
          <div className={css.div}>
            <div className={css.imgWrap}>
              <img
                src={
                  info.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${info.poster_path}`
                    : defaultImg
                }
                width={250}
                alt="poster"
              />
            </div>
            <div className={css.wrap}>
              <h3 className={css.title}>{info.title}</h3>
              <p className={css.itemText}>
                User score: {Math.round(info.vote_average * 10)}%
              </p>
              <h4 className={css.itemTitle}>Overview</h4>
              <p className={css.itemText}>{info.overview}</p>
              <h4 className={css.itemTitle}>Genres</h4>
              <p className={css.itemText}>
                {info.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>

          <div className={css.infoWrap}>
            <h4 className={css.infoTitle}>Additional information</h4>
            <ul className={css.infoList}>
              <li>
                <NavLink className={css.infoItem} to="cast">
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink className={css.infoItem} to="reviews">
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Suspense fallback={<div>Loading info... Pls w8</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
