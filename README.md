# Fastmodel Sports Takehome!

**Problem:**
We want to build a cash register with a few different functionalities!

-   Building a cash register application using React 
   - How I handled our state. [Context API](https://react.dev/reference/react/createContext#createcontext) [Use Reducer](https://react.dev/reference/react/useReducer)
   - I like compositional design patterns when possible. I find it helps localize our state and avoids prop drilling.

   - Initial thoughts
      - Best practice dictates that calculations like reducing our object into other shapes should probably happen on the backend (ideally with a language that supports many different methods to handle this). Because this is a frontend assignment, I'm going to go ahead and leverage state as opposed to an outside data structure as much as possible. In a perfect world, we would have the core data and computations outside of our frontend application to enhance our application's scalability.
      - Solving this problem doesn't require context and useReducer but we're going to leverage those tools anyways. The easier approach would be to just have component localized state, drill props down a level or two and build the application accordingly. I'll probably rebuild this with [preact/signals](https://preactjs.com/guide/v10/signals/) and/or [Jotai](https://jotai.org/) for fun just to see how different it looks!

**Solution:**

-   #### A Scalable Cash Register!
   I would like to preface this with the application as it's written is absolutely overkill. The cash register grows/shrinks depending on the input that you give it so you can have a bunch of different cash registers that support different bills. I went about it this way because at the start, I was like "Man, it'd be cool to have a scalable cash register and to use the context API or useReducer" and the assignment began growing in scope and difficulty. We as engineers know that we can't let the computer win and I won't back down from a challenge. This assignment is the result of the war I had with Skynet; the computer started it.

   - Features.
      -   A cash register that can support N bills and will initialize accordingly. 
      -   A cash register that can add or remove 1 count of each bill you passed in initially.
      -   A cash register that can transact or throw exceptions based on a number you've given to the transaction input field.
      -   Allowing a user to type in bill amounts per bill, adjusting the bill collection accordingly.
      -   Not letting the computer win. Enlist me John Connor.

### Frontend:

---

**React**
-   The takehome requirement. My favorite JavaScript/TypeScript library!

**Typescript**
-   Predictable types allow us to prevent errors and write better code from the get go. Even before building, Typescript allows us to write accurate code at the cost of spending a little more time gathering types from libraries we haven't written. I believe that the tradeoffs of that time spent are well worth the effort in a team environment as it makes it easier for everyone to debug code as long as we aren't typing everything as "any".
-   Allows us to avoid writing tests to check the types of inputs and outputs of functions because we're statically typing our variables and functions.
-   This is just what I prefer to use, I'm also well versed in Vanilla JavaScript if that's your jam.

[**Vite**](https://vitejs.dev/guide/)

-   I'm biased here. Industry standard prefers webpack, but there's something to be said about bundle size, how it affects performance, and the difference between the HMR performance between Vite and webpack. Vite is faster in many, many cases, has a smaller bundle size, and is easy enough to tool though it currently has less support being the new kid on the block. It might also become problematic if we need to get really deep into the bundler itself to address issues as it abstracts away a lot of concerns for us whereas webpack gives us control and granularity on a level that Vite just doesn't. I think the most important point is that for smaller applications, I will almost always choose Vite, and if there are massive applications, it might make more sense to go with webpack or Turbopack. I want my devX!
-   Comes with a ton of QOL features like HMR out of the box and doesn't require us to spend precious time trying to get it up and optimize it like with webpack. Because there are fewer dependencies, our config stays rather small which means fewer things our team needs to maintain.
-   Way smaller than CRA.
-   Has fewer customizability options than webpack at the moment, but allows a developer to get somewhat granular by adjusting the vite.config file if we need to import pacakages like turning SVG's into React Components [SVGR](https://www.npmjs.com/package/vite-plugin-svgr), etc.

**Vanilla CSS**

- Because the application was small, I opted for Vanilla CSS. If this were a larger project that required more complex styles or better organization, I'd likely have opted for Sassy CSS if it were a solo project (I like my complex animations), or TailwindCSS because I find that TailwindCSS styles enable teams with easier to read and localized styles.

## Prerequisites

-   Updated VSCode - Opening this on my laptop resulted in TS errors until I updated VSCode. Don't know if this will be a problem.
-   NPM (v9)
-   NodeJS (v18)

## Getting Started

### Installation

#### Step 1:

    npm install

at the root directory to install all the necessary dependencies for the frontend project.

#### Step 2:

With all the dependencies installed, you should now be able to run our dev script:

    npm run dev

## Considerations

- This would have been way easier had I just supported the starting array of 5 bills and designed the application accordingly, but I like to implement at minimum, 1 thing that I'm uncomfortable with for every take home that I do. I find that take homes are a great opportunity for me to grow as an engineer and to set myself apart by providing you (hopefully) some interesting code to read.
- Are there libraries that I could have leveraged using a method like mapValues instead of running reduce everywhere? Yes, looking at you [Lodash](https://www.npmjs.com/package/lodash.mapvalues). I wanted to keep this project as dependency agnostic as possible, so I didn't!
- Code organization could be different. This is an example of how I organize things because it intuitively makes sense to me, especially for a small project.
- If we were trying to make this more mobile-first or responsive, we could leverage media queries to support screen sizes!