const axios = require('axios'); // Use require for CommonJS

let lastFetchedData = null; // To store the last fetched token data
const seenMints = new Set(); // To track seen mint addresses

// Function to fetch the latest token data
async function fetchLatestToken() {
  try {
    const response = await axios.get('https://frontend-api.pump.fun/coins/latest', {
      headers: {
        'Accept': '*/*'
      }
    });

    if (response.status === 200) {
      const data = response.data;

      // Check if the data has changed (i.e., new token update)
      if (!lastFetchedData || lastFetchedData.mint !== data.mint) {
        console.log('New Token Details:');
        console.log(`Mint: ${data.mint}`);

        // Green text for the token name and symbol
        console.log(`\x1b[32mName: ${data.name}\x1b[0m`);
        console.log(`\x1b[32mSymbol: ${data.symbol}\x1b[0m`);

        console.log(`Created Timestamp: ${new Date(data.created_timestamp).toLocaleString()}`);

        // Display the bonding curve as a string identifier
        const bondingCurveValue = data.bonding_curve;
        console.log(`Bonding Curve: ${bondingCurveValue}`);

        // Ensure the market cap is valid and not NaN
        const marketCapInSOL = parseFloat(data.market_cap);
        if (!isNaN(marketCapInSOL)) {
          console.log(`Market Cap: ${marketCapInSOL} SOL`);
        } else {
          console.log('Market Cap: Invalid value');
        }
        console.log('----------------------------------------');

        // Update the last fetched data and mark the mint as seen
        lastFetchedData = data;

        // Check if the mint has already been seen
        if (!seenMints.has(data.mint)) {
          seenMints.add(data.mint); // Add mint to seen set
        } else {
          console.log('Duplicate token detected. Skipping...');
        }
      } else {
        console.log('No new token update detected.');
      }
    } else {
      console.log('Failed to fetch data. Status Code:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }

  // Fetch again after a delay to avoid rate limiting
  setTimeout(fetchLatestToken, 50); // Adjust the delay as needed
}

// Start fetching the latest token data continuously
fetchLatestToken();
