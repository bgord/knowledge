import React from 'react';

import axios from 'axios';

export interface GithubResponse {
  name?: string;
  location?: string;
}

interface State {
  isPending: boolean;
  error: string;
  data: GithubResponse;
}

export const App: React.FC = () => {
  const [state, setState] = React.useState<State>({
    isPending: false,
    data: {},
    error: '',
  });

  async function getUser() {
    setState(state => ({
      isPending: true,
      data: {},
      error: '',
    }));

    try {
      const {data} = await axios.get<GithubResponse>(
        'http://api.github.com/users/bgord',
      );
      setState(state => ({
        isPending: false,
        data: {name: data.name, location: data.location},
        error: '',
      }));
    } catch (e) {
      setState(state => ({
        isPending: false,
        data: {},
        error: 'Error while fetching user.',
      }));
    }
  }

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {state.isPending && <span data-testid="loader">Loading...</span>}

      {Object.keys(state.data).length !== 0 && (
        <pre data-testid="data">{JSON.stringify(state.data)}</pre>
      )}

      {state.error && <h2 data-testid="error">{state.error}</h2>}
    </>
  );
};

export default App;
