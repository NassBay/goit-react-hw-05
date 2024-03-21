import css from "./SearchForm.module.css";
import { CiSearch } from "react-icons/ci";

export const SearchForm = ({ onHandleSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.currentTarget;
    onHandleSubmit(input.elements.text.value);
    input.reset();
  };

    return (
      <div className={css.container}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="text"
            placeholder="Enter movie name"
          />
          <button className={css.btn} type="submit">
            <CiSearch size={20} />
          </button>
        </form>
      </div>
    );
};
