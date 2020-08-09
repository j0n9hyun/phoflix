import React, { useState, useEffect } from 'react';
import { tvApi } from 'api';
import styled from 'styled-components';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import Helmet from 'react-helmet';

const Container = styled.div`
  padding: 20px 20px;
`;

function useTv() {
  const [loading, setLoading] = useState(true);
  const [topRated, setTopRated] = useState(null);
  const [popular, setPopular] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [error, setError] = useState(null);

  const Tv = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      setTopRated(topRated);
      setPopular(popular);
      setAiringToday(airingToday);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Tv();
  }, []);
  return loading ? (
    <>
      <Helmet>
        <title>TV 목록</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Container>
        {topRated && topRated.length > 0 && (
          <Section title='최고 평점순'>
            {topRated.map((show) => (
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
        {popular && popular.length > 0 && (
          <Section title='인기 프로그램'>
            {popular.map((show) => (
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
        {airingToday && airingToday.length > 0 && (
          <Section title='금일 방영 프로그램'>
            {airingToday.map((show) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 7)
                }
                rating={show.vote_average}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        airingToday
        {error && <Message color='red' text={error} />}
      </Container>
    </>
  );
}

export default useTv;
