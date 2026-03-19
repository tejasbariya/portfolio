const DATA = {
  name: "Tejash Bariya",
  initials: "TB",
  role: "Full-Stack Developer",
  tagline: "I write code that ships.",
  email: "tejashbariya@gmail.com",
  formEndpoint: "https://formspree.io/f/xaqpalbv",

  socials: [
    {
      label: "GitHub",
      url: "https://github.com/tejasbariya",
      display: "github.com/tejasbariya",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/tejash-bariya/",
      display: "linkedin.com/in/tejash-bariya",
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/TejasBariya/",
      display: "leetcode.com/TejasBariya",
    },
  ],

  stack: [
    "JavaScript","Node.js","Express.js","AngularJS",
    "MongoDB","HTML5","CSS3","Git","REST APIs","BCrypt","Mongoose",
  ],

  focus: [
    "Full-Stack Development",
    "SPA Architecture",
    "REST API Design",
    "Auth & Session Flows",
  ],

  learning: ["React","TypeScript","Docker","System Design"],

  terminal: [
    { cmd: "whoami",             out: "tejash-bariya",              hi: true  },
    { cmd: "cat stack.txt",      out: "JS · Node.js · AngularJS · MongoDB", hi: false },
    { cmd: "echo $approach",     out: "build → test → ship → repeat", hi: true  },
    { cmd: "git log --oneline",  out: "4 repos · always building",  hi: false },
  ],

  projects: [
    {
      id: 1,
      title: "Digital Wallet System",
      desc: "Full-stack banking simulation. Register, receive 1000 coins, send money peer-to-peer, and track chronological transactions. BCrypt hashing, localStorage sessions, overdraft & self-transfer guards.",
      tags: ["Node.js","Express.js","MongoDB","AngularJS","BCrypt"],
      cat: "fullstack",
      github: "https://github.com/tejasbariya/digital-wallet-system",
      live: "",
      fork: false,
    },
    {
      id: 2,
      title: "FreshTrack",
      desc: "Grocery management SPA in AngularJS. Component-based architecture with ngRoute, user-specific data isolation, real-time budget bar, and instant search filtering.",
      tags: ["AngularJS","JavaScript","localStorage","CSS3","ngRoute"],
      cat: "frontend",
      github: "https://github.com/tejasbariya/fresh-track",
      live: "",
      fork: false,
    },
    {
      id: 3,
      title: "Music SPA",
      desc: "In-browser music player as a Single Page Application. Auth, client-side routing, and audio playback. Clean separation: pages, songs, styles, auth — all modular.",
      tags: ["AngularJS","JavaScript","HTML5","CSS3"],
      cat: "frontend",
      github: "https://github.com/tejasbariya/music-spa",
      live: "",
      fork: false,
    },
    {
      id: 4,
      title: "TimetableMaster",
      desc: "AI-powered scheduling for higher education. Resolves faculty constraints, infrastructure limits, and dynamic curricula to output clash-free, optimised timetables automatically.",
      tags: ["AI","Scheduling","Optimisation","Higher Ed"],
      cat: "ai",
      github: "https://github.com/tejasbariya/TimetableMaster",
      live: "",
      fork: true,
    },
  ],
};
