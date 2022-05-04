# Backend code review

Hi! I took two approaches for solving the code review accessment

1) Coding
2) Non Coding

<br />

# Non Coding

    Adding some comments to model files will help its readability. Severity of this is very low so I ignored making this change.

<br />

# Coding

    I used git to track my progress and my git commit logs are listed below. You can view the repo [here](https://github.com/ong-gtp/code-review)

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