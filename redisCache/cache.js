// cache.js
const redis = require('./connect');

// Function to set a cache with a specified key and value
const setCache = async (key, value, expiration = 3600) => {
  try {
    await redis.setex(key, expiration, JSON.stringify(value)); // Cache for 1 hour by default
    console.log(`Cached data with key: ${key}`);
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

// Function to get a cached value by key
const getCache = async (key) => {
  try {
    const cachedValue = await redis.get(key);
    if (cachedValue) {
      console.log(`Cache hit for key: ${key}`);
      return JSON.parse(cachedValue);
    }
    console.log(`Cache miss for key: ${key}`);
    return null;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
};

// Function to delete a cached value by key
const deleteCache = async (key) => {
  try {
    await redis.del(key);
    console.log(`Cache deleted for key: ${key}`);
  } catch (error) {
    console.error('Error deleting cache:', error);
  }
};

module.exports = {
  setCache,
  getCache,
  deleteCache
};
