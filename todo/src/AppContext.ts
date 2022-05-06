// stateとdispatchを保持するコンテキスト
import { createContext, Dispatch } from 'react';

export const AppContext = createContext(
  {} as { state: State; dispatch: Dispatch<Action> }
);