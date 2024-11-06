import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useAppContext } from '../context/context';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

const baseUrl = 'https://api.pexels.com/v1/search?';

const Gallery = () => {
  const { searchTerm } = useAppContext();
  const perPage = 10;

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
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

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="image-container" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6" color="error">
          There was an error loading the images.
        </Typography>
      </Box>
    );
  }

  if (!results.length) {
    return (
      <Box className="image-container" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">
          No images found
        </Typography>
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
      <Box
        className="image-container"
      >
        {results.map((item) => {
          const imgUrl = item?.src?.medium;
          return (
            <Box key={item.id} className="img-wrapper">
              <img src={imgUrl} alt={item.alt} className="img" loading="lazy" />
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
