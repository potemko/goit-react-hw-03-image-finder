import { Component } from "react";
import { toast } from 'react-toastify';
import css from "./Searchbar.module.css"
import 'react-toastify/dist/ReactToastify.css';


class Searchbar extends Component {
  state = {
    value: ''
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.value.trim() === '') {
      toast.error('bad!');
      return
      
    }
    this.props.handleSearch(this.state.value)
    this.setState({value: ''})
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar