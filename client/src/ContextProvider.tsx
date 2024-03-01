// ContextProvider.tsx
import React, {
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useState,
  } from 'react';
  
  type ContextValue = {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
  };
  
  const initialContextState = {
    state: '',
    setState: () => {},
  };
  
  // you need to pass the initialContextState with all the state you need with the equivalent "empty" value, so they keep the same type but that doesn't really have any value in it. Like in this case, the state of type string is an empty string and the setState is just a function that does nothing.
  const Context = createContext<ContextValue>(initialContextState);
  
  // we need the children from the props so we can wrap our proider around it
  const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
    // define the states you will need here;
    const [state, setState] = useState<string>('');
  
    return (
      // wrap the Context.Provider around the children;
      <Context.Provider value={{ state, setState }}>
        {children}
      </Context.Provider>
    );
  };
  
  export default ContextProvider;
  
  // export a custom hook that can be used in the components that need to consume the context state.
  export const useContextState = () => useContext(Context);