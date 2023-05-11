import React, { useState } from 'react';
import { Card, TextField } from '@mui/material';

export default function ConverterBlock({
  rates,
  onChangeCurrency,
  currency,
  onChangeValue,
  value,
}) {
  const [openList, setIsOpenList] = useState(false);
  const defaultCurrencies = ['USD', 'EUR', 'GBP', 'AUD', 'RUB'];
  return (
    <Card sx={{ width: '100%', display: 'flex' }}>
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
        {openList && (
          <ul className="currencies">
            {Object.keys(rates)
              .filter((cur) => !defaultCurrencies.includes(cur))
              .map((cur) => (
                <li
                  onClick={() => onChangeCurrency(cur)}
                  className={currency === cur ? 'active' : ''}
                  key={rates[cur].r030}
                >
                  {cur}
                </li>
              ))}
          </ul>
        )}
        <TextField
          fullWidth
          type="number"
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
        />
      </ul>
      <svg
        className="svg-icon"
        height={!openList ? '40px' : 'false'}
        width={!openList ? '40px' : 'false'}
        viewBox="0 0 50 50"
        onClick={() => setIsOpenList(!openList)}
      >
        <rect fill="none" height="50" width="50" />
        {openList ? (
          <polygon points="47.25,35 45.164,37.086 25,16.922 4.836,37.086 2.75,35 25,12.75" />
        ) : (
          <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
        )}
      </svg>
    </Card>
  );
}
