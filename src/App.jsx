import Login from './Login';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {

  const [ user, setUser ] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => setUser(user || null));
  });

  if (user === undefined) return <div />;

  if (user?.email === 'unitehenry@gmail.com') {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50 p-4">
        ADMIN
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50 p-4">
      <Login />
    </div>
  )
}

export default App
