import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Login from './Login';
import Schedule from './Schedule';

function App() {

  const [ user, setUser ] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => setUser(user || null));
  });

  if (user === undefined) return <div />;

  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50 p-4">
        <Login />
      </div>
    );
  }

  if (user?.email === import.meta.env.VITE_ADMIN_EMAIL) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50 p-4">
        ADMIN
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50 p-4">
      <Schedule />
    </div>
  );

}

export default App
