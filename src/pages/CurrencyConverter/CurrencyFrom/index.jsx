import React from 'react';
import { Card, TextField } from '@mui/material';

export default function ConverterBlock({
  onChangeCurrency,
  currency,
  onChangeValue,
  value,
}) {
  const defaultCurrencies = ['USD', 'EUR', 'GBP'];
  return (
    <Card sx={{ maxWidth: 500 }}>
      <ul className="currencies">
        {defaultCurrencies.map((cur) => (
          <li
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? 'active' : ''}
            key={cur}
          >
            {cur}
          </li>
        ))}
        <li>
          <svg height="50px" viewBox="0 0 50 50" width="50px">
            <rect fill="none" height="50" width="50" />
            <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
          </svg>
        </li>
        <TextField
          fullWidth
          type="number"
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
        />
      </ul>
    </Card>
  );
}
