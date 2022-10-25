import sanityClient from '@sanity/client';
import iamgeUrlBuilder from '@sanity/image-url';

// Paste your Sanity connection data here
const client = sanityClient({
    projectId: '',
    dataset: '',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.PUBLIC_SANITY_KEY
});

const builder = imageUrlBuilder(client);

export const urlFor  = (source) => builder.image(source);