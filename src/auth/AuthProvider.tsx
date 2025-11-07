// // import { onAuthStateChanged } from 'firebase/auth';
// import React, { useEffect, useState } from "react";
// import { auth } from "../components/firebase";

// export const AuthContext = React.createContext();

// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       user ? setCurrentUser(user) : setCurrentUser(null);
//     });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// import { useEffect, useState, createContext } from "react";
// import {
//   auth,
// } from "../components/firebase";
// import {
//   onAuthStateChanged,
//   setPersistence,
//   browserLocalPersistence
// } from "firebase/auth";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [idToken, setIdToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Set persistence to local (you can switch to browserSessionPersistence if you prefer)
//     setPersistence(auth, browserLocalPersistence)
//       .then(() => {
//         // Listen for changes in authentication state
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//           if (user) {
//             const token = await user.getIdToken(); // Get fresh token
//             setCurrentUser(user);
//             setIdToken(token);

//             // Optional: store minimal data locally (no sensitive info)
//             sessionStorage.setItem("user_uid", user.uid);
//           } else {
//             setCurrentUser(null);
//             setIdToken(null);
//             sessionStorage.removeItem("user_uid");
//           }
//           setLoading(false);
//         });

//         return () => unsubscribe();
//       })
//       .catch((error) => {
//         console.error("Auth persistence error:", error);
//       });
//   }, []);

//   const value = {
//     currentUser,
//     idToken,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { useEffect, useState, createContext, type ReactNode } from "react";
import { auth } from "../components/firebase";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  type User,
} from "firebase/auth";

// Type for AuthContext value
interface AuthContextType {
  currentUser: User | null;
  idToken: string | null;
  loading: boolean;
}

// Provide default values for context
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  idToken: null,
  loading: true,
});

// Props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const token = await user.getIdToken(); // Get fresh token
            setCurrentUser(user);
            setIdToken(token);

            // Optional: store minimal data locally (no sensitive info)
            sessionStorage.setItem("user_uid", user.uid);
          } else {
            setCurrentUser(null);
            setIdToken(null);
            sessionStorage.removeItem("user_uid");
          }
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Auth persistence error:", error);
      });
  }, []);

  const value: AuthContextType = { currentUser, idToken, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
