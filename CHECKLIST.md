- with bun as pkg manager
- install nextjs
- remove files from `public/*`
- clear `globals.css`
- clear `page.tsx`
- install shadcn
- install shadcn components -> `button, label, input, sonner` - for now i will add all
- show button & test `dev` server

== PART 1 ==

- install Better Auth npm install better-auth
- create .env and set Environment Variables
- create lib/auth.ts
- setup postgres database with neon.tech
- install prisma npm install prisma --save-dev
- initialize prisma npx prisma init
- create Post Model

- npx prisma generate
- npx prisma db push
- npx prisma studio

- push database changes npx prisma db push
- add generated to .gitignore
- adjust scripts in package.json
- create single Prisma Client in lib/prisma.ts
- setup prisma adapter with better-auth
- generate auth tables npx @better-auth/cli generate --output=auth.schema.prisma
- make tweaks to schema.prisma
- quick walkthrough the models:
    User
    Session
    Account
    Verification
- push database changes npx prisma db push
- create Mount Handler in app/api/auth/[...all]/route.ts
- adjust eslint.config.mjs to ignore /src/generated/**/*
- create Client instance in lib/auth-client.ts
- Enable Email & Password Authentication
- Create Sign Up Page PT1
- Create Form components/register-form.tsx
            Note - Better Auth needs name field, if you don't want to put then just put hidden input field with blank name
- Log Form Values
- Setup Sonner
- Create Sign Up Page PT2
- Add Form Validation
- Destructure SignUp Function
- Showcase onError
            by default, better auth password validation is 8 char long
- OPTIONS - minPasswordLength
            better auth signed user automatically on register unless email verification is on, by default email verification is off so on registeration it generates cookie and store it in cookieStorage in browser on user registeration
- Create Sign Up Page PT3
- Sign Up default automatically signs in the user
- Show Session on Profile Page
- Show Data in Neon Dashboard
- Sign Out User
- Destructure SignOut Function
- Show Removed Cookies
- Create Sign In Page PT1
- Create Form components/login-form.tsx
- Log Form Values
- Destructure SignIn Function
- Show Unauthorized on Profile Page
- Create Sign In Page PT2
- Showcase onError
- Sign In User
FINISH PART 1

== PART 2 ==
- Showcase onRequest and onResponse
- Showcase Full Cycle Again
- Add Convenience Links for Auth Pages
- OPTIONS - autoSignIn
- Showcase
- OPTIONS - advanced.database.generateId
- Table IDs (change schema.prisma and push)
- Showcase
- Truncate Tables
- OPTIONS - emailAndPassword.password
- Create User
- Argon2 npm install @node-rs/argon2
- Add to next.config.ts
- Create Utilities lib/argon2.ts
- Add to lib/auth.ts
- Showcase
- Truncate Tables
- Create User
- Sign Up User via SERVER ACTIONS
- Create Action
- Log Form Values
- Sign Up User on Server
- Sign In User via SERVER ACTIONS PT1 HERE HERE HERE
- Create Action
- Log Form Values
- Sign In User on Server
            when working with server action, you have to set cookies api manually to send cookies with request, better make so simple by just adding plugin name nextCookies()
- Showcase - No Cookies
- Manually Set Cookies
- Showcase - Cookies
- Get Additional Session Properties
- PLUGINS - nextCookies()
FINISH PART 2

== PART 3 ==
- Get Session on Client
- Create Get Started Button
- Destructure useSession
- Showcase
- OPTIONS - session.expiresIn
- Change to 15 seconds
- Showcase
- Change to 30 days
- Middleware
- check for existence of a session cookie
- showcase on auth routes
- Error Handling
- Hooks
- Validate Email
- Transform Name
FINISH PART 3

