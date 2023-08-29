import moment from 'moment';
import { getAuth } from "firebase/auth";

export default function Confirmation({
  confirmationDate,
  onCancel,
  onConfirm
}) {

  const email = () => {
    const auth = getAuth();
    return auth?.currentUser?.email;
  }

  return (
    <div className="w-[500px] shadow-lg bg-white p-4 rounded-lg">
      <div>
        <h1 className="text-gray-800 text-lg">
          Confirm your time slot
        </h1>
        <span className="text-gray-600">
          View your meeting details below
        </span>
        <div className="my-4">
          <div className="flex flex-col">
            <span className="text-gray-600">
              Email
            </span>
            <span>
              { email() }
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">
              Meeting time
            </span>
            <span>
              { moment(confirmationDate).format('dddd, MMMM Do YYYY, h:mma') }
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <button className={onCancel ? 'bg-red-500 text-white px-4 py-2 text-lg rounded-lg' : 'hidden'} onClick={onCancel}>
            Cancel
          </button>
          <button className={onConfirm ? 'bg-blue-500 text-white px-4 py-2 text-lg rounded-lg' : 'hidden'} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
