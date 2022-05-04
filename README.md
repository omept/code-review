# Backend code review

<br />

# Story

```Hi, the thought process I used for the assignment is best seen in the commit message grouping below.   You can use git  to also see the files associated with a commit. The git repo is hosted at https://github.com/ong-gtp/code-review.```

```
Run the following code to start the app
1) npm intall
2) npm run dev
```

```
Run the following code to test the app
1) npm run test
```

<br />


 ### c3e9fbd5  (git commit ID)
-----------------------------------------

-- add environment variable example file

-- add linter config to git and fix code lint error

-- use destructuring in import for Route() in route files

-- remove app cors duplicate found in simulator.router.ts

-- remove unused lodash import in seed.ts

-- add .lean() to mongoose's model's find() calls.

<br />

### c063cb91
-----
-- create a controller for each route and move route methods to respective controller

-- use logging in controller

-- add limit to mongoose calls

-- seed fix for using seeded profile's id

<br />

### af1a5204
-----

-- use camel casing for profileId definitions and in model keys

-- add destructured Simulator save values from req.body to avoid unwanted body parameters

-- TEST

 Favourites:

- test that /api/favourite returns a list of favourites
- test that api/favourite/:profileId return favourites with the requested profileId

 Profiles:

- test that (get) /api/profile returns a list of profiles
- test that (post) /api/profile/ can query an existing profile
- test that (post) /api/profile/ can create a new profile

 Simulation:

- test that /api/simulator returns a list of simulations
- test that (get) /api/simulator/:profileId returns a list of simulations with the profileId
- test that (post) /api/simulator/:profileId creates a simulation with the profileId

<br />

### beeb561e
---
-- clean up package.json and removed unused dependencies

-- add route validation

-- move Log file location

<br />

### cf179966
-----
-- add log description

-- move test files

-- update readme