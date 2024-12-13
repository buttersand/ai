const nextConfig = {
    webpack: (config) => {
      // Enable Webpack filesystem caching
      config.cache = { type: "filesystem" };
      return config;
    },
  };
  
  export default nextConfig;
  