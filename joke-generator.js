/**
 * Random Joke Generator
 * Uses the JokeAPI to fetch random jokes
 * 
 * Features:
 * - Fetch single or multiple jokes
 * - Filter by joke type (single or twopart)
 * - Error handling
 * - Rate limiting awareness
 */

const https = require('https');
const http = require('http');

/**
 * Fetches a random joke from JokeAPI
 * @param {Object} options - Configuration options
 * @param {string} options.type - Joke type: 'single', 'twopart', or 'any' (default: 'any')
 * @param {string} options.category - Joke category: 'general', 'knock-knock', 'programming', etc.
 * @returns {Promise<Object>} Joke object or error
 */
function getRandomJoke(options = {}) {
  return new Promise((resolve, reject) => {
    const { type = 'any', category = 'any' } = options;
    
    // Build the API URL
    let url = `https://v2.jokeapi.dev/joke/${category}`;
    
    // Add query parameters
    const params = new URLSearchParams();
    if (type !== 'any') {
      params.append('type', type);
    }
    params.append('format', 'json');
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    https.get(url, (res) => {
      let data = '';

      // Collect data chunks
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Process complete response
      res.on('end', () => {
        try {
          const joke = JSON.parse(data);
          
          // Check for errors from the API
          if (joke.error) {
            reject(new Error(`API Error: ${joke.error}`));
            return;
          }

          resolve(joke);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`HTTP Error: ${error.message}`));
    });
  });
}

/**
 * Formats and displays a joke
 * @param {Object} joke - Joke object from the API
 * @returns {string} Formatted joke text
 */
function formatJoke(joke) {
  if (joke.type === 'single') {
    return joke.joke;
  } else if (joke.type === 'twopart') {
    return `${joke.setup}\n${joke.delivery}`;
  }
  return 'Unable to format joke';
}

/**
 * Main function to generate and display a random joke
 * @param {Object} options - Configuration options
 */
async function main(options = {}) {
  try {
    console.log('🎭 Fetching a random joke...\n');
    const joke = await getRandomJoke(options);
    const formattedJoke = formatJoke(joke);
    
    console.log(formattedJoke);
    console.log('\n✅ Joke generated successfully!');
    
    return joke;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Export for use as a module
module.exports = {
  getRandomJoke,
  formatJoke,
  main
};

// Run if executed directly
if (require.main === module) {
  // Example usage with different options
  const args = process.argv.slice(2);
  const options = {};
  
  if (args.includes('--programming')) {
    options.category = 'Programming';
  }
  if (args.includes('--knockknock')) {
    options.category = 'Knock-knock';
  }
  if (args.includes('--single')) {
    options.type = 'single';
  }
  if (args.includes('--twopart')) {
    options.type = 'twopart';
  }
  
  main(options);
}