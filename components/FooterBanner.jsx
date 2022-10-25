import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

export default function FooterBanner({ footerBanner: { discount, largeText1, largeText2, saleTime, desc, smallText, midText, product, buttonText, image } }) {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3 style={{textTransform: 'uppercase'}}>{largeText1}</h3>
          <h3 style={{textTransform: 'uppercase'}}>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img
          src={urlFor(image)}
          className="footer-banner-image"
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}
