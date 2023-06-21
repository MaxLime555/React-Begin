import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');       //состояние для выбора курса
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  // const [rates, setRates] = React.useState({});                       //состояние для наших курсов
  const ratesRef = React.useRef({});                                     

  React.useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/2d25acf86ca7fe5ab530935d/latest/USD')
      .then(res => res.json())
      .then((json) => {
        // setRates(json.conversion_rates);
        ratesRef.current = json.conversion_rates;
        onChangeToPrice(1);                                 //при перезагрузке страницы не будет вычисляться значение доллара на начальном экране
      })                                                    //т.к. изначально хранил rates в useState(связано с асинхронностью выполнения useState), поэтому теперь rates содержится в useRef
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении курса валют');
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]; //конвертируем в доллары
    const result = price * ratesRef.current[toCurrency];  //результат конвертируем в нужную нам валюту
    setFromPrice(value);
    setToPrice(result.toFixed(3));
  }

  const onChangeToPrice = (value) => {
    const price1 = value / ratesRef.current[toCurrency];   //можно и в одно действие, но так понятнее
    const result1 = price1 * ratesRef.current[fromCurrency];
    setToPrice(value);
    setFromPrice(result1.toFixed(3));
  }

  React.useEffect(() => {                          //следим за выбором какую из какой валюты конвертируем
    onChangeFromPrice(fromPrice);                  //и обновляем значение
  }, [fromCurrency]);

  React.useEffect(() => {                          //такая же логика,что и выше у useEffect, только для второго поля
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
