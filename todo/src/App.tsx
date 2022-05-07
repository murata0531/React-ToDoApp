import { useReducer } from 'react';
import { AppContext } from './AppContext';

import { reducer } from './reducer';
import { initialState } from './initialState';

import { Form } from './Form';
import { Selector } from './Selector';
import { EmptyButton } from './EmptyButton';
import { FilteredTodos } from './FilteredTodos';

export const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div>
        <Selector />
        {state.filter === 'removed' ? <EmptyButton /> : <Form />}
        <FilteredTodos />
      </div>
    </AppContext.Provider>
  );
};