export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 5432,
    ttl: parseInt(process.env.REDIS_CACHE_TTL, 10) || 5432,
  },
  mongoose: {
    url:
      process.env.MONGODB_URL +
      (process.env.NODE_ENV === 'test' ? '-test' : ''),
  },
});
