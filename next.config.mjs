/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/synth',
        destination: '/synth.html',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;