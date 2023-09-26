import React, {useState} from 'react';
import { Searchbarr, FormSearch, SearchButton, ButtonLabel, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';


const Searchbar = (props) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onSearch(query);
  };
return (
      <Searchbarr>
        <FormSearch onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <BsSearch />
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </FormSearch>
      </Searchbarr>
    );
    
}
Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Searchbar;
