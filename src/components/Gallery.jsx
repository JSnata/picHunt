import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useAppContext } from '../context/context';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const baseUrl = 'https://api.pexels.com/v1/search?';

const Gallery = () => {
  const { searchTerm } = useAppContext();
  const [favorites, setFavorites] = useState([]);
  const perPage = 10;

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['images', searchTerm],
      async ({ pageParam = 1 }) => {
        const res = await axios.get(
          `${baseUrl}query=${searchTerm}&per_page=${perPage}&page=${pageParam}`,
          { headers: { Authorization: import.meta.env.VITE_API_KEY } }
        );
        return res.data;
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage && lastPage.photos.length > 0) {
            return allPages.length + 1;
          }
          return undefined;
        },
      }
    );

  const results = data?.pages ? data.pages.flatMap((page) => page.photos) : [];

  const toggleFavorite = (image) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === image.id)) {
        return prevFavorites.filter((fav) => fav.id !== image.id);
      }
      return [...prevFavorites, image];
    });
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        className="image-container"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" color="error">
          There was an error loading the images.
        </Typography>
      </Box>
    );
  }

  if (!results.length) {
    return (
      <Box
        className="image-container"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">No images found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box className="image-container">
        {results.map((item) => {
          const imgUrl = item?.src?.medium;
          const isFavorite = favorites.some((fav) => fav.id === item.id);
          return (
            <Box
              key={item.id}
              className="img-wrapper"
              sx={{
                position: 'relative',
                '&:hover .favorite-icon': {
                  opacity: 1,
                },
              }}
            >
              <img src={imgUrl} alt={item.alt} className="img" loading="lazy" />
              <IconButton
                className="favorite-icon"
                onClick={() => toggleFavorite(item)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  color: isFavorite ? 'yellow' : 'white',
                }}
              >
                {isFavorite ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Box>
          );
        })}
      </Box>
      <Button
        variant="contained"
        onClick={() => fetchNextPage()}
        sx={{ mt: 2 }}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </Button>
    </Box>
  );
};

export default Gallery;
