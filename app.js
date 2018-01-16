const axios = require('axios');

const getExchangeRate = (from, to)=>{
  return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response)=>{
    return response.data.rates[to];
  });
}

const getCountries = (currencyCode) =>{
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response)=>{
    return response.data.map((country)=>{
      return country.name;
    })
  });
}
/*
getExchangeRate('EUR','RON').then((rate)=>{
      console.log(rate);
}).catch((e)=>{
  console.log(e);
});

getCountries('RON').then((countries)=>{
      console.log(countries);
}).catch((e)=>{
  console.log(e);
});
*/

const convertCurrency = (from, to, amount)=> {
  let countries;
  return getCountries(to).then((tempCountries)=>{
    countries = tempCountries;
    return getExchangeRate(from,to).then((rate)=>{
      const exchangeAmount = amount * rate;
      return `${amount} ${from} is worth ${Math.floor(exchangeAmount)} ${to}. ${to} currency can be used in the following countries: \n ${countries.join('\n')}`;
    })
  })
}

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const exchangeRate = await getExchangeRate(from,to);
  const exchangeAmount = amount * exchangeRate;
  return `${amount} ${from} is worth ${Math.floor(exchangeAmount)} ${to}. ${to} currency can be used in the following countries: \n ${countries.join('\n')}`;
};

convertCurrencyAlt('EUR','RON', 865).then((status)=>{
      console.log(status);
}).catch((e)=>{
  console.log(e);
});
