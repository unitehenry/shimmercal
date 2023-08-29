import { useEffect, useState } from 'react';
import moment from 'moment';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";

import Admin from './Admin';
import Login from './Login';
import Schedule from './Schedule';
import Confirmation from './Confirmation';

function Logout() {

  const onClick = () => signOut(getAuth());

  return (
    <button className="font-bold text-gray-400 hover:underline" onClick={onClick} type="button">
      Logout of scheduler
    </button>
  )
}

function App() {

  const [ user, setUser ] = useState(undefined);
  const [ meeting, setMeeting ] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => setUser(user || null));
  });

  useEffect(() => {
    if (!user?.uid) return
    const db = getFirestore();
    const auth = getAuth();
    const collectionRef = collection(db, `usermeetings/${auth.currentUser.uid}/meetings`);
    getDocs(collectionRef).then(docs => {
      docs.forEach(d => setMeeting(d.data()));
    });
  }, [ user ])

  const onCancel = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const collectionRef = collection(db, `usermeetings/${auth.currentUser.uid}/meetings`);
    const docs = await getDocs(collectionRef);
    await Promise.all(docs.docs.map(d => deleteDoc(d.ref)));
    window.navigation.reload();
  }

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
        <div>
          <Admin />
          <Logout />
        </div>
      </div>
    );
  }

  if (meeting) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50 p-4">
        <div>
          <Confirmation
            onCancel={onCancel}
            confirmationDate={moment.utc(meeting.startTime)} />
          <Logout />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50 p-4">
      <div>
        <Schedule />
        <Logout />
      </div>
    </div>
  );

}

export default App
