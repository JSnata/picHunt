import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useAppContext } from '../context/context';

const baseUrl = 'https://api.pexels.com/v1/search?';

const Gallery = () => {
  const { searchTerm } = useAppContext();
  const perPageValue = '10';

  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const res = await axios.get(
        `${baseUrl}query=${searchTerm}&per_page=${perPageValue}`,
        { headers: { Authorization: import.meta.env.VITE_API_KEY } }
      );
      return res.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error.</h4>
      </section>
    );
  }

  const results = response.data.photos;

  if (!results.length) {
    return (
      <section className="image-container">
        <h4>No results found.</h4>
      </section>
    );
  }

  console.log(response);

  return (
<section class="image-container">
  {results.map((item) => {
    const imgUrl = item?.src?.medium;
    return (
      <div key={item.id} className="img-wrapper">
        <img src={imgUrl} alt={item.alt} className="img" />
      </div>
    );
  })}
</section>
  );
};

export default Gallery;
