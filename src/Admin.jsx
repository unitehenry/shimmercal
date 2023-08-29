import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import moment from 'moment';

export default function Admin() {

  const [ meetings, setMeetings ] = useState(undefined);

  useEffect(() => {
    const db = getFirestore();
    getDocs(collection(db, 'usermeetings')).then(async (docs) => {
      const meetingsQuery = await Promise.all(docs.docs.map(doc => {
        return getDocs(collection(db, 'usermeetings', doc.id, 'meetings'));
      }));
      setMeetings(meetingsQuery.map(meetings => meetings.docs).flat().map(d => d.data()));
    });
  })

  const getMeetingList = () => {
    return (meetings ?? []).map(meeting => {
      return {
        ...meeting,
        startTime: moment.utc(meeting.startTime).format('dddd, MMMM Do YYYY, h:mma')
      }
    }).sort((a, b) => moment.utc(a.startTime).toDate() < moment.utc(b.startTime).toDate())
  }

  return (
    <div className="w-[500px] shadow-lg bg-white p-4 rounded-lg">
      <div>
        <h1 className="text-gray-800 text-xl mb-4">
          Your upcoming meetings
        </h1>
        <div className="flex flex-col gap-1 max-h-[500px] overflow-auto">
          {
            getMeetingList().map(meeting => {
              return (
                <div
                  className="flex flex-col border border-blue-500 rounded-lg p-2 bg-blue-100" key={meeting.email}>
                  <span>{meeting.email}</span>
                  <span>{meeting.startTime}</span>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
