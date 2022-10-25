import React from 'react';
import { client } from '../lib/client';

import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData[0]} />

      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>Really nice products</p>
      </div>

      <div className='products-container'>
        { products?.map( (product) => (
          <Product key={product._id} product={product} />
        ) ) }
      </div>

      <FooterBanner footerBanner={bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch( query );

  const query_banner = '*[_type == "banner"]';
  const bannerData = await client.fetch(query_banner);

  return {
    props: { products, bannerData  }
  };
};

export default Home;