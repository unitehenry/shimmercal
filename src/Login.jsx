export default function Login() {
  return (
    <div className="w-[500px] shadow-lg bg-white p-4 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="text-gray-600">
          <h1 className="text-gray-800 text-xl">shimmercal</h1>
          <span>Login to book a meeting</span>
        </div>
        <form className="flex flex-col gap-2">
          <input
            type="email"
            className="border rounded-lg text-lg outline-none px-4 py-2 hover:bg-gray-100"
            placeholder="Email address"
            required />
          <input
            type="password"
            className="border rounded-lg text-lg outline-none px-4 py-2 hover:bg-gray-100"
            placeholder="Password"
            required />
          <div className="flex flex-end">
            <button
              className="border text-lg px-4 py-2 rounded-lg text-gray-800 bg-blue-500 text-white hover:bg-blue-400">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
