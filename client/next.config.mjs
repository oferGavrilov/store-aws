/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pm-s3-images-files.s3.eu-north-1.amazonaws.com',
                port:"",
                pathname: "/**",
            }
        ]
    }
};

export default nextConfig;
