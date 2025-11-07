declare module "../components/AuthProvider.jsx" {
  import React from "react";
  export const AuthContext: React.Context<{ currentUser: any } | undefined>;
  const AuthProvider: React.ComponentType<{ children?: React.ReactNode }>;
  export default AuthProvider;
}

declare module "../components/AuthProvider" {
  import React from "react";
  export const AuthContext: React.Context<{ currentUser: any } | undefined>;
  const AuthProvider: React.ComponentType<{ children?: React.ReactNode }>;
  export default AuthProvider;
}

declare module "../auth/SignOut.jsx" {
  import React from "react";
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module "../auth/Signin.jsx" {
  import React from "react";
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module "../auth/Signup.jsx" {
  import React from "react";
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module "../components/firebase.jsx" {
  export const auth: any;
  export const db: any;
}

declare module "../components/firebase" {
  export const auth: any;
  export const db: any;
}

