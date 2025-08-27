module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css');

  // Get the environment from our _data/env.js file
  const isProduction = process.env.ELEVENTY_RUN_MODE === 'build';

  return {
    // This is the only setting needed for deployment
    //pathPrefix: isProduction ? '/my-portfolio/' : '/',
    dir: {
      // Make sure your input directory is correct.
      // If your content is in the root, it should be "."
      input: '.',
    },
  };
};
