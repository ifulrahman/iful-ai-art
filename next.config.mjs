/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // penting kalau pakai <Image /> di static export
};
export default nextConfig;
