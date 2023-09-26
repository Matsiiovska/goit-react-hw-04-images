import React, { useState, useEffect } from 'react';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Divapp } from './App.styled';
import { fetchImages } from '../FetchImages/FetchImages';


export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [loadMore, setLoadMore] = useState(true);


  const handleSearch = (query) => {
    if (query.trim() === '') {
      return;
    }

    setQuery(query);
    setPage(1);
    setImages([]);
    setLoading(true);
    setNoResults(false);
    setLoadMore(false);
  };

  

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
    setLoading(true);
  };
  
  useEffect(() => {
    const fetIm = () => {
  /*const { query, page } = this.state;*/

    if (query.trim() === '') {
      setLoading(false);
      setNoResults(false);
    return;
  }

  fetchImages(query, page)
    .then((data) => {
      const result = data.hits.length === 0 ? { images: [], totalHits: 0 } : { images: data.hits, totalHits: data.totalHits };
        setImages((prevState) => [...prevState, ...result.images]);

      setLoading(false);
      setNoResults((prevState) => result.images.length === 0 && prevState);
      setLoadMore(page < Math.ceil(result.totalHits / 12));
    })
};
    fetIm();
  }, [page, query]);


 return (
    <Divapp>
      <Searchbar onSearch={handleSearch} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {noResults && !loading ? (
            <p style={{
                  color: 'grey',
                  textAlign: 'center',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh',
                }}>Немає результатів</p>
          ) : (
            <>
              <ImageGallery images={images} />
              {images.length > 0 && loadMore && (
                <Button onClick={handleLoadMore}>Load more</Button>
              )}
              {images.length === 0 && !loading && (
                <p style={{
                  color: 'grey',
                  textAlign: 'center',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh',
                }}>Галерея зображень порожня... 📷</p>
              )}
            </>
          )}
        </>
      )}
    </Divapp>
  ); 
}
export default App;
