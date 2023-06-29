# Portals Super App Demo

To get started have Docker installed and then run `npx supabase start` from the root of the project.

Go into each web app directory starting with `supabaseApi` and `npm install` them. Run `npm run build` for the CRM, Human Resources, Perks, and Time Tracking apps:

```bash
cd web/
cd supabaseApi && npm install && cd ..
```

```bash
cd crm && npm install && npm build && cd ..
cd human-resources && npm install && npm build && cd ..
cd perks && npm install && npm build && cd ..
cd time-tracking && npm install && npm build && cd ..
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

# Temporary Android Workaround

The web apps are currently hardcoded to `localhost` to look for the Supabase instance but when running the Android app it needs to point to the host machine IP (default `10.0.2.2` when testing on an Android emulator). Update this hardcoded URL in the following files:

```
/web/perks/src/supabase-api/index.ts
/web/supabaseApi/supabaseApi.ts
```

Once changed, make sure to rebuild the web apps. This will be adjusted to work differently in a future update.

# Running Database Migrations

If the database has changed since your last cloning of the project, pull down updates and then run `npx supabase db reset`. Note that this will remove any data previously added to the DB.