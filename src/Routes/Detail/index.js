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
  position: relative;
  z-index: 5;
  margin: 0px auto;
  width: 90%;
  height: 100%;
  border-radius: 10px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.8)
  );
`;
const Cover = styled.div`
  width: 40%;
  margin-right: 30px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: auto;
  border-radius: 10px;
  mask-image: -webkit-gradient(
    linear,
    100% 0%,
    0% 0%,
    to(rgb(0, 0, 0)),
    color-stop(0.5, rgb(0, 0, 0)),
    from(rgba(0, 0, 0, 0))
  );
  @media only screen and (max-width: 480px) {
    width: auto;
  }
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  margin-top: 2rem;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Item = styled.span`
  font-size: 20px;
`;
const Overview = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
  line-height: 1.5rem;
  opacity: 0.8;
  width: 85%;
`;
const ItemContainer = styled.span`
  margin: 20px 0;
`;
const Divider = styled.span`
  margin: 0 10px;
  font-size: 25px;
`;

const IMDB = styled.img`
  position: absolute;
  margin-left: 10px;
`;

const CompanyContainer = styled.div`
  display: flex;
  overflow: auto;
  margin-bottom: 20px;
  margin-top: 10px;
`;
const CompanyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  border-radius: 2px;
  padding: 5px;
  margin-right: 10px;
  margin-top: 7px;
  &:last-child() {
    margin-right: 0;
  }
`;
const CompanyTitle = styled.p`
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 8px;
`;
const CompanyLogo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 5px;
`;
const CompanyText = styled.span``;

const Countries = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 15px;
`;
const CountriesTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 15px;
  color: whitesmoke;
`;

const CountriesText = styled.span`
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 5px;
`;

const Seasons = styled.div`
  margin-bottom: 20px;
`;
const SeasonsTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const PosterFlex = styled.div`
  display: flex;
  overflow: auto;
`;
const PosterImg = styled.img`
  height: 130px;
  width: auto;
  transition: opacity 0.3s ease-in-out;
`;

const PosterTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const PosterAir = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;
const PosterTextBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-left: 3px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;
const PosterContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 15px;
  &:hover {
    ${PosterTextBox} {
      opacity: 1;
    }
    ${PosterImg} {
      opacity: 0.3;
    }
  }
`;

function useDetail() {
  const { id } = useParams();
  const { push } = useHistory();
  const { pathname } = useLocation();

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
      <Loader />
    </>
  ) : (
    <Container>
      <Backdrop
        bgImage={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : require('assets/NoPoster.png')
        }
      />

      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('assets/NoPoster.png')
          }
        />

        <Data>
          <Title>
            {result.title ? result.title : result.name}
            {result.seasons ? null : (
              <a
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target={'_blank'}
                rel='noopener noreferrer'
              >
                <IMDB src='https://img.icons8.com/color/1x/imdb.png' />
              </a>
            )}
          </Title>

          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date
                : result.first_air_date}
            </Item>
            <Divider>⌛</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time}분
            </Item>
            <Divider>🎡</Divider>
            <Item>
              {result.genres.map((genre, idx) =>
                idx === result.genres.length - 1 ? genre.name : `${genre.name}/`
              )}
            </Item>
            <Divider>⭐</Divider>
            <Item>{result.vote_average}/10</Item>
          </ItemContainer>
          <Overview>
            {result.overview
              ? result.overview
              : '개요가 기재되어 있지 않습니다.'}
          </Overview>
          <CompanyTitle>
            {result.production_companies.length === 0
              ? null
              : result.production_companies
              ? '제작사'
              : null}
          </CompanyTitle>
          <CompanyContainer>
            {result.production_companies &&
              result.production_companies.map((c, i) =>
                i === result.production_companies.length - 1 ? (
                  <CompanyBox key={i}>
                    <CompanyLogo
                      key={c.id}
                      src={
                        c.logo_path
                          ? `https://image.tmdb.org/t/p/w200${c.logo_path}`
                          : require('assets/NoPoster.png')
                      }
                      alt='logo'
                    />
                    <CompanyText>{c.name}</CompanyText>
                  </CompanyBox>
                ) : (
                  <CompanyBox key={i}>
                    <CompanyLogo
                      key={c.id}
                      src={
                        c.logo_path
                          ? `https://image.tmdb.org/t/p/w200${c.logo_path}`
                          : require('assets/NoPoster.png')
                      }
                      alt='logo'
                    />
                    <CompanyText>{c.name}</CompanyText>
                  </CompanyBox>
                )
              )}
          </CompanyContainer>

          <Seasons>
            <SeasonsTitle>{result.seasons ? '시즌' : null}</SeasonsTitle>
            <PosterFlex>
              {result.seasons &&
                result.seasons.map((item, i) => (
                  <PosterContainer key={i}>
                    <PosterImg
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                          : require('assets/NoPoster.png')
                      }
                    />
                    <PosterTextBox>
                      <PosterTitle>{item.name}</PosterTitle>
                      <PosterAir>{item.air_date}</PosterAir>
                    </PosterTextBox>
                  </PosterContainer>
                ))}
            </PosterFlex>
          </Seasons>

          <Countries>
            <CountriesTitle>
              {result.production_countries ? '국가' : null}
            </CountriesTitle>
            {result.production_countries &&
              result.production_countries.map((c, i) =>
                i === result.production_countries.length - 1 ? (
                  <CountriesText key={i}>{c.name}</CountriesText>
                ) : (
                  <CountriesText key={i}>
                    {`${c.name}`} <br />
                  </CountriesText>
                )
              )}
          </Countries>
        </Data>
      </Content>
    </Container>
  );
}

export default useDetail;
