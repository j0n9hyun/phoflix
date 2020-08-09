import React, { useState } from 'react';
import { moviesApi, tvApi } from 'api';
import styled from 'styled-components';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import Helmet from 'react-helmet';

const Container = styled.div`
  padding: 10px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

function useSearch() {
  const [loading, setLoading] = useState(false);
  const [movieResults, setMovieResults] = useState(null);
  const [tvResults, setTvResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== '') {
      searchByTerm();
    }
  };

  const updateTerm = (e) => {
    const {
      target: { value },
    } = e;
    console.log(e);
    setSearchTerm(value);
  };

  const searchByTerm = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      setMovieResults(movieResults);
      setTvResults(tvResults);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>검색</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input placeholder='검색' value={searchTerm} onChange={updateTerm} />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title='영화 검색 결과'>
              {movieResults.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  year={
                    movie.release_date && movie.release_date.substring(0, 7)
                  }
                  rating={movie.vote_average}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title='TV 검색 결과'>
              {tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 7)
                  }
                  rating={show.vote_average}
                />
              ))}
            </Section>
          )}
          {tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message text='찾을 수 없습니다!' color='#95a5a6' />
            )}
        </>
      )}
    </Container>
  );
}

export default useSearch;
