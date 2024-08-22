export default {
  images: {
    domains: ["images.unsplash.com", "i.ibb.co"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
