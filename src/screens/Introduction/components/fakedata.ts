export interface IPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  createdAt: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  group?: {
    id: string;
    name: string;
  };
  privacy: "public" | "friends" | "private";
  timeAgo: string;
}

// 50 posts
export const fakePosts: IPost[] = [
  {
    id: "post1",
    author: {
      id: "user1",
      name: "Kevin Thompson",
      avatar: "https://picsum.photos/id/1/300/200",
    },
    content:
      "G-Dragon has his Daisy Button\nAnd I have a whole team of models wearing full Daisy outfits...",
    images: [
      "https://picsum.photos/id/1/300/200",
      "https://picsum.photos/id/2/300/200",
      "https://picsum.photos/id/3/300/200",
      "https://picsum.photos/id/4/300/200",
    ],
    createdAt: "2023-05-15T08:30:00Z",
    stats: {
      likes: 26,
      comments: 3,
      shares: 1,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "3 hours",
  },
  {
    id: "post2",
    author: {
      id: "user2",
      name: "Muffin Adventure Game",
      avatar: "https://picsum.photos/id/1002/100/100",
    },
    content:
      "Set upgrades, Auto-battle monsters, Earn EXP even offline\nNo need to stay up late to play, just go to sleep and you can...",
    images: ["https://picsum.photos/id/5/300/200"],
    createdAt: "2023-05-15T09:45:00Z",
    stats: {
      likes: 15,
      comments: 2,
      shares: 0,
    },
    group: {
      id: "g4",
      name: "Muffin Adventure Game",
    },
    privacy: "public",
    timeAgo: "2 hours",
  },
  {
    id: "post3",
    author: {
      id: "user3",
      name: "Md Khan",
      avatar: "https://picsum.photos/id/1003/100/100",
    },
    content: "who want these website",
    images: [
      "https://picsum.photos/id/6/300/200",
      "https://picsum.photos/id/7/300/200",
      "https://picsum.photos/id/8/300/200",
      "https://picsum.photos/id/9/300/200",
    ],
    createdAt: "2023-05-15T10:15:00Z",
    stats: {
      likes: 2,
      comments: 1,
      shares: 1,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "20 hours",
  },
  {
    id: "post4",
    author: {
      id: "user4",
      name: "Asif Shaheen",
      avatar: "https://picsum.photos/id/1004/100/100",
    },
    content:
      "https://www.myparentaltips.com/2025/05/best-full-suspension-ebikes.html",
    images: [],
    createdAt: "2023-05-15T11:30:00Z",
    stats: {
      likes: 0,
      comments: 0,
      shares: 0,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "8 hours",
  },
  {
    id: "post5",
    author: {
      id: "user5",
      name: "John Smith",
      avatar: "https://picsum.photos/id/1005/100/100",
    },
    content:
      "Today I completed my first React Native project. Thanks to the community for all the support!",
    images: ["https://picsum.photos/id/10/300/200"],
    createdAt: "2023-05-15T12:45:00Z",
    stats: {
      likes: 45,
      comments: 12,
      shares: 3,
    },
    group: {
      id: "g6",
      name: "Mobile Developer Community",
    },
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post6",
    author: {
      id: "user6",
      name: "Emily Johnson",
      avatar: "https://picsum.photos/id/1006/100/100",
    },
    content:
      "My trip to Da Lat last weekend was amazing. Sharing some memorable moments with everyone.",
    images: [
      "https://picsum.photos/id/11/300/200",
      "https://picsum.photos/id/12/300/200",
      "https://picsum.photos/id/13/300/200",
    ],
    createdAt: "2023-05-15T13:15:00Z",
    stats: {
      likes: 78,
      comments: 23,
      shares: 5,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "1 day",
  },
  {
    id: "post7",
    author: {
      id: "user7",
      name: "Michael Williams",
      avatar: "https://picsum.photos/id/1008/100/100",
    },
    content:
      "Does anyone have experience fixing the \"Cannot read property 'map' of undefined\" error in React Native? Please help!",
    images: [],
    createdAt: "2023-05-15T14:30:00Z",
    stats: {
      likes: 3,
      comments: 15,
      shares: 0,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "6 hours",
  },
  {
    id: "post8",
    author: {
      id: "user8",
      name: "Sarah Brown",
      avatar: "https://picsum.photos/id/1009/100/100",
    },
    content:
      "Just got a new camera, took some test shots. Any feedback would be appreciated!",
    images: [
      "https://picsum.photos/id/14/300/200",
      "https://picsum.photos/id/15/300/200",
    ],
    createdAt: "2023-05-15T15:45:00Z",
    stats: {
      likes: 56,
      comments: 18,
      shares: 2,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "12 hours",
  },
  {
    id: "post9",
    author: {
      id: "user9",
      name: "David Jones",
      avatar: "https://picsum.photos/id/1010/100/100",
    },
    content:
      "Just finished a basic AI course. It was really interesting and useful. If anyone is interested, message me for the materials!",
    images: [],
    createdAt: "2023-05-15T16:30:00Z",
    stats: {
      likes: 34,
      comments: 27,
      shares: 8,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post10",
    author: {
      id: "user10",
      name: "Jessica Miller",
      avatar: "https://picsum.photos/id/1011/100/100",
    },
    content:
      "New game review: Muffin Adventure - Fantasy MMO Adventure. The game has cute graphics, simple but engaging gameplay. You can even play offline!",
    images: ["https://picsum.photos/id/16/300/200"],
    createdAt: "2023-05-15T17:15:00Z",
    stats: {
      likes: 89,
      comments: 32,
      shares: 15,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post11",
    author: {
      id: "user11",
      name: "Daniel Davis",
      avatar: "https://picsum.photos/id/1012/100/100",
    },
    content:
      "Sharing some useful tips when working with CSS Flexbox in React Native",
    images: ["https://picsum.photos/id/17/300/200"],
    createdAt: "2023-05-15T18:30:00Z",
    stats: {
      likes: 67,
      comments: 14,
      shares: 9,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post12",
    author: {
      id: "user12",
      name: "Jennifer Garcia",
      avatar: "https://picsum.photos/id/1013/100/100",
    },
    content:
      "Does anyone know how to integrate Firebase Authentication into a React Native app? I'm having some issues.",
    images: [],
    createdAt: "2023-05-15T19:45:00Z",
    stats: {
      likes: 12,
      comments: 23,
      shares: 1,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "10 hours",
  },
  {
    id: "post13",
    author: {
      id: "user13",
      name: "Christopher Rodriguez",
      avatar: "https://picsum.photos/id/1014/100/100",
    },
    content:
      "Just completed a project using AI to analyze sales data. The results are amazing!",
    images: [
      "https://picsum.photos/id/18/300/200",
      "https://picsum.photos/id/19/300/200",
    ],
    createdAt: "2023-05-15T20:15:00Z",
    stats: {
      likes: 45,
      comments: 17,
      shares: 6,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "friends",
    timeAgo: "1 day",
  },
  {
    id: "post14",
    author: {
      id: "user14",
      name: "Amanda Martinez",
      avatar: "https://picsum.photos/id/1015/100/100",
    },
    content:
      "My recent trip to the Northwest. The scenery was beautiful, I definitely need to go back!",
    images: [
      "https://picsum.photos/id/20/300/200",
      "https://picsum.photos/id/21/300/200",
      "https://picsum.photos/id/22/300/200",
      "https://picsum.photos/id/23/300/200",
      "https://picsum.photos/id/24/300/200",
    ],
    createdAt: "2023-05-15T21:30:00Z",
    stats: {
      likes: 123,
      comments: 45,
      shares: 23,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "public",
    timeAgo: "3 days",
  },
  {
    id: "post15",
    author: {
      id: "user15",
      name: "Matthew Wilson",
      avatar: "https://picsum.photos/id/1001/100/100",
    },
    content:
      "I'm learning about React Native Navigation. Does anyone have good resources?",
    images: [],
    createdAt: "2023-05-15T22:45:00Z",
    stats: {
      likes: 8,
      comments: 19,
      shares: 0,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "15 hours",
  },
  {
    id: "post16",
    author: {
      id: "user16",
      name: "Elizabeth Anderson",
      avatar: "https://picsum.photos/id/1002/100/100",
    },
    content:
      "Just bought a great programming book set. Anyone want to borrow it?",
    images: ["https://picsum.photos/id/25/300/200"],
    createdAt: "2023-05-16T08:15:00Z",
    stats: {
      likes: 34,
      comments: 12,
      shares: 2,
    },
    group: {
      id: "g8",
      name: "Programming Knowledge Sharing",
    },
    privacy: "friends",
    timeAgo: "2 days",
  },
  {
    id: "post17",
    author: {
      id: "user17",
      name: "Andrew Thomas",
      avatar: "https://picsum.photos/id/1003/100/100",
    },
    content:
      "I just attended an AI workshop in Ho Chi Minh City. Lots of useful knowledge!",
    images: [
      "https://picsum.photos/id/26/300/200",
      "https://picsum.photos/id/27/300/200",
    ],
    createdAt: "2023-05-16T09:30:00Z",
    stats: {
      likes: 56,
      comments: 23,
      shares: 7,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post18",
    author: {
      id: "user18",
      name: "Stephanie Taylor",
      avatar: "https://picsum.photos/id/1004/100/100",
    },
    content:
      "Does anyone know how to optimize performance for React Native apps? My app is lagging.",
    images: [],
    createdAt: "2023-05-16T10:45:00Z",
    stats: {
      likes: 15,
      comments: 28,
      shares: 1,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "9 hours",
  },
  {
    id: "post19",
    author: {
      id: "user19",
      name: "Joshua Jackson",
      avatar: "https://picsum.photos/id/1005/100/100",
    },
    content:
      "Sharing some photos from our photography group's offline meetup last weekend.",
    images: [
      "https://picsum.photos/id/28/300/200",
      "https://picsum.photos/id/29/300/200",
      "https://picsum.photos/id/30/300/200",
    ],
    createdAt: "2023-05-16T11:15:00Z",
    stats: {
      likes: 78,
      comments: 34,
      shares: 12,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post20",
    author: {
      id: "user20",
      name: "Nicole White",
      avatar: "https://picsum.photos/id/1006/100/100",
    },
    content:
      "Muffin Adventure Game review after 1 week: Simple but engaging gameplay, cute graphics, can be played offline. Rating: 9/10!",
    images: ["https://picsum.photos/id/31/300/200"],
    createdAt: "2023-05-16T12:30:00Z",
    stats: {
      likes: 92,
      comments: 45,
      shares: 18,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post21",
    author: {
      id: "user1",
      name: "Kevin Thompson",
      avatar: "https://picsum.photos/id/1001/100/100",
    },
    content:
      "Just attended an AI workshop in Hanoi. Lots of useful knowledge and great networking!",
    images: [
      "https://picsum.photos/id/32/300/200",
      "https://picsum.photos/id/33/300/200",
    ],
    createdAt: "2023-05-16T13:45:00Z",
    stats: {
      likes: 67,
      comments: 21,
      shares: 5,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post22",
    author: {
      id: "user2",
      name: "Emily Johnson",
      avatar: "https://picsum.photos/id/1002/100/100",
    },
    content:
      "Does anyone know how to fix errors when using React Navigation with TypeScript?",
    images: [],
    createdAt: "2023-05-16T14:30:00Z",
    stats: {
      likes: 8,
      comments: 17,
      shares: 0,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "8 hours",
  },
  {
    id: "post23",
    author: {
      id: "user3",
      name: "Michael Williams",
      avatar: "https://picsum.photos/id/1003/100/100",
    },
    content:
      "Sharing some photos from the React Native Developer group's offline meetup in Ho Chi Minh City last weekend.",
    images: [
      "https://picsum.photos/id/34/300/200",
      "https://picsum.photos/id/35/300/200",
      "https://picsum.photos/id/36/300/200",
      "https://picsum.photos/id/37/300/200",
    ],
    createdAt: "2023-05-16T15:15:00Z",
    stats: {
      likes: 89,
      comments: 32,
      shares: 14,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post24",
    author: {
      id: "user4",
      name: "David Wilson",
      avatar: "https://picsum.photos/id/1004/100/100",
    },
    content:
      "I just completed a Machine Learning course. If anyone is interested, message me for the materials!",
    images: ["https://picsum.photos/id/38/300/200"],
    createdAt: "2023-05-16T16:30:00Z",
    stats: {
      likes: 45,
      comments: 28,
      shares: 12,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "friends",
    timeAgo: "2 days",
  },
  {
    id: "post25",
    author: {
      id: "user5",
      name: "Rebecca Martin",
      avatar: "https://picsum.photos/id/1005/100/100",
    },
    content:
      "Looking for recommendations for good React Native UI libraries. What are you using in your projects?",
    images: [],
    createdAt: "2023-05-16T17:45:00Z",
    stats: {
      likes: 12,
      comments: 34,
      shares: 2,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "4 hours",
  },
  {
    id: "post26",
    author: {
      id: "user6",
      name: "Thomas Anderson",
      avatar: "https://picsum.photos/id/1006/100/100",
    },
    content:
      "Just released my new game on the app store! Check it out and let me know what you think.",
    images: [
      "https://picsum.photos/id/39/300/200",
      "https://picsum.photos/id/40/300/200",
    ],
    createdAt: "2023-05-16T18:30:00Z",
    stats: {
      likes: 67,
      comments: 23,
      shares: 15,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "6 hours",
  },
  {
    id: "post27",
    author: {
      id: "user7",
      name: "Jennifer White",
      avatar: "https://picsum.photos/id/1008/100/100",
    },
    content: "Beautiful sunset at the beach today. Nature is truly amazing!",
    images: [
      "https://picsum.photos/id/41/300/200",
      "https://picsum.photos/id/42/300/200",
      "https://picsum.photos/id/43/300/200",
    ],
    createdAt: "2023-05-16T19:15:00Z",
    stats: {
      likes: 123,
      comments: 45,
      shares: 34,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "public",
    timeAgo: "8 hours",
  },
  {
    id: "post28",
    author: {
      id: "user8",
      name: "Robert Johnson",
      avatar: "https://picsum.photos/id/1009/100/100",
    },
    content:
      "Just finished implementing a complex animation in React Native. It was challenging but worth it!",
    images: ["https://picsum.photos/id/44/300/200"],
    createdAt: "2023-05-16T20:30:00Z",
    stats: {
      likes: 56,
      comments: 18,
      shares: 7,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "10 hours",
  },
  {
    id: "post29",
    author: {
      id: "user9",
      name: "Michelle Davis",
      avatar: "https://picsum.photos/id/1010/100/100",
    },
    content:
      "Looking for photography enthusiasts in London for a weekend photoshoot. Anyone interested?",
    images: [
      "https://picsum.photos/id/45/300/200",
      "https://picsum.photos/id/46/300/200",
    ],
    createdAt: "2023-05-16T21:45:00Z",
    stats: {
      likes: 34,
      comments: 28,
      shares: 5,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "12 hours",
  },
  {
    id: "post30",
    author: {
      id: "user10",
      name: "Brian Miller",
      avatar: "https://picsum.photos/id/1011/100/100",
    },
    content:
      "Just started learning about AI and machine learning. Any good resources for beginners?",
    images: [],
    createdAt: "2023-05-16T22:15:00Z",
    stats: {
      likes: 23,
      comments: 45,
      shares: 3,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "14 hours",
  },
  {
    id: "post31",
    author: {
      id: "user11",
      name: "Laura Thompson",
      avatar: "https://picsum.photos/id/1012/100/100",
    },
    content:
      "Does anyone have experience with React Native Web? I'm trying to build a cross-platform app.",
    images: [],
    createdAt: "2023-05-16T23:30:00Z",
    stats: {
      likes: 15,
      comments: 32,
      shares: 2,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "16 hours",
  },
  {
    id: "post32",
    author: {
      id: "user12",
      name: "Steven Clark",
      avatar: "https://picsum.photos/id/1013/100/100",
    },
    content:
      "Just got back from a hiking trip in the mountains. The views were breathtaking!",
    images: [
      "https://picsum.photos/id/47/300/200",
      "https://picsum.photos/id/48/300/200",
      "https://picsum.photos/id/49/300/200",
      "https://picsum.photos/id/50/300/200",
    ],
    createdAt: "2023-05-17T08:15:00Z",
    stats: {
      likes: 89,
      comments: 34,
      shares: 12,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "1 day",
  },
  {
    id: "post33",
    author: {
      id: "user13",
      name: "Patricia Rodriguez",
      avatar: "https://picsum.photos/id/1014/100/100",
    },
    content:
      "Just completed a project using React Native and Firebase. It was a great learning experience!",
    images: ["https://picsum.photos/id/51/300/200"],
    createdAt: "2023-05-17T09:30:00Z",
    stats: {
      likes: 45,
      comments: 23,
      shares: 8,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post34",
    author: {
      id: "user14",
      name: "Mark Wilson",
      avatar: "https://picsum.photos/id/1015/100/100",
    },
    content:
      "Looking for beta testers for my new mobile game. Anyone interested?",
    images: ["https://picsum.photos/id/52/300/200"],
    createdAt: "2023-05-17T10:45:00Z",
    stats: {
      likes: 34,
      comments: 56,
      shares: 12,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post35",
    author: {
      id: "user15",
      name: "Sandra Martinez",
      avatar: "https://picsum.photos/id/1001/100/100",
    },
    content:
      "Just took some amazing photos with my new camera. What do you think?",
    images: [
      "https://picsum.photos/id/53/300/200",
      "https://picsum.photos/id/54/300/200",
      "https://picsum.photos/id/55/300/200",
    ],
    createdAt: "2023-05-17T11:15:00Z",
    stats: {
      likes: 78,
      comments: 34,
      shares: 15,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post36",
    author: {
      id: "user16",
      name: "Daniel Brown",
      avatar: "https://picsum.photos/id/1002/100/100",
    },
    content:
      "Just implemented a complex algorithm for my AI project. The results are promising!",
    images: ["https://picsum.photos/id/56/300/200"],
    createdAt: "2023-05-17T12:30:00Z",
    stats: {
      likes: 56,
      comments: 23,
      shares: 9,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post37",
    author: {
      id: "user17",
      name: "Jessica Taylor",
      avatar: "https://picsum.photos/id/1003/100/100",
    },
    content:
      "Does anyone know how to fix the 'Cannot read property of undefined' error in React Native?",
    images: [],
    createdAt: "2023-05-17T13:45:00Z",
    stats: {
      likes: 12,
      comments: 45,
      shares: 2,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post38",
    author: {
      id: "user18",
      name: "Christopher Lee",
      avatar: "https://picsum.photos/id/1004/100/100",
    },
    content:
      "Just released a new version of my React Native UI library. Check it out!",
    images: [
      "https://picsum.photos/id/57/300/200",
      "https://picsum.photos/id/58/300/200",
    ],
    createdAt: "2023-05-17T14:15:00Z",
    stats: {
      likes: 67,
      comments: 34,
      shares: 23,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "3 days",
  },
  {
    id: "post39",
    author: {
      id: "user19",
      name: "Amanda Harris",
      avatar: "https://picsum.photos/id/1005/100/100",
    },
    content:
      "My trip to Paris was amazing! Here are some photos from the Eiffel Tower.",
    images: [
      "https://picsum.photos/id/59/300/200",
      "https://picsum.photos/id/60/300/200",
      "https://picsum.photos/id/61/300/200",
    ],
    createdAt: "2023-05-17T15:30:00Z",
    stats: {
      likes: 123,
      comments: 56,
      shares: 34,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "3 days",
  },
  {
    id: "post40",
    author: {
      id: "user20",
      name: "Michael Johnson",
      avatar: "https://picsum.photos/id/1006/100/100",
    },
    content:
      "Just finished playing the new Muffin Adventure Game. It's really addictive!",
    images: ["https://picsum.photos/id/62/300/200"],
    createdAt: "2023-05-17T16:45:00Z",
    stats: {
      likes: 45,
      comments: 23,
      shares: 12,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "3 days",
  },
  {
    id: "post41",
    author: {
      id: "user1",
      name: "Kevin Thompson",
      avatar: "https://picsum.photos/id/1001/100/100",
    },
    content:
      "Just implemented a neural network for image recognition. The accuracy is impressive!",
    images: [
      "https://picsum.photos/id/63/300/200",
      "https://picsum.photos/id/64/300/200",
    ],
    createdAt: "2023-05-17T17:15:00Z",
    stats: {
      likes: 67,
      comments: 34,
      shares: 15,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "4 days",
  },
  {
    id: "post42",
    author: {
      id: "user2",
      name: "Emily Johnson",
      avatar: "https://picsum.photos/id/1002/100/100",
    },
    content:
      "Does anyone know how to implement custom animations in React Native?",
    images: [],
    createdAt: "2023-05-17T18:30:00Z",
    stats: {
      likes: 23,
      comments: 45,
      shares: 3,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "4 days",
  },
  {
    id: "post43",
    author: {
      id: "user3",
      name: "Michael Williams",
      avatar: "https://picsum.photos/id/1003/100/100",
    },
    content:
      "Just completed a React Native project for a client. It was challenging but rewarding!",
    images: ["https://picsum.photos/id/65/300/200"],
    createdAt: "2023-05-17T19:45:00Z",
    stats: {
      likes: 56,
      comments: 23,
      shares: 8,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "4 days",
  },
  {
    id: "post44",
    author: {
      id: "user4",
      name: "David Wilson",
      avatar: "https://picsum.photos/id/1004/100/100",
    },
    content:
      "Just got back from a photography workshop. Learned so many new techniques!",
    images: [
      "https://picsum.photos/id/66/300/200",
      "https://picsum.photos/id/67/300/200",
      "https://picsum.photos/id/68/300/200",
    ],
    createdAt: "2023-05-17T20:15:00Z",
    stats: {
      likes: 78,
      comments: 34,
      shares: 12,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "5 days",
  },
  {
    id: "post45",
    author: {
      id: "user5",
      name: "Rebecca Martin",
      avatar: "https://picsum.photos/id/1005/100/100",
    },
    content:
      "Just implemented a complex UI in React Native. It was challenging but worth it!",
    images: ["https://picsum.photos/id/69/300/200"],
    createdAt: "2023-05-17T21:30:00Z",
    stats: {
      likes: 45,
      comments: 23,
      shares: 7,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "5 days",
  },
  {
    id: "post46",
    author: {
      id: "user6",
      name: "Thomas Anderson",
      avatar: "https://picsum.photos/id/1006/100/100",
    },
    content:
      "My trip to the mountains last weekend. The views were breathtaking!",
    images: [
      "https://picsum.photos/id/70/300/200",
      "https://picsum.photos/id/71/300/200",
      "https://picsum.photos/id/72/300/200",
      "https://picsum.photos/id/73/300/200",
    ],
    createdAt: "2023-05-17T22:45:00Z",
    stats: {
      likes: 123,
      comments: 56,
      shares: 34,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "5 days",
  },
  {
    id: "post47",
    author: {
      id: "user7",
      name: "Jennifer White",
      avatar: "https://picsum.photos/id/1008/100/100",
    },
    content:
      "Just finished playing the new RPG game. The storyline is amazing!",
    images: ["https://picsum.photos/id/74/300/200"],
    createdAt: "2023-05-18T08:15:00Z",
    stats: {
      likes: 56,
      comments: 34,
      shares: 12,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "6 days",
  },
  {
    id: "post48",
    author: {
      id: "user8",
      name: "Robert Johnson",
      avatar: "https://picsum.photos/id/1009/100/100",
    },
    content:
      "Just implemented a machine learning algorithm for my project. The results are promising!",
    images: [
      "https://picsum.photos/id/75/300/200",
      "https://picsum.photos/id/76/300/200",
    ],
    createdAt: "2023-05-18T09:30:00Z",
    stats: {
      likes: 67,
      comments: 23,
      shares: 9,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "6 days",
  },
  {
    id: "post49",
    author: {
      id: "user9",
      name: "Michelle Davis",
      avatar: "https://picsum.photos/id/1010/100/100",
    },
    content:
      "Does anyone know how to optimize React Native performance for large lists?",
    images: [],
    createdAt: "2023-05-18T10:45:00Z",
    stats: {
      likes: 23,
      comments: 45,
      shares: 3,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "6 days",
  },
  {
    id: "post50",
    author: {
      id: "user10",
      name: "Brian Miller",
      avatar: "https://picsum.photos/id/1011/100/100",
    },
    content:
      "Just completed a React Native project with TypeScript. It was a great learning experience!",
    images: ["https://picsum.photos/id/77/300/200"],
    createdAt: "2023-05-18T11:15:00Z",
    stats: {
      likes: 45,
      comments: 23,
      shares: 8,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "7 days",
  },
];
