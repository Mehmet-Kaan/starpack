// import { Routes, Route } from "react-router-dom";
// import { Box, Flex } from "@chakra-ui/react";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Webshop from "./pages/Webshop.js";
// import Profile from "./pages/Profile";
// import ProductView from "./pages/ProductView.js";
// import Checkout from "./pages/Checkout";
// import Footer from "./components/Footer";
// import AuthProvider from "./auth/AuthProvider.jsx";
// import {
//   CartDrawerProvider,
//   useCartDrawer,
// } from "./components/Contexts/CartDrawerContext";
// import CartDrawer from "./components/Checkout/CartDrawer.js";
// import SignOut from "./auth/SignOut.jsx";
// import PageTransition from "./components/PageTransition.js";
// import { AnimatePresence } from "framer-motion";

// const App = () => {
//   function CartDrawerWrapper() {
//     const { isOpen, closeCart } = useCartDrawer();
//     return <CartDrawer isOpen={isOpen} onClose={closeCart} />;
//   }

//   return (
//     <AuthProvider>
//       <CartDrawerProvider>
//         <Flex direction="column" minH="100vh" color={"black"}>
//           <Navbar />
//           <CartDrawerWrapper />
//           <Box flex="1">
//             <AnimatePresence mode="wait">
//               <Routes location={location} key={location.pathname}>
//                 <Route
//                   path="/"
//                   element={
//                     <PageTransition>
//                       <Home />
//                     </PageTransition>
//                   }
//                 />
//                 <Route
//                   path="/webshop"
//                   element={
//                     <PageTransition>
//                       <Webshop />
//                     </PageTransition>
//                   }
//                 />
//                 <Route
//                   path="/product/:id"
//                   element={
//                     <PageTransition>
//                       <ProductView />
//                     </PageTransition>
//                   }
//                 />
//                 <Route
//                   path="/about"
//                   element={
//                     <PageTransition>
//                       <About />
//                     </PageTransition>
//                   }
//                 />
//                 <Route
//                   path="/contact"
//                   element={
//                     <PageTransition>
//                       <Contact />
//                     </PageTransition>
//                   }
//                 />
//                 <Route
//                   path="/profile"
//                   element={
//                     <PageTransition>
//                       <Profile />
//                     </PageTransition>
//                   }
//                 />
//                 <Route
//                   path="/checkout"
//                   element={
//                     <PageTransition>
//                       <Checkout />
//                     </PageTransition>
//                   }
//                 />
//                 <Route path="/signout" element={<SignOut />} />
//               </Routes>
//             </AnimatePresence>
//           </Box>

//           <Footer />
//         </Flex>
//       </CartDrawerProvider>
//     </AuthProvider>
//   );
// };

// export default App;

import { Routes, Route, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products.js";
import Profile from "./pages/Profile";
import ProductView from "./pages/ProductView.js";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import AuthProvider from "./auth/AuthProvider.jsx";
import {
  CartDrawerProvider,
  useCartDrawer,
} from "./components/Contexts/CartDrawerContext";
import CartDrawer from "./components/Checkout/CartDrawer.js";
import SignOut from "./auth/SignOut.jsx";
import PageTransition from "./components/PageTransition.js";
import { AnimatePresence } from "framer-motion";
import Privacy from "./pages/Privacy.js";
import FAQ from "./pages/FAQ.js";

const AppContent = () => {
  const { isOpen, closeCart } = useCartDrawer();
  const location = useLocation(); // useLocation for AnimatePresence

  return (
    <Flex direction="column" minH="100vh" color={"black"}>
      <Navbar />
      <CartDrawer isOpen={isOpen} onClose={closeCart} />
      <Box flex="1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/products"
              element={
                <PageTransition>
                  <Products />
                </PageTransition>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageTransition>
                  <ProductView />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/privacy"
              element={
                <PageTransition>
                  <Privacy />
                </PageTransition>
              }
            />
            <Route
              path="/faq"
              element={
                <PageTransition>
                  <FAQ />
                </PageTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <Profile />
                </PageTransition>
              }
            />
            <Route
              path="/checkout"
              element={
                <PageTransition>
                  <Checkout />
                </PageTransition>
              }
            />
            <Route path="/signout" element={<SignOut />} />
          </Routes>
        </AnimatePresence>
      </Box>
      <Footer />
    </Flex>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartDrawerProvider>
        <AppContent />
      </CartDrawerProvider>
    </AuthProvider>
  );
};

export default App;
