# The E Chronicles — realtime admin setup

## What changed
- Admin writes no longer go through GitHub or require a GitHub personal access token.
- Site data is stored as separate Firestore documents under `siteData`, so changing one section cannot overwrite another section.
- Public pages listen to Firestore with `onSnapshot`, so admin changes appear live without waiting for a GitHub Pages rebuild/cache refresh.
- The old hard-coded admin password/token flow is removed.
- `data/ec-data.json` is retained as a local fallback and has been repaired (the old file had an invalid trailing comma).

## One-time Firebase setup
1. Open Firebase Console for project **e-chronicles**.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Create your admin user under **Authentication → Users**.
4. Create Firestore database if it is not already enabled.
5. In Firestore, create:
   - collection: `config`
   - document: `admins`
   - field: `emails` (array)
   - add your admin email as an array value, e.g. `["your-email@example.com"]`
6. Publish `firestore.rules` from this repository, or paste its contents into Firestore Rules.
7. Open `admin-ec2027.html` and sign in with that Firebase email/password.
8. On the first admin load, the existing `data/ec-data.json` is automatically seeded into Firestore if `siteData` is empty.

## Important
The Firebase web config is intentionally client-visible. Security comes from Firebase Authentication + Firestore Rules, not from hiding the config.

## Optional Firebase CLI deployment
From the project folder:

    firebase deploy --only firestore:rules

If you do not use the Firebase CLI, deploy the same rules from the Firebase Console.
