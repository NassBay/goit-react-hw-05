import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const defaultImg =
  "https://images.unsplash.com/photo-1660305638472-8bc975a82652?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.item}>
          <Link
            className={css.movieTitle}
            to={`/movies/${id}`}
            state={{ from: location }}
          >
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : defaultImg
              } 
              alt="poster"
              className={css.img}
            />
            <p>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
