const http = require('http');
const readline = require('readline');


async function getWeather(city) {
  const params = {
    'access_key': process.env.APIKEY,
    'query': city
  };
  const url = `http://api.weatherstack.com/current?` +
    `access_key=${params.access_key}&` +
    `query=${params.query}`;

  http.get(url, res => {
    if (res.statusCode !== 200) {
      return console.error(`Status Code: ${res.statusCode}`);
      }
    res.setEncoding('utf-8');
    let data = [];
    res
      .on('data', chunk => data += chunk)
      .on('end', () => {
      console.log(JSON.parse(data));
      console.log('Пожалуйста, введите город, чтобы узнать погоду:')
    });
  }).on('error', e => console.error(e));
}

async function consoleAsker() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`
  Добро пожаловать в приложение погоды
  Пожалуйста, введите интересующий Вас город:`);
  rl.on('line', getWeather);
  rl.on('error', err => console.error(err))
}

(async () => {
  await consoleAsker();
})()






