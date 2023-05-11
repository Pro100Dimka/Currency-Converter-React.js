import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
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
      setToPrice(result.toFixed(2));
      setFromPrice(value);
    }
  };
  const onChangeToPrice = (value) => {
    if (rates[fromCurrency]?.rate && rates[toCurrency].rate) {
      const result =
        (rates[fromCurrency]?.rate / rates[toCurrency].rate) * value;
      setFromPrice(result.toFixed(2));
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
      <Grid container spacing={2}>
        <Grid item md={6}>
          <ConverterBlock
            rates={rates}
            value={fromPrice}
            currency={fromCurrency}
            onChangeCurrency={(cur) => setFromCurrency(cur)}
            onChangeValue={onChangeFromPrice}
          />
        </Grid>
        <Grid item md={6}>
          <ConverterBlock
            rates={rates}
            value={toPrice}
            currency={toCurrency}
            onChangeCurrency={(cur) => setToCurrency(cur)}
            onChangeValue={onChangeToPrice}
          />
        </Grid>
      </Grid>
    </div>
  );
}
