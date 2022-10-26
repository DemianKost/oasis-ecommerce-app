import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';

import { useStateContext } from '../../context/StateContext';

export default function ProductDetails({ products, product }) {
    const { image, name, details, price } = product;
    const [index, setIntex] = useState(0);
    const { decQty, incQty, qty } = useStateContext();

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image[index])} className='product-detail-image' />
                </div>
                <div className='small-images-container'>
                    {/* {image?.map((item, index) => (
                        <img
                            src={urlFor(item)}
                            className=''
                            onMouseEnter=''
                        />
                    ))} */}
                </div>

                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className='price'>${price}</p>
                    <div className='quantity'>
                        <h3>Quantity</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={incQty()}>
                                <AiOutlinePlus />
                            </span>
                            <span className='num'>
                                {qty}
                            </span>
                            <span className='plus' onClick={decQty()}>
                                <AiOutlineMinus  />
                            </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type="button" className='add-to-cart'>Add to cart</button>
                        <button type="button" className='buy-now'>Buy now</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);
    const paths = products.map( (product) => ({
        params: {
            slug: product.slug.current
        }
    }) );

    return {
        paths, 
        fallback: 'blocking'
    }
};

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch( query );
    const products = await client.fetch( productsQuery );

    return {
      props: { products, product }
    };
};