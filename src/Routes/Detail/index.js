/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { moviesApi, tvApi } from 'api';
import styled from 'styled-components';
import Loader from 'Components/Loader';
import Helmet from 'react-helmet';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;
const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: auto;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Item = styled.span`
  font-size: 30px;
`;
const Overview = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
  line-height: 1.5rem;
  opacity: 0.8;
  width: 50%;
`;
const ItemContainer = styled.span`
  margin: 20px 0;
`;
const Divider = styled.span`
  margin: 0 10px;
  font-size: 30px;
`;

const Video = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  height: 380px;
  padding: 10px;
`;

function useDetail() {
  const { id } = useParams();
  const { push } = useHistory();
  const { pathname } = useLocation();

  // const {
  //   location: { pathname },
  //   match: {
  //     params: { id },
  //   },
  //   history: { push },
  // } = props;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const isMovie = pathname.includes('/movie/');

  const Detail = async () => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
      setResult(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    Detail();
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>Loading</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{result.title ? result.title : result.name}</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('assets/NoPoster.jpg')
          }
        />
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date
                : result.first_air_date}
            </Item>
            <Divider>⚡</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time}분
            </Item>
            <Divider>🍬</Divider>
            <Item>
              {result.genres.map((genre, idx) =>
                idx === result.genres.length - 1 ? genre.name : `${genre.name}/`
              )}
            </Item>
            <Divider>💫</Divider>
            <Item>{result.vote_average}/10</Item>
          </ItemContainer>
          <Overview>
            {result.overview
              ? result.overview
              : '개요가 기재되어 있지 않습니다.'}
          </Overview>
          <Video>
            {result.production_companies.map((c) => `${c.name}`).join('\n\n\n')}
          </Video>
        </Data>
      </Content>
    </Container>
  );
}

export default useDetail;
