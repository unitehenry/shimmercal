# shimmercal

[https://shimmercare.notion.site/Take-Home-Shimmer-Full-stack-Engineer-f3ff7a0c890742a7b17a3d33e67b584b](https://shimmercare.notion.site/Take-Home-Shimmer-Full-stack-Engineer-f3ff7a0c890742a7b17a3d33e67b584b)

## Running the app

```sh
# Install dependencies
$ npm install

# Start dev server
$ npm run dev
```

### Firebase configuration and admin user

Modify the `.env` file to configure firebase project and set the admin user.

```
VITE_FIREBASE_APIKEY="AIzaSyDlIB-opUI8ykd0wnRcTwGMSbYNn_Mt-mc"
VITE_FIREBASE_AUTHDOMAIN="shimmercal.firebaseapp.com"
VITE_FIREBASE_PROJECTID="shimmercal"
VITE_FIREBASE_STORAGEBUCKET="shimmercal.appspot.com"
VITE_FIREBASE_MESSAGINGSENDERID="1020292218490"
VITE_FIREBASE_APPID="1:1020292218490:web:bdab1bc96df66658ee05c3"
VITE_ADMIN_EMAIL="unitehenry@gmail.com"
```

## Screenshots

![login](./images/login.png)
![calendar](./images/calendar.png)
![select date](./images/select-date.png)
![confirm](./images/confirm.png)
![admin](./images/admin.png)

## Notes

```
1. Login Screen
2. Select Time Screen
3. Confirmation Screen -> Success Toast
4. Admin Screen

Details to come back to:
timezones
available time slots for selected date
```
