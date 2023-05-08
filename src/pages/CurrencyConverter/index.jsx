import React, { useEffect, useState } from 'react';
import ApiService from '../../components/api-helper';
import ConverterBlock from './CurrencyFrom';

export default function CurrencyConverter() {
  const apiCurrency = new ApiService(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  );
  const [fromCurrency, setFromCurrency] = useState('GBP');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [rates, setRates] = useState([]);
  useEffect(() => {
    apiCurrency.getAllItems().then((res) => {
      var rates = [];
      res.forEach((rate) => (rates[rate.cc] = rate));
      setRates(rates);
    });
  }, []);
  const onChangeFromPrice = (value) => {
    if (rates[fromCurrency]?.rate && rates[toCurrency]?.rate) {
      const price = value / rates[fromCurrency].rate;
      const result = price * rates[toCurrency].rate;
      setToPrice(result);
      setFromPrice(value);
    }
  };
  const onChangeToPrice = (value) => {
    if (rates[fromCurrency]?.rate && rates[toCurrency].rate) {
      const result =
        (rates[fromCurrency]?.rate / rates[toCurrency].rate) * value;
      setFromPrice(result);
      setToPrice(value);
    }
  };
  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);
  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        gap: '30px',
      }}
    >
      <ConverterBlock
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={(cur) => setFromCurrency(cur)}
        onChangeValue={onChangeFromPrice}
      />
      <ConverterBlock
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={(cur) => setToCurrency(cur)}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}
