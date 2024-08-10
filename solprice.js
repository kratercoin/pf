//get sol price from pf to convert sol to usd in market cap
const axios = require('axios');

async function getSolPrice() {
  try {
    const response = await axios.get('https://frontend-api.pump.fun/sol-price');
    const solPrice = response.data.solPrice;
    console.log(`The current SOL price is: $${solPrice}`);
  } catch (error) {
    console.error('Error fetching SOL price:', error);
  }
}

getSolPrice();
