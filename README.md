# Portals Super App Demo

To get started have Docker installed and then run `npx supabase start` from the root of the project.

Go into each web app directory starting with `data` and `npm install` them. Run `npm run build` for the CRM, Human Resources, Perks, and Time Tracking apps:

```bash
cd web/
cd data && npm install && cd ..
```

```bash
cd crm && npm install && npm run build && cd ..
cd human-resources && npm install && npm run build && cd ..
cd perks && npm install && npm run build && cd ..
cd time-tracking && npm install && npm run build && cd ..
```

Once built, the mini apps will be pulled into the Android and iOS projects automatically when the native superapps are built.

# Auth info

The usernames and passwords are as follows.
| username | password | role |
|------- | -------- | ------ |
| jeremiah@supernova.com | il0vedogs | contractor
| tanya@supernova.com | il0vedogs | manger 
| trevor@supernova.com | il0vedogs | sales

# Android Supabase Configuration

The Android superapp is configured to look for the Supabase instance at the default host IP address from the perspective of an emulator: `http://10.0.2.2:54321`. If you are testing this demo on a physical device you will need to change this URL to point to the host running the Supabase instance. The URL is located in the DataManager class: https://github.com/ionic-team/portals-super-app-demo/blob/a0747b07a747458d2a7e504442d227924eca926f/android/app/src/main/java/io/ionic/superapp/data/DataManager.kt#L22

# Android Live Update Demo

To test Live Updates with the Time Tracking app, change the `appflow_id` of the app in the `apps` table in Supabase to `798e6905` and restart the app.

# Running Database Migrations

If the database has changed since your last cloning of the project, pull down updates and then run `npx supabase db reset`. Note that this will remove any data previously added to the DB.
