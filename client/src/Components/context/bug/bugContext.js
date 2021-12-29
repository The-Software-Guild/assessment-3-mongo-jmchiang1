import { createContext } from "react";

const bugContext = createContext();

export default bugContext

//context provides a way to apss data through the component tree without having to pass props down manually at every level.
//useful for sharing global data such as authenticated users, similar to redux