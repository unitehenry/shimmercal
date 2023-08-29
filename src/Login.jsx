import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

  const [ isRegistration, setIsRegistration ] = useState(false);

  const onLogin = async (evt) => {
    evt.preventDefault();
    const auth = getAuth();
    const formData = new FormData(evt.target);
    if (isRegistration) {
      if (formData.get('password') !== formData.get('confirmPassword')) {
        alert('Passwords do not match.');
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, formData.get('email'), formData.get('password'))
        window.navigation.reload();
      } catch(err) {
        alert(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, formData.get('email'), formData.get('password'));
        window.navigation.reload();
      } catch(err) {
        alert(err.message);
      }
    }
  }

  return (
    <div className="w-[500px] shadow-lg bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="text-gray-600">
          <h1 className="text-gray-800 text-2xl">shimmercal</h1>
          <span>Login to book a meeting</span>
        </div>
        <form onSubmit={onLogin} className="flex flex-col gap-2">
          <input
            type="email"
            className="border rounded-lg text-lg outline-none px-4 py-2 hover:bg-gray-100"
            placeholder="Email address"
            name="email"
            required />
          <input
            type="password"
            className="border rounded-lg text-lg outline-none px-4 py-2 hover:bg-gray-100"
            placeholder="Password"
            name="password"
            required />
          {
            isRegistration ? (
              <input
               type="password"
               className="border rounded-lg text-lg outline-none px-4 py-2 hover:bg-gray-100"
               placeholder="Confirm password"
               name="confirmPassword"
               required />
            ) : <></>
          }
          <div className="flex flex-end gap-1">
            {
              isRegistration ? (
                <button
                  className="border text-lg px-4 py-2 rounded-lg text-gray-800 bg-gray-100 hover:bg-gray-200"
                type="button"
                onClick={() => setIsRegistration(false)}>
                  Cancel
                </button>
              ) : (
                <button
                  className="border text-lg px-4 py-2 rounded-lg text-gray-800 bg-gray-100 hover:bg-gray-200"
                type="button"
                onClick={() => setIsRegistration(true)}>
                  Register
                </button>
              )
            }
            <button
              className="border text-lg px-4 py-2 rounded-lg text-gray-800 bg-blue-500 text-white hover:bg-blue-400">
              { isRegistration ? 'Register' : 'Login' }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
