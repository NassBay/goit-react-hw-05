import Loader from "../../components/Loader/Loader";
import { movieCredits } from "../../movies-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const defaultPoster =
    "https://images.unsplash.com/photo-1660305638472-8bc975a82652?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


  useEffect(() => {
    async function getInfo() {
      try {
        setIsLoading(true);
        const data = await movieCredits(movieId);
        setInfo(data);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getInfo();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>Something went wrong. Try reload</div>}
      {info && info.length > 0 && (
        <ul className={css.list}>
          {info.map(({ cast_id, character, name, profile_path }) => (
            <li className={css.item} key={cast_id}>
              <img
                className={css.img}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : defaultPoster
                }
                alt={name}
              />
              <p className={css.title}>{name}</p>
              <p className={css.title}>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
