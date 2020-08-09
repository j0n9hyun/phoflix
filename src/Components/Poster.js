import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  font-size: 1.2rem;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.2s linear;
`;

const Rating = styled.div`
  font-size: 1rem;
  bottom: 3px;
  right: 5px;
  position: absolute;
  opacity: 0;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.5;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.div`
  display: block;
  font-size: 15px;
  margin-bottom: 10px;
`;
const Year = styled.div`
  font-size: 1rem;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require('../assets/NoPoster.png')
          }
        />
        <Rating>
          <span role='img' aria-label='rating'>
            ✨
          </span>
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>{title.length > 9 ? `${title.substring(0, 9)}...` : title}</Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  yaer: PropTypes.number,
  rating: PropTypes.number,
  isMovie: PropTypes.bool,
};

export default Poster;
