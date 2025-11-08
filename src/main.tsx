// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { ChakraProvider } from "@chakra-ui/react";
// import { CartProvider } from "./components/Contexts/CartContext";
// import theme from "./theme/theme";
// import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ChakraProvider value={theme}>
//       <CartProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </CartProvider>
//     </ChakraProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "./components/Contexts/CartContext";
import theme from "./theme/theme";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider value={theme}>
      <CartProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </CartProvider>
    </ChakraProvider>
  </React.StrictMode>
);
