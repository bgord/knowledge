import React from 'react';
import App, {GithubResponse} from './App';

import {render, cleanup, wait} from 'react-testing-library';
import 'jest-dom/extend-expect';

import axios from 'axios';

afterEach(cleanup);

const responseBase = {
  headers: [],
  request: {},
  config: {},
};

const RESPONSE_200 = {
  status: 200,
  statusText: 'Ok',
  ...responseBase,
};

it('happy path', async () => {
  const data: GithubResponse = {
    name: 'xxx',
    location: undefined,
  };

  jest.spyOn(axios, 'get').mockResolvedValue({
    data,
    ...RESPONSE_200,
  });

  const {getByTestId, queryByTestId} = render(<App />);

  expect(getByTestId(/loader/i)).toBeInTheDocument();
  expect(queryByTestId(/data/i)).not.toBeInTheDocument();
  expect(queryByTestId(/error/i)).not.toBeInTheDocument();

  await wait();

  expect(queryByTestId(/loader/i)).not.toBeInTheDocument();
  expect(getByTestId(/data/i)).toHaveTextContent(JSON.stringify(data));
  expect(queryByTestId(/error/i)).not.toBeInTheDocument();

  expect(axios.get).toHaveBeenCalledWith('http://api.github.com/users/bgord');
  expect(axios.get).toHaveBeenCalledTimes(1);
});
