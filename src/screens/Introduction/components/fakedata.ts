export interface IPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  liked?: boolean;
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
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
    liked: true,
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "7 days",
  },
  {
    id: "post51",
    author: {
      id: "user21",
      name: "Alex Morgan",
      avatar: "https://picsum.photos/id/1020/100/100",
    },
    content:
      "Just got back from an amazing photography workshop in Bali. Here are some of my favorite shots from the trip!",
    images: [
      "https://picsum.photos/id/100/300/200",
      "https://picsum.photos/id/101/300/200",
      "https://picsum.photos/id/102/300/200",
      "https://picsum.photos/id/103/300/200",
      "https://picsum.photos/id/104/300/200",
      "https://picsum.photos/id/105/300/200",
    ],
    createdAt: "2023-05-20T08:15:00Z",
    stats: {
      likes: 145,
      comments: 42,
      shares: 23,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post52",
    author: {
      id: "user22",
      name: "Sophia Chen",
      avatar: "https://picsum.photos/id/1021/100/100",
    },
    content:
      "My React Native journey has been incredible so far. Here are some screenshots from my latest app project. Any feedback would be appreciated!",
    images: [
      "https://picsum.photos/id/106/300/200",
      "https://picsum.photos/id/107/300/200",
      "https://picsum.photos/id/108/300/200",
    ],
    createdAt: "2023-05-20T09:30:00Z",
    stats: {
      likes: 78,
      comments: 31,
      shares: 9,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post53",
    author: {
      id: "user23",
      name: "Ryan Cooper",
      avatar: "https://picsum.photos/id/1022/100/100",
    },
    content:
      "Exploring the beautiful mountains of Switzerland last weekend. The views were absolutely breathtaking!",
    images: [
      "https://picsum.photos/id/109/300/200",
      "https://picsum.photos/id/110/300/200",
      "https://picsum.photos/id/111/300/200",
      "https://picsum.photos/id/112/300/200",
      "https://picsum.photos/id/113/300/200",
      "https://picsum.photos/id/114/300/200",
      "https://picsum.photos/id/115/300/200",
    ],
    createdAt: "2023-05-20T10:45:00Z",
    stats: {
      likes: 234,
      comments: 67,
      shares: 41,
    },
    liked: true,
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "public",
    timeAgo: "3 days",
  },
  {
    id: "post54",
    author: {
      id: "user24",
      name: "Emma Watson",
      avatar: "https://picsum.photos/id/1023/100/100",
    },
    content:
      "Just finished implementing a new AI feature in our app. Here are some screenshots of the interface and data visualizations.",
    images: [
      "https://picsum.photos/id/116/300/200",
      "https://picsum.photos/id/117/300/200",
      "https://picsum.photos/id/118/300/200",
      "https://picsum.photos/id/119/300/200",
    ],
    createdAt: "2023-05-20T11:30:00Z",
    stats: {
      likes: 92,
      comments: 38,
      shares: 17,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post55",
    author: {
      id: "user25",
      name: "Daniel Kim",
      avatar: "https://picsum.photos/id/1024/100/100",
    },
    content:
      "Our gaming studio just released some concept art for our upcoming mobile game. What do you think of these character designs?",
    images: [
      "https://picsum.photos/id/120/300/200",
      "https://picsum.photos/id/121/300/200",
      "https://picsum.photos/id/122/300/200",
      "https://picsum.photos/id/123/300/200",
      "https://picsum.photos/id/124/300/200",
    ],
    createdAt: "2023-05-20T12:45:00Z",
    stats: {
      likes: 156,
      comments: 72,
      shares: 34,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post56",
    author: {
      id: "user26",
      name: "Olivia Martinez",
      avatar: "https://picsum.photos/id/1025/100/100",
    },
    content:
      "Just attended a React Native workshop in Singapore. Here are some photos from the event and the amazing people I met!",
    images: [
      "https://picsum.photos/id/125/300/200",
      "https://picsum.photos/id/126/300/200",
      "https://picsum.photos/id/127/300/200",
    ],
    liked: true,
    createdAt: "2023-05-20T13:15:00Z",
    stats: {
      likes: 87,
      comments: 29,
      shares: 11,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "9 hours",
  },
  {
    id: "post57",
    author: {
      id: "user27",
      name: "James Wilson",
      avatar: "https://picsum.photos/id/1026/100/100",
    },
    content:
      "My recent trip to Japan was incredible! Here are some highlights from Tokyo, Kyoto, and Osaka. The culture, food, and architecture were amazing!",
    images: [
      "https://picsum.photos/id/128/300/200",
      "https://picsum.photos/id/129/300/200",
      "https://picsum.photos/id/130/300/200",
      "https://picsum.photos/id/131/300/200",
      "https://picsum.photos/id/132/300/200",
      "https://picsum.photos/id/133/300/200",
      "https://picsum.photos/id/134/300/200",
      "https://picsum.photos/id/135/300/200",
    ],
    createdAt: "2023-05-20T14:30:00Z",
    stats: {
      likes: 278,
      comments: 93,
      shares: 56,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post58",
    author: {
      id: "user28",
      name: "Ethan Brown",
      avatar: "https://picsum.photos/id/1027/100/100",
    },
    content:
      "Just completed a machine learning project analyzing social media trends. Here are some of the interesting data visualizations we created.",
    images: [
      "https://picsum.photos/id/136/300/200",
      "https://picsum.photos/id/137/300/200",
      "https://picsum.photos/id/138/300/200",
      "https://picsum.photos/id/139/300/200",
    ],
    createdAt: "2023-05-20T15:45:00Z",
    stats: {
      likes: 112,
      comments: 47,
      shares: 23,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "11 hours",
  },
  {
    id: "post59",
    author: {
      id: "user29",
      name: "Isabella Garcia",
      avatar: "https://picsum.photos/id/1028/100/100",
    },
    content:
      "Our photography club's weekend excursion to the national park. We captured some amazing wildlife and landscape shots!",
    images: [
      "https://picsum.photos/id/140/300/200",
      "https://picsum.photos/id/141/300/200",
      "https://picsum.photos/id/142/300/200",
      "https://picsum.photos/id/143/300/200",
      "https://picsum.photos/id/144/300/200",
      "https://picsum.photos/id/145/300/200",
    ],
    createdAt: "2023-05-20T16:30:00Z",
    stats: {
      likes: 189,
      comments: 56,
      shares: 32,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post60",
    author: {
      id: "user30",
      name: "William Taylor",
      avatar: "https://picsum.photos/id/1029/100/100",
    },
    liked: true,
    content:
      "Just released a new version of our React Native UI component library. Here are some examples of the new components in action!",
    images: [
      "https://picsum.photos/id/146/300/200",
      "https://picsum.photos/id/147/300/200",
      "https://picsum.photos/id/148/300/200",
    ],
    createdAt: "2023-05-20T17:15:00Z",
    stats: {
      likes: 76,
      comments: 34,
      shares: 19,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "13 hours",
  },
  {
    id: "post61",
    author: {
      id: "user31",
      name: "Charlotte Johnson",
      avatar: "https://picsum.photos/id/1030/100/100",
    },
    content:
      "Our family vacation to Hawaii was unforgettable! Beautiful beaches, amazing sunsets, and incredible adventures every day.",
    images: [
      "https://picsum.photos/id/149/300/200",
      "https://picsum.photos/id/150/300/200",
      "https://picsum.photos/id/151/300/200",
      "https://picsum.photos/id/152/300/200",
      "https://picsum.photos/id/153/300/200",
      "https://picsum.photos/id/154/300/200",
      "https://picsum.photos/id/155/300/200",
    ],
    createdAt: "2023-05-20T18:30:00Z",
    stats: {
      likes: 245,
      comments: 87,
      shares: 42,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "2 days",
  },
  {
    id: "post62",
    author: {
      id: "user32",
      name: "Noah Anderson",
      avatar: "https://picsum.photos/id/1031/100/100",
    },
    content:
      "Just finished developing a new AI-powered feature for our app. Here are some screenshots of the interface and results.",
    images: [
      "https://picsum.photos/id/156/300/200",
      "https://picsum.photos/id/157/300/200",
      "https://picsum.photos/id/158/300/200",
      "https://picsum.photos/id/159/300/200",
    ],
    createdAt: "2023-05-20T19:45:00Z",
    stats: {
      likes: 98,
      comments: 43,
      shares: 21,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "15 hours",
  },
  {
    id: "post63",
    author: {
      id: "user33",
      name: "Mia Thomas",
      avatar: "https://picsum.photos/id/1032/100/100",
    },
    liked: true,
    content:
      "Our React Native meetup in Berlin was a huge success! Great presentations, networking, and discussions about the future of mobile development.",
    images: [
      "https://picsum.photos/id/160/300/200",
      "https://picsum.photos/id/161/300/200",
      "https://picsum.photos/id/162/300/200",
      "https://picsum.photos/id/163/300/200",
      "https://picsum.photos/id/164/300/200",
    ],
    createdAt: "2023-05-20T20:15:00Z",
    stats: {
      likes: 123,
      comments: 56,
      shares: 28,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post64",
    author: {
      id: "user34",
      name: "Benjamin White",
      avatar: "https://picsum.photos/id/1033/100/100",
    },
    content:
      "Just launched our new mobile game! Here are some screenshots of the gameplay, characters, and environments. Would love your feedback!",
    images: [
      "https://picsum.photos/id/165/300/200",
      "https://picsum.photos/id/166/300/200",
      "https://picsum.photos/id/167/300/200",
      "https://picsum.photos/id/168/300/200",
      "https://picsum.photos/id/169/300/200",
    ],
    createdAt: "2023-05-20T21:30:00Z",
    stats: {
      likes: 167,
      comments: 78,
      shares: 45,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "17 hours",
  },
  {
    id: "post65",
    author: {
      id: "user35",
      name: "Amelia Harris",
      avatar: "https://picsum.photos/id/1034/100/100",
    },
    content:
      "My photography expedition to Iceland was incredible! Glaciers, waterfalls, northern lights, and breathtaking landscapes everywhere.",
    images: [
      "https://picsum.photos/id/170/300/200",
      "https://picsum.photos/id/171/300/200",
      "https://picsum.photos/id/172/300/200",
      "https://picsum.photos/id/173/300/200",
      "https://picsum.photos/id/174/300/200",
      "https://picsum.photos/id/175/300/200",
      "https://picsum.photos/id/176/300/200",
      "https://picsum.photos/id/177/300/200",
      "https://picsum.photos/id/178/300/200",
    ],
    createdAt: "2023-05-20T22:45:00Z",
    stats: {
      likes: 312,
      comments: 94,
      shares: 67,
    },
    liked: true,
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "3 days",
  },
  {
    id: "post66",
    author: {
      id: "user36",
      name: "Henry Clark",
      avatar: "https://picsum.photos/id/1035/100/100",
    },
    content:
      "Just completed a React Native workshop for beginners. Here are some photos from the event and the projects the participants created!",
    images: [
      "https://picsum.photos/id/179/300/200",
      "https://picsum.photos/id/180/300/200",
      "https://picsum.photos/id/181/300/200",
      "https://picsum.photos/id/182/300/200",
    ],
    createdAt: "2023-05-21T08:15:00Z",
    stats: {
      likes: 89,
      comments: 42,
      shares: 15,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "19 hours",
  },
  {
    id: "post67",
    author: {
      id: "user37",
      name: "Victoria Lewis",
      avatar: "https://picsum.photos/id/1036/100/100",
    },
    content:
      "Our AI research team just published a new paper on computer vision. Here are some of the visualizations and results from our experiments.",
    images: [
      "https://picsum.photos/id/183/300/200",
      "https://picsum.photos/id/184/300/200",
      "https://picsum.photos/id/185/300/200",
    ],
    createdAt: "2023-05-21T09:30:00Z",
    stats: {
      likes: 76,
      comments: 38,
      shares: 29,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "21 hours",
  },
  {
    id: "post68",
    author: {
      id: "user38",
      name: "Jack Robinson",
      avatar: "https://picsum.photos/id/1037/100/100",
    },
    content:
      "Backpacking through Southeast Asia has been an amazing adventure! Thailand, Vietnam, Cambodia, and Laos - each country has its unique beauty.",
    images: [
      "https://picsum.photos/id/186/300/200",
      "https://picsum.photos/id/187/300/200",
      "https://picsum.photos/id/188/300/200",
      "https://picsum.photos/id/189/300/200",
      "https://picsum.photos/id/190/300/200",
      "https://picsum.photos/id/191/300/200",
      "https://picsum.photos/id/192/300/200",
    ],
    createdAt: "2023-05-21T10:45:00Z",
    stats: {
      likes: 267,
      comments: 89,
      shares: 54,
    },
    liked: true,
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post69",
    author: {
      id: "user39",
      name: "Scarlett Walker",
      avatar: "https://picsum.photos/id/1038/100/100",
    },
    content:
      "Just released a new UI component library for React Native. Here are some examples of the components and their various states.",
    images: [
      "https://picsum.photos/id/193/300/200",
      "https://picsum.photos/id/194/300/200",
      "https://picsum.photos/id/195/300/200",
      "https://picsum.photos/id/196/300/200",
    ],
    createdAt: "2023-05-21T11:30:00Z",
    stats: {
      likes: 94,
      comments: 47,
      shares: 23,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "23 hours",
  },
  {
    id: "post70",
    author: {
      id: "user40",
      name: "Leo Green",
      avatar: "https://picsum.photos/id/1039/100/100",
    },
    content:
      "Our game development studio's annual retreat. Team building, brainstorming, and lots of fun activities in a beautiful mountain setting!",
    images: [
      "https://picsum.photos/id/197/300/200",
      "https://picsum.photos/id/198/300/200",
      "https://picsum.photos/id/199/300/200",
      "https://picsum.photos/id/200/300/200",
      "https://picsum.photos/id/201/300/200",
    ],
    createdAt: "2023-05-21T12:45:00Z",
    stats: {
      likes: 132,
      comments: 56,
      shares: 27,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post71",
    author: {
      id: "user41",
      name: "Zoe Baker",
      avatar: "https://picsum.photos/id/1040/100/100",
    },
    content:
      "Just got back from a photography workshop in New Zealand. The landscapes are absolutely stunning and perfect for landscape photography!",
    images: [
      "https://picsum.photos/id/202/300/200",
      "https://picsum.photos/id/203/300/200",
      "https://picsum.photos/id/204/300/200",
      "https://picsum.photos/id/205/300/200",
      "https://picsum.photos/id/206/300/200",
      "https://picsum.photos/id/207/300/200",
    ],
    createdAt: "2023-05-21T13:15:00Z",
    stats: {
      likes: 198,
      comments: 67,
      shares: 39,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post72",
    author: {
      id: "user42",
      name: "Gabriel Scott",
      avatar: "https://picsum.photos/id/1041/100/100",
    },
    content:
      "Our React Native hackathon was a huge success! Amazing projects, talented developers, and innovative solutions. Here are some highlights!",
    images: [
      "https://picsum.photos/id/208/300/200",
      "https://picsum.photos/id/209/300/200",
      "https://picsum.photos/id/210/300/200",
      "https://picsum.photos/id/211/300/200",
    ],
    createdAt: "2023-05-21T14:30:00Z",
    stats: {
      likes: 112,
      comments: 48,
      shares: 26,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post73",
    author: {
      id: "user43",
      name: "Lily Adams",
      avatar: "https://picsum.photos/id/1042/100/100",
    },
    content:
      "Our AI research team's latest project on natural language processing. Here are some visualizations of our model's performance and results.",
    images: [
      "https://picsum.photos/id/212/300/200",
      "https://picsum.photos/id/213/300/200",
      "https://picsum.photos/id/214/300/200",
    ],
    createdAt: "2023-05-21T15:45:00Z",
    stats: {
      likes: 87,
      comments: 41,
      shares: 19,
    },
    liked: true,
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "3 days",
  },
  {
    id: "post74",
    author: {
      id: "user44",
      name: "Oscar Nelson",
      avatar: "https://picsum.photos/id/1043/100/100",
    },
    content:
      "My journey through the Italian countryside. Amazing food, beautiful landscapes, historic cities, and wonderful people!",
    images: [
      "https://picsum.photos/id/215/300/200",
      "https://picsum.photos/id/216/300/200",
      "https://picsum.photos/id/217/300/200",
      "https://picsum.photos/id/218/300/200",
      "https://picsum.photos/id/219/300/200",
      "https://picsum.photos/id/220/300/200",
      "https://picsum.photos/id/221/300/200",
      "https://picsum.photos/id/222/300/200",
    ],
    createdAt: "2023-05-21T16:30:00Z",
    stats: {
      likes: 276,
      comments: 92,
      shares: 58,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "4 days",
  },
  {
    id: "post75",
    author: {
      id: "user45",
      name: "Chloe Carter",
      avatar: "https://picsum.photos/id/1044/100/100",
    },
    content:
      "Just released a new version of our mobile game with improved graphics and new levels. Here are some screenshots of the new content!",
    images: [
      "https://picsum.photos/id/223/300/200",
      "https://picsum.photos/id/224/300/200",
      "https://picsum.photos/id/225/300/200",
      "https://picsum.photos/id/226/300/200",
      "https://picsum.photos/id/227/300/200",
    ],
    createdAt: "2023-05-21T17:15:00Z",
    stats: {
      likes: 154,
      comments: 67,
      shares: 32,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "2 days",
  },
  {
    id: "post76",
    author: {
      id: "user46",
      name: "Lucas Mitchell",
      avatar: "https://picsum.photos/id/1045/100/100",
    },
    content:
      "Our React Native workshop in Tokyo was amazing! Great participants, interesting projects, and valuable discussions about mobile development.",
    images: [
      "https://picsum.photos/id/228/300/200",
      "https://picsum.photos/id/229/300/200",
      "https://picsum.photos/id/230/300/200",
      "https://picsum.photos/id/231/300/200",
    ],
    createdAt: "2023-05-21T18:30:00Z",
    stats: {
      likes: 98,
      comments: 43,
      shares: 21,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 day",
  },
  {
    id: "post77",
    author: {
      id: "user47",
      name: "Aria Phillips",
      avatar: "https://picsum.photos/id/1046/100/100",
    },
    content:
      "Just completed a photography tour of the American Southwest. The canyons, deserts, and rock formations are absolutely stunning!",
    images: [
      "https://picsum.photos/id/232/300/200",
      "https://picsum.photos/id/233/300/200",
      "https://picsum.photos/id/234/300/200",
      "https://picsum.photos/id/235/300/200",
      "https://picsum.photos/id/236/300/200",
      "https://picsum.photos/id/237/300/200",
      "https://picsum.photos/id/238/300/200",
    ],
    createdAt: "2023-05-21T19:45:00Z",
    stats: {
      likes: 234,
      comments: 78,
      shares: 45,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "3 days",
  },
  // ... existing code ...
  {
    id: "post78",
    author: {
      id: "user78",
      name: "Olivia Carter",
      avatar: "https://picsum.photos/id/1078/100/100",
    },
    content:
      "Exploring the city with friends! So many hidden gems to discover.",
    images: [
      "https://picsum.photos/id/178/300/200",
      "https://picsum.photos/id/179/300/200",
      "https://picsum.photos/id/180/300/200",
    ],
    createdAt: "2023-05-18T09:00:00Z",
    stats: {
      likes: 42,
      comments: 17,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "public",
    timeAgo: "2 hours",
  },
  {
    liked: true,
    id: "post79",
    author: {
      id: "user79",
      name: "Lucas Evans",
      avatar: "https://picsum.photos/id/1079/100/100",
    },
    content: "Just finished a marathon coding session. Time for some coffee!",
    images: [
      "https://picsum.photos/id/181/300/200",
      "https://picsum.photos/id/182/300/200",
    ],
    createdAt: "2023-05-18T10:15:00Z",
    stats: {
      likes: 27,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "1 hour",
  },
  {
    id: "post80",
    author: {
      id: "user80",
      name: "Sophia Turner",
      avatar: "https://picsum.photos/id/1080/100/100",
    },
    content:
      "Weekend hiking adventure! The view from the top was breathtaking.",
    images: [
      "https://picsum.photos/id/183/300/200",
      "https://picsum.photos/id/184/300/200",
      "https://picsum.photos/id/185/300/200",
      "https://picsum.photos/id/186/300/200",
    ],
    createdAt: "2023-05-18T11:30:00Z",
    stats: {
      likes: 58,
      comments: 21,
      shares: 8,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "30 minutes",
  },
  {
    id: "post81",
    author: {
      id: "user81",
      name: "Benjamin Lee",
      avatar: "https://picsum.photos/id/1081/100/100",
    },
    content:
      "Attending a React Native workshop today. Excited to learn new things!",
    images: [
      "https://picsum.photos/id/187/300/200",
      "https://picsum.photos/id/188/300/200",
      "https://picsum.photos/id/189/300/200",
    ],
    createdAt: "2023-05-18T12:45:00Z",
    stats: {
      likes: 33,
      comments: 12,
      shares: 4,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "10 minutes",
  },
  {
    id: "post82",
    author: {
      id: "user82",
      name: "Mia Scott",
      avatar: "https://picsum.photos/id/1082/100/100",
    },
    content: "Captured some beautiful moments at the park today.",
    images: [
      "https://picsum.photos/id/190/300/200",
      "https://picsum.photos/id/191/300/200",
      "https://picsum.photos/id/192/300/200",
      "https://picsum.photos/id/193/300/200",
      "https://picsum.photos/id/194/300/200",
    ],
    createdAt: "2023-05-18T13:00:00Z",
    stats: {
      likes: 61,
      comments: 19,
      shares: 7,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post83",
    author: {
      id: "user83",
      name: "Henry Walker",
      avatar: "https://picsum.photos/id/1083/100/100",
    },
    content: "Trying out new recipes with my family. Cooking is so much fun!",
    images: [
      "https://picsum.photos/id/195/300/200",
      "https://picsum.photos/id/196/300/200",
      "https://picsum.photos/id/197/300/200",
    ],
    createdAt: "2023-05-18T13:30:00Z",
    stats: {
      likes: 29,
      comments: 8,
      shares: 3,
    },
    liked: true,
    group: {
      id: "g8",
      name: "Programming Knowledge Sharing",
    },
    privacy: "friends",
    timeAgo: "just now",
  },
  {
    id: "post84",
    author: {
      id: "user84",
      name: "Ella King",
      avatar: "https://picsum.photos/id/1084/100/100",
    },
    content: "Just finished reading a great book on AI. Highly recommend it!",
    images: [
      "https://picsum.photos/id/198/300/200",
      "https://picsum.photos/id/199/300/200",
    ],
    createdAt: "2023-05-18T14:00:00Z",
    stats: {
      likes: 47,
      comments: 15,
      shares: 5,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post85",
    author: {
      id: "user85",
      name: "Jack Harris",
      avatar: "https://picsum.photos/id/1085/100/100",
    },
    content: "Beta testing my new mobile game. Feedback is welcome!",
    images: [
      "https://picsum.photos/id/200/300/200",
      "https://picsum.photos/id/201/300/200",
      "https://picsum.photos/id/202/300/200",
      "https://picsum.photos/id/203/300/200",
    ],
    createdAt: "2023-05-18T14:30:00Z",
    stats: {
      likes: 38,
      comments: 13,
      shares: 6,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post86",
    author: {
      id: "user86",
      name: "Grace Young",
      avatar: "https://picsum.photos/id/1086/100/100",
    },
    content: "Attended a photography exhibition. So many inspiring works!",
    images: [
      "https://picsum.photos/id/204/300/200",
      "https://picsum.photos/id/205/300/200",
      "https://picsum.photos/id/206/300/200",
      "https://picsum.photos/id/207/300/200",
      "https://picsum.photos/id/208/300/200",
    ],
    createdAt: "2023-05-18T15:00:00Z",
    stats: {
      likes: 54,
      comments: 20,
      shares: 9,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post87",
    author: {
      id: "user87",
      name: "William Baker",
      avatar: "https://picsum.photos/id/1087/100/100",
    },
    content: "Learning TypeScript with React Native. Any tips for beginners?",
    images: [
      "https://picsum.photos/id/209/300/200",
      "https://picsum.photos/id/210/300/200",
    ],
    createdAt: "2023-05-18T15:30:00Z",
    stats: {
      likes: 22,
      comments: 11,
      shares: 2,
    },
    group: {
      id: "g2",
      name: "React Native Community Q&A",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post88",
    author: {
      id: "user88",
      name: "Chloe Nelson",
      avatar: "https://picsum.photos/id/1088/100/100",
    },
    content: "Just returned from a camping trip. Nature is the best therapy.",
    images: [
      "https://picsum.photos/id/211/300/200",
      "https://picsum.photos/id/212/300/200",
      "https://picsum.photos/id/213/300/200",
      "https://picsum.photos/id/214/300/200",
    ],
    createdAt: "2023-05-18T16:00:00Z",
    stats: {
      likes: 63,
      comments: 22,
      shares: 10,
    },
    liked: true,
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "just now",
  },
  {
    id: "post89",
    author: {
      id: "user89",
      name: "James Wright",
      avatar: "https://picsum.photos/id/1089/100/100",
    },
    content: "Working on a new open-source project. Stay tuned for updates!",
    images: [
      "https://picsum.photos/id/215/300/200",
      "https://picsum.photos/id/216/300/200",
      "https://picsum.photos/id/217/300/200",
    ],
    createdAt: "2023-05-18T16:30:00Z",
    stats: {
      likes: 31,
      comments: 14,
      shares: 5,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post90",
    author: {
      id: "user90",
      name: "Amelia Green",
      avatar: "https://picsum.photos/id/1090/100/100",
    },
    content:
      "Had a blast at the weekend hackathon. Met so many talented people!",
    images: [
      "https://picsum.photos/id/218/300/200",
      "https://picsum.photos/id/219/300/200",
      "https://picsum.photos/id/220/300/200",
      "https://picsum.photos/id/221/300/200",
    ],
    createdAt: "2023-05-18T17:00:00Z",
    stats: {
      likes: 44,
      comments: 18,
      shares: 7,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post91",
    author: {
      id: "user91",
      name: "Alexander Adams",
      avatar: "https://picsum.photos/id/1091/100/100",
    },
    content: "Just started a new photography challenge. Wish me luck!",
    images: [
      "https://picsum.photos/id/222/300/200",
      "https://picsum.photos/id/223/300/200",
      "https://picsum.photos/id/224/300/200",
    ],
    createdAt: "2023-05-18T17:30:00Z",
    stats: {
      likes: 36,
      comments: 10,
      shares: 4,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post92",
    author: {
      id: "user92",
      name: "Emily Moore",
      avatar: "https://picsum.photos/id/1092/100/100",
    },
    content:
      "Exploring new UI libraries for React Native. Any recommendations?",
    images: [
      "https://picsum.photos/id/225/300/200",
      "https://picsum.photos/id/226/300/200",
    ],
    createdAt: "2023-05-18T18:00:00Z",
    stats: {
      likes: 19,
      comments: 7,
      shares: 2,
    },
    group: {
      id: "g5",
      name: "Frontend Developers Community",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post93",
    author: {
      id: "user93",
      name: "Daniel Clark",
      avatar: "https://picsum.photos/id/1093/100/100",
    },
    content:
      "Just finished a group project on AI. Learned a lot from my teammates.",
    images: [
      "https://picsum.photos/id/227/300/200",
      "https://picsum.photos/id/228/300/200",
      "https://picsum.photos/id/229/300/200",
    ],
    createdAt: "2023-05-18T18:30:00Z",
    stats: {
      likes: 41,
      comments: 16,
      shares: 6,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post94",
    author: {
      id: "user94",
      name: "Sofia Lewis",
      avatar: "https://picsum.photos/id/1094/100/100",
    },
    liked: true,
    content: "Enjoying a relaxing day at the beach. The weather is perfect!",
    images: [
      "https://picsum.photos/id/230/300/200",
      "https://picsum.photos/id/231/300/200",
      "https://picsum.photos/id/232/300/200",
      "https://picsum.photos/id/233/300/200",
    ],
    createdAt: "2023-05-18T19:00:00Z",
    stats: {
      likes: 57,
      comments: 20,
      shares: 8,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "just now",
  },
  {
    id: "post95",
    author: {
      id: "user95",
      name: "David Hall",
      avatar: "https://picsum.photos/id/1095/100/100",
    },
    content: "Working on a new photography portfolio. Feedback appreciated!",
    images: [
      "https://picsum.photos/id/234/300/200",
      "https://picsum.photos/id/235/300/200",
      "https://picsum.photos/id/236/300/200",
      "https://picsum.photos/id/237/300/200",
      "https://picsum.photos/id/238/300/200",
    ],
    createdAt: "2023-05-18T19:30:00Z",
    stats: {
      likes: 39,
      comments: 13,
      shares: 5,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  {
    id: "post96",
    author: {
      id: "user96",
      name: "Ava Allen",
      avatar: "https://picsum.photos/id/1096/100/100",
    },
    content:
      "Just joined a new React Native study group. Excited to collaborate!",
    images: [
      "https://picsum.photos/id/239/300/200",
      "https://picsum.photos/id/240/300/200",
    ],
    createdAt: "2023-05-18T20:00:00Z",
    stats: {
      likes: 24,
      comments: 8,
      shares: 3,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "just now",
  },
  // ... existing code ...
  {
    id: "post97",
    author: {
      id: "user17",
      name: "Olivia Carter",
      avatar: "https://picsum.photos/id/1017/100/100",
    },
    content:
      "Had a wonderful picnic with friends at the city park. The weather was perfect and the food was delicious!",
    images: [
      "https://picsum.photos/id/201/300/200",
      "https://picsum.photos/id/202/300/200",
      "https://picsum.photos/id/203/300/200",
    ],
    createdAt: "2023-05-19T10:00:00Z",
    stats: {
      likes: 42,
      comments: 17,
      shares: 6,
    },
    liked: true,
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "2 hours",
  },
  {
    id: "post98",
    author: {
      id: "user18",
      name: "Lucas Evans",
      avatar: "https://picsum.photos/id/1018/100/100",
    },
    content:
      "Just finished a 10k run this morning! Feeling energized and ready to take on the day.",
    images: [
      "https://picsum.photos/id/204/300/200",
      "https://picsum.photos/id/205/300/200",
    ],
    createdAt: "2023-05-19T08:30:00Z",
    stats: {
      likes: 37,
      comments: 12,
      shares: 3,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "3 hours",
  },
  {
    id: "post99",
    author: {
      id: "user19",
      name: "Sophia Turner",
      avatar: "https://picsum.photos/id/1019/100/100",
    },
    content:
      "Exploring new recipes in the kitchen. Today I tried making homemade sushi rolls!",
    images: [
      "https://picsum.photos/id/206/300/200",
      "https://picsum.photos/id/207/300/200",
      "https://picsum.photos/id/208/300/200",
      "https://picsum.photos/id/209/300/200",
    ],
    createdAt: "2023-05-19T07:15:00Z",
    stats: {
      likes: 54,
      comments: 21,
      shares: 8,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "public",
    timeAgo: "4 hours",
  },
  {
    id: "post100",
    author: {
      id: "user20",
      name: "Benjamin Lee",
      avatar: "https://picsum.photos/id/1020/100/100",
    },
    content:
      "Attended a React Native workshop last weekend. Learned a lot about performance optimization!",
    images: [
      "https://picsum.photos/id/210/300/200",
      "https://picsum.photos/id/211/300/200",
      "https://picsum.photos/id/212/300/200",
    ],
    createdAt: "2023-05-19T06:00:00Z",
    stats: {
      likes: 29,
      comments: 10,
      shares: 2,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post101",
    author: {
      id: "user21",
      name: "Mia Scott",
      avatar: "https://picsum.photos/id/1021/100/100",
    },
    content:
      "Weekend getaway to the mountains. The scenery was breathtaking and the air was so fresh!",
    images: [
      "https://picsum.photos/id/213/300/200",
      "https://picsum.photos/id/214/300/200",
      "https://picsum.photos/id/215/300/200",
      "https://picsum.photos/id/216/300/200",
      "https://picsum.photos/id/217/300/200",
    ],
    createdAt: "2023-05-19T05:30:00Z",
    stats: {
      likes: 61,
      comments: 19,
      shares: 7,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "6 hours",
  },
  {
    id: "post102",
    author: {
      id: "user22",
      name: "Jack Harris",
      avatar: "https://picsum.photos/id/1022/100/100",
    },
    content:
      "Captured some amazing street photography shots downtown today. Love the city vibes!",
    images: [
      "https://picsum.photos/id/218/300/200",
      "https://picsum.photos/id/219/300/200",
      "https://picsum.photos/id/220/300/200",
    ],
    createdAt: "2023-05-19T04:45:00Z",
    stats: {
      likes: 48,
      comments: 15,
      shares: 4,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post103",
    author: {
      id: "user23",
      name: "Ella Walker",
      avatar: "https://picsum.photos/id/1023/100/100",
    },
    content:
      "Just finished reading a fantastic book on AI. Highly recommend it to anyone interested in technology!",
    images: [
      "https://picsum.photos/id/221/300/200",
      "https://picsum.photos/id/222/300/200",
    ],
    createdAt: "2023-05-19T03:30:00Z",
    stats: {
      likes: 33,
      comments: 8,
      shares: 1,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "8 hours",
  },
  {
    id: "post104",
    author: {
      id: "user24",
      name: "Henry Young",
      avatar: "https://picsum.photos/id/1024/100/100",
    },
    liked: true,
    content:
      "Organized a coding marathon with friends. We built three mini-apps in 24 hours!",
    images: [
      "https://picsum.photos/id/223/300/200",
      "https://picsum.photos/id/224/300/200",
      "https://picsum.photos/id/225/300/200",
      "https://picsum.photos/id/226/300/200",
    ],
    createdAt: "2023-05-19T02:15:00Z",
    stats: {
      likes: 57,
      comments: 22,
      shares: 9,
    },
    group: {
      id: "g8",
      name: "Programming Knowledge Sharing",
    },
    privacy: "public",
    timeAgo: "9 hours",
  },
  {
    id: "post105",
    author: {
      id: "user25",
      name: "Grace King",
      avatar: "https://picsum.photos/id/1025/100/100",
    },
    content:
      "Attended a live concert last night. The music and atmosphere were incredible!",
    images: [
      "https://picsum.photos/id/227/300/200",
      "https://picsum.photos/id/228/300/200",
      "https://picsum.photos/id/229/300/200",
      "https://picsum.photos/id/230/300/200",
      "https://picsum.photos/id/231/300/200",
      "https://picsum.photos/id/232/300/200",
    ],
    createdAt: "2023-05-19T01:00:00Z",
    stats: {
      likes: 73,
      comments: 27,
      shares: 11,
    },
    group: {
      id: "g13",
      name: "Music Lovers",
    },
    privacy: "friends",
    timeAgo: "10 hours",
  },
  {
    id: "post106",
    author: {
      id: "user26",
      name: "Samuel Wright",
      avatar: "https://picsum.photos/id/1026/100/100",
    },
    content:
      "Experimented with some new painting techniques today. Art is truly therapeutic.",
    images: [
      "https://picsum.photos/id/233/300/200",
      "https://picsum.photos/id/234/300/200",
      "https://picsum.photos/id/235/300/200",
      "https://picsum.photos/id/236/300/200",
      "https://picsum.photos/id/237/300/200",
      "https://picsum.photos/id/238/300/200",
      "https://picsum.photos/id/239/300/200",
    ],
    createdAt: "2023-05-19T00:30:00Z",
    stats: {
      likes: 39,
      comments: 13,
      shares: 5,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "public",
    timeAgo: "11 hours",
  },
  // ... existing code ...
  {
    id: "post107",
    author: {
      id: "user27",
      name: "Liam Parker",
      avatar: "https://picsum.photos/id/1027/100/100",
    },
    content:
      "Just finished a group project on mobile app development. Proud of our teamwork!",
    images: [
      "https://picsum.photos/id/240/300/200",
      "https://picsum.photos/id/241/300/200",
      "https://picsum.photos/id/242/300/200",
    ],
    createdAt: "2023-05-20T09:00:00Z",
    stats: {
      likes: 38,
      comments: 14,
      shares: 5,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 hour",
  },
  {
    id: "post108",
    author: {
      id: "user28",
      name: "Chloe Adams",
      avatar: "https://picsum.photos/id/1028/100/100",
    },
    content:
      "Visited the art museum today. The modern art section was truly inspiring!",
    images: [
      "https://picsum.photos/id/243/300/200",
      "https://picsum.photos/id/244/300/200",
      "https://picsum.photos/id/245/300/200",
      "https://picsum.photos/id/246/300/200",
    ],
    createdAt: "2023-05-20T08:30:00Z",
    stats: {
      likes: 41,
      comments: 11,
      shares: 2,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "2 hours",
  },
  {
    id: "post109",
    author: {
      id: "user29",
      name: "Mason Lee",
      avatar: "https://picsum.photos/id/1029/100/100",
    },
    content:
      "Tried out a new recipe for homemade pizza. It turned out delicious!",
    images: [
      "https://picsum.photos/id/247/300/200",
      "https://picsum.photos/id/248/300/200",
    ],
    createdAt: "2023-05-20T08:00:00Z",
    stats: {
      likes: 29,
      comments: 7,
      shares: 1,
    },
    liked: true,
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "public",
    timeAgo: "3 hours",
  },
  {
    id: "post110",
    author: {
      id: "user30",
      name: "Ella Moore",
      avatar: "https://picsum.photos/id/1030/100/100",
    },
    content:
      "Hiking adventure with friends this weekend. The views were amazing!",
    images: [
      "https://picsum.photos/id/249/300/200",
      "https://picsum.photos/id/250/300/200",
      "https://picsum.photos/id/251/300/200",
      "https://picsum.photos/id/252/300/200",
    ],
    createdAt: "2023-05-20T07:30:00Z",
    stats: {
      likes: 54,
      comments: 18,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "4 hours",
  },
  {
    id: "post111",
    author: {
      id: "user31",
      name: "Noah Harris",
      avatar: "https://picsum.photos/id/1031/100/100",
    },
    content:
      "Attended a live coding event. Learned a lot about React Native hooks.",
    images: [
      "https://picsum.photos/id/253/300/200",
      "https://picsum.photos/id/254/300/200",
      "https://picsum.photos/id/255/300/200",
    ],
    createdAt: "2023-05-20T07:00:00Z",
    stats: {
      likes: 33,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post112",
    author: {
      id: "user32",
      name: "Ava Clark",
      avatar: "https://picsum.photos/id/1032/100/100",
    },
    content:
      "Weekend photography walk in the old town. Captured some beautiful moments.",
    images: [
      "https://picsum.photos/id/256/300/200",
      "https://picsum.photos/id/257/300/200",
      "https://picsum.photos/id/258/300/200",
    ],
    createdAt: "2023-05-20T06:30:00Z",
    stats: {
      likes: 47,
      comments: 13,
      shares: 4,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "6 hours",
  },
  {
    id: "post113",
    author: {
      id: "user33",
      name: "William Young",
      avatar: "https://picsum.photos/id/1033/100/100",
    },
    content: "Just finished a marathon! Feeling exhausted but accomplished.",
    images: [
      "https://picsum.photos/id/259/300/200",
      "https://picsum.photos/id/260/300/200",
    ],
    createdAt: "2023-05-20T06:00:00Z",
    stats: {
      likes: 52,
      comments: 16,
      shares: 5,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post114",
    author: {
      id: "user34",
      name: "Sofia Hall",
      avatar: "https://picsum.photos/id/1034/100/100",
    },
    content: "Had a fun game night with friends. Board games are the best!",
    images: [
      "https://picsum.photos/id/261/300/200",
      "https://picsum.photos/id/262/300/200",
      "https://picsum.photos/id/263/300/200",
    ],
    createdAt: "2023-05-20T05:30:00Z",
    stats: {
      likes: 36,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "friends",
    timeAgo: "8 hours",
  },
  {
    id: "post115",
    author: {
      id: "user35",
      name: "James Allen",
      avatar: "https://picsum.photos/id/1035/100/100",
    },
    content:
      "Experimented with watercolor painting today. Love how the colors blend.",
    images: [
      "https://picsum.photos/id/264/300/200",
      "https://picsum.photos/id/265/300/200",
      "https://picsum.photos/id/266/300/200",
      "https://picsum.photos/id/267/300/200",
    ],
    createdAt: "2023-05-20T05:00:00Z",
    stats: {
      likes: 28,
      comments: 7,
      shares: 1,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "public",
    timeAgo: "9 hours",
    liked: true,
  },
  {
    id: "post116",
    author: {
      id: "user36",
      name: "Mila King",
      avatar: "https://picsum.photos/id/1036/100/100",
    },
    content: "Just finished reading a new book on AI. Highly recommend it!",
    images: [
      "https://picsum.photos/id/268/300/200",
      "https://picsum.photos/id/269/300/200",
    ],
    createdAt: "2023-05-20T04:30:00Z",
    stats: {
      likes: 31,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "10 hours",
  },
  {
    id: "post117",
    author: {
      id: "user37",
      name: "Alexander Wright",
      avatar: "https://picsum.photos/id/1037/100/100",
    },
    content:
      "Tried a new workout routine at the gym. Muscles are sore but it's worth it.",
    images: [
      "https://picsum.photos/id/270/300/200",
      "https://picsum.photos/id/271/300/200",
      "https://picsum.photos/id/272/300/200",
    ],
    createdAt: "2023-05-20T04:00:00Z",
    stats: {
      likes: 44,
      comments: 12,
      shares: 3,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "11 hours",
  },
  {
    id: "post118",
    author: {
      id: "user38",
      name: "Harper Scott",
      avatar: "https://picsum.photos/id/1038/100/100",
    },
    content: "Weekend trip to the countryside. The fresh air is so refreshing.",
    images: [
      "https://picsum.photos/id/273/300/200",
      "https://picsum.photos/id/274/300/200",
      "https://picsum.photos/id/275/300/200",
      "https://picsum.photos/id/276/300/200",
    ],
    createdAt: "2023-05-20T03:30:00Z",
    stats: {
      likes: 57,
      comments: 15,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "12 hours",
  },
  {
    id: "post119",
    author: {
      id: "user39",
      name: "Evelyn Baker",
      avatar: "https://picsum.photos/id/1039/100/100",
    },
    content: "Cooked a big family dinner tonight. Everyone loved the dessert!",
    images: [
      "https://picsum.photos/id/277/300/200",
      "https://picsum.photos/id/278/300/200",
      "https://picsum.photos/id/279/300/200",
    ],
    createdAt: "2023-05-20T03:00:00Z",
    stats: {
      likes: 39,
      comments: 10,
      shares: 2,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "friends",
    timeAgo: "13 hours",
  },
  {
    id: "post120",
    author: {
      id: "user40",
      name: "Logan Nelson",
      avatar: "https://picsum.photos/id/1040/100/100",
    },
    content:
      "Just finished a React Native side project. Excited to share it soon!",
    images: [
      "https://picsum.photos/id/280/300/200",
      "https://picsum.photos/id/281/300/200",
    ],
    createdAt: "2023-05-20T02:30:00Z",
    stats: {
      likes: 26,
      comments: 6,
      shares: 1,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    liked: true,
    timeAgo: "14 hours",
  },
  {
    id: "post121",
    author: {
      id: "user41",
      name: "Scarlett Carter",
      avatar: "https://picsum.photos/id/1041/100/100",
    },
    content:
      "Attended a music festival last night. The performances were incredible!",
    images: [
      "https://picsum.photos/id/282/300/200",
      "https://picsum.photos/id/283/300/200",
      "https://picsum.photos/id/284/300/200",
      "https://picsum.photos/id/285/300/200",
    ],
    createdAt: "2023-05-20T02:00:00Z",
    stats: {
      likes: 62,
      comments: 17,
      shares: 7,
    },
    group: {
      id: "g13",
      name: "Music Lovers",
    },
    privacy: "friends",
    timeAgo: "15 hours",
  },
  {
    id: "post122",
    author: {
      id: "user42",
      name: "Henry Walker",
      avatar: "https://picsum.photos/id/1042/100/100",
    },
    content: "Just completed a challenging puzzle. Love brain teasers!",
    images: [
      "https://picsum.photos/id/286/300/200",
      "https://picsum.photos/id/287/300/200",
    ],
    createdAt: "2023-05-20T01:30:00Z",
    stats: {
      likes: 21,
      comments: 5,
      shares: 1,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "16 hours",
  },
  {
    id: "post123",
    author: {
      id: "user43",
      name: "Grace Lewis",
      avatar: "https://picsum.photos/id/1043/100/100",
    },
    content:
      "Took some macro shots of flowers in my garden. Nature is amazing.",
    images: [
      "https://picsum.photos/id/288/300/200",
      "https://picsum.photos/id/289/300/200",
      "https://picsum.photos/id/290/300/200",
    ],
    createdAt: "2023-05-20T01:00:00Z",
    stats: {
      likes: 34,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "17 hours",
  },
  {
    id: "post124",
    author: {
      id: "user44",
      name: "Jack Robinson",
      avatar: "https://picsum.photos/id/1044/100/100",
    },
    content:
      "Weekend coding challenge: built a weather app using React Native.",
    images: [
      "https://picsum.photos/id/291/300/200",
      "https://picsum.photos/id/292/300/200",
      "https://picsum.photos/id/293/300/200",
    ],
    createdAt: "2023-05-20T00:30:00Z",
    stats: {
      likes: 28,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "18 hours",
  },
  {
    id: "post125",
    author: {
      id: "user45",
      name: "Victoria Perez",
      avatar: "https://picsum.photos/id/1045/100/100",
    },
    content: "Had a relaxing day painting landscapes. Art is my therapy.",
    images: [
      "https://picsum.photos/id/294/300/200",
      "https://picsum.photos/id/295/300/200",
      "https://picsum.photos/id/296/300/200",
      "https://picsum.photos/id/297/300/200",
    ],
    createdAt: "2023-05-20T00:00:00Z",
    liked: true,
    stats: {
      likes: 35,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "19 hours",
  },
  // ... existing code ...
  {
    id: "post126",
    author: {
      id: "user46",
      name: "Benjamin Scott",
      avatar: "https://picsum.photos/id/1046/100/100",
    },
    content:
      "Just finished a challenging coding interview. Fingers crossed for good news!",
    images: [
      "https://picsum.photos/id/298/300/200",
      "https://picsum.photos/id/299/300/200",
    ],
    createdAt: "2023-05-21T09:00:00Z",
    stats: {
      likes: 27,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g8",
      name: "Programming Knowledge Sharing",
    },
    privacy: "public",
    timeAgo: "1 hour",
  },
  {
    id: "post127",
    author: {
      id: "user47",
      name: "Layla Evans",
      avatar: "https://picsum.photos/id/1047/100/100",
    },
    content:
      "Spent the afternoon painting by the lake. The view was so peaceful.",
    images: [
      "https://picsum.photos/id/300/300/200",
      "https://picsum.photos/id/301/300/200",
      "https://picsum.photos/id/302/300/200",
    ],
    createdAt: "2023-05-21T08:30:00Z",
    stats: {
      likes: 33,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "2 hours",
  },
  {
    id: "post128",
    author: {
      id: "user48",
      name: "Owen Turner",
      avatar: "https://picsum.photos/id/1048/100/100",
    },
    content:
      "Tried a new workout routine this morning. Feeling great and energized!",
    images: [
      "https://picsum.photos/id/303/300/200",
      "https://picsum.photos/id/304/300/200",
      "https://picsum.photos/id/305/300/200",
    ],
    createdAt: "2023-05-21T08:00:00Z",
    stats: {
      likes: 41,
      comments: 12,
      shares: 4,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "3 hours",
  },
  {
    id: "post129",
    author: {
      id: "user49",
      name: "Zoe Baker",
      avatar: "https://picsum.photos/id/1049/100/100",
    },
    content: "Weekend trip to the mountains. The scenery was breathtaking!",
    images: [
      "https://picsum.photos/id/306/300/200",
      "https://picsum.photos/id/307/300/200",
      "https://picsum.photos/id/308/300/200",
      "https://picsum.photos/id/309/300/200",
    ],
    createdAt: "2023-05-21T07:30:00Z",
    stats: {
      likes: 56,
      comments: 18,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "4 hours",
  },
  {
    id: "post130",
    author: {
      id: "user50",
      name: "Lucas Hall",
      avatar: "https://picsum.photos/id/1050/100/100",
    },
    content: "Cooked a big family dinner tonight. Everyone loved the dessert!",
    images: [
      "https://picsum.photos/id/310/300/200",
      "https://picsum.photos/id/311/300/200",
      "https://picsum.photos/id/312/300/200",
    ],
    liked: true,
    createdAt: "2023-05-21T07:00:00Z",
    stats: {
      likes: 39,
      comments: 10,
      shares: 2,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "friends",
    timeAgo: "5 hours",
  },
  {
    id: "post131",
    author: {
      id: "user51",
      name: "Mila Lewis",
      avatar: "https://picsum.photos/id/1051/100/100",
    },
    content:
      "Attended a live concert last night. The music and atmosphere were incredible!",
    images: [
      "https://picsum.photos/id/313/300/200",
      "https://picsum.photos/id/314/300/200",
      "https://picsum.photos/id/315/300/200",
      "https://picsum.photos/id/316/300/200",
    ],
    createdAt: "2023-05-21T06:30:00Z",
    stats: {
      likes: 62,
      comments: 17,
      shares: 7,
    },
    group: {
      id: "g13",
      name: "Music Lovers",
    },
    privacy: "friends",
    timeAgo: "6 hours",
  },
  {
    id: "post132",
    author: {
      id: "user52",
      name: "Henry Robinson",
      avatar: "https://picsum.photos/id/1052/100/100",
    },
    content: "Just completed a challenging puzzle. Love brain teasers!",
    images: [
      "https://picsum.photos/id/317/300/200",
      "https://picsum.photos/id/318/300/200",
    ],
    createdAt: "2023-05-21T06:00:00Z",
    stats: {
      likes: 21,
      comments: 5,
      shares: 1,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post133",
    author: {
      id: "user53",
      name: "Ella Perez",
      avatar: "https://picsum.photos/id/1053/100/100",
    },
    content:
      "Took some macro shots of flowers in my garden. Nature is amazing.",
    images: [
      "https://picsum.photos/id/319/300/200",
      "https://picsum.photos/id/320/300/200",
      "https://picsum.photos/id/321/300/200",
    ],
    createdAt: "2023-05-21T05:30:00Z",
    stats: {
      likes: 34,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "8 hours",
  },
  {
    id: "post134",
    author: {
      id: "user54",
      name: "Jack Walker",
      avatar: "https://picsum.photos/id/1054/100/100",
    },
    content:
      "Weekend coding challenge: built a weather app using React Native.",
    images: [
      "https://picsum.photos/id/322/300/200",
      "https://picsum.photos/id/323/300/200",
      "https://picsum.photos/id/324/300/200",
    ],
    createdAt: "2023-05-21T05:00:00Z",
    stats: {
      likes: 28,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "9 hours",
  },
  {
    id: "post135",
    author: {
      id: "user55",
      name: "Victoria King",
      avatar: "https://picsum.photos/id/1055/100/100",
    },
    content: "Had a relaxing day painting landscapes. Art is my therapy.",
    images: [
      "https://picsum.photos/id/325/300/200",
      "https://picsum.photos/id/326/300/200",
      "https://picsum.photos/id/327/300/200",
      "https://picsum.photos/id/328/300/200",
    ],
    createdAt: "2023-05-21T04:30:00Z",
    stats: {
      likes: 35,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    liked: true,
    privacy: "friends",
    timeAgo: "10 hours",
  },
  // ... existing code ...
  {
    id: "post136",
    author: {
      id: "user56",
      name: "Sophie Turner",
      avatar: "https://picsum.photos/id/1056/100/100",
    },
    content:
      "Just finished a creative writing workshop. Feeling inspired to start my own novel!",
    images: [
      "https://picsum.photos/id/329/300/200",
      "https://picsum.photos/id/330/300/200",
    ],
    createdAt: "2023-05-22T09:00:00Z",
    stats: {
      likes: 24,
      comments: 7,
      shares: 2,
    },
    group: {
      id: "g8",
      name: "Programming Knowledge Sharing",
    },
    privacy: "public",
    timeAgo: "1 hour",
  },
  {
    id: "post137",
    author: {
      id: "user57",
      name: "Ethan Carter",
      avatar: "https://picsum.photos/id/1057/100/100",
    },
    content:
      "Spent the weekend hiking in the forest. Nature always recharges my energy.",
    images: [
      "https://picsum.photos/id/331/300/200",
      "https://picsum.photos/id/332/300/200",
      "https://picsum.photos/id/333/300/200",
    ],
    createdAt: "2023-05-22T08:30:00Z",
    stats: {
      likes: 31,
      comments: 9,
      shares: 3,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "2 hours",
  },
  {
    id: "post138",
    author: {
      id: "user58",
      name: "Lily Evans",
      avatar: "https://picsum.photos/id/1058/100/100",
    },
    content:
      "Tried making homemade pasta for the first time. It was a fun and tasty experience!",
    images: [
      "https://picsum.photos/id/334/300/200",
      "https://picsum.photos/id/335/300/200",
      "https://picsum.photos/id/336/300/200",
    ],
    createdAt: "2023-05-22T08:00:00Z",
    stats: {
      likes: 28,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "public",
    timeAgo: "3 hours",
  },
  {
    id: "post139",
    author: {
      id: "user59",
      name: "Nathan Hall",
      avatar: "https://picsum.photos/id/1059/100/100",
    },
    content:
      "Attended a jazz concert last night. The music was absolutely amazing!",
    images: [
      "https://picsum.photos/id/337/300/200",
      "https://picsum.photos/id/338/300/200",
      "https://picsum.photos/id/339/300/200",
      "https://picsum.photos/id/340/300/200",
    ],
    createdAt: "2023-05-22T07:30:00Z",
    stats: {
      likes: 44,
      comments: 13,
      shares: 5,
    },
    group: {
      id: "g13",
      name: "Music Lovers",
    },
    privacy: "friends",
    timeAgo: "4 hours",
  },
  {
    id: "post140",
    author: {
      id: "user60",
      name: "Avery King",
      avatar: "https://picsum.photos/id/1060/100/100",
    },
    content:
      "Just completed a 5k run for charity. Proud to support a good cause!",
    images: [
      "https://picsum.photos/id/341/300/200",
      "https://picsum.photos/id/342/300/200",
    ],
    createdAt: "2023-05-22T07:00:00Z",
    stats: {
      likes: 36,
      comments: 10,
      shares: 4,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    liked: true,
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post141",
    author: {
      id: "user61",
      name: "Ella Harris",
      avatar: "https://picsum.photos/id/1061/100/100",
    },
    content:
      "Weekend photography walk in the city. Captured some unique street moments.",
    images: [
      "https://picsum.photos/id/343/300/200",
      "https://picsum.photos/id/344/300/200",
      "https://picsum.photos/id/345/300/200",
    ],
    createdAt: "2023-05-22T06:30:00Z",
    stats: {
      likes: 29,
      comments: 7,
      shares: 2,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "6 hours",
  },
  {
    id: "post142",
    author: {
      id: "user62",
      name: "Logan Young",
      avatar: "https://picsum.photos/id/1062/100/100",
    },
    content:
      "Just finished a React Native side project. Can't wait to share it with everyone!",
    images: [
      "https://picsum.photos/id/346/300/200",
      "https://picsum.photos/id/347/300/200",
    ],
    createdAt: "2023-05-22T06:00:00Z",
    stats: {
      likes: 22,
      comments: 6,
      shares: 1,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post143",
    author: {
      id: "user63",
      name: "Maya Robinson",
      avatar: "https://picsum.photos/id/1063/100/100",
    },
    content:
      "Had a fun board game night with friends. Can't wait for the next one!",
    images: [
      "https://picsum.photos/id/348/300/200",
      "https://picsum.photos/id/349/300/200",
      "https://picsum.photos/id/350/300/200",
    ],
    createdAt: "2023-05-22T05:30:00Z",
    stats: {
      likes: 33,
      comments: 9,
      shares: 3,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "friends",
    timeAgo: "8 hours",
  },
  {
    id: "post144",
    author: {
      id: "user64",
      name: "Carter Allen",
      avatar: "https://picsum.photos/id/1064/100/100",
    },
    content:
      "Experimented with digital painting today. Love how the colors turned out.",
    images: [
      "https://picsum.photos/id/351/300/200",
      "https://picsum.photos/id/352/300/200",
      "https://picsum.photos/id/353/300/200",
      "https://picsum.photos/id/354/300/200",
    ],
    createdAt: "2023-05-22T05:00:00Z",
    stats: {
      likes: 27,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "public",
    timeAgo: "9 hours",
    liked: true,
  },
  {
    id: "post145",
    author: {
      id: "user65",
      name: "Penelope Baker",
      avatar: "https://picsum.photos/id/1065/100/100",
    },
    content:
      "Just finished reading a new book on AI. Highly recommend it to everyone interested in technology!",
    images: [
      "https://picsum.photos/id/355/300/200",
      "https://picsum.photos/id/356/300/200",
    ],
    createdAt: "2023-05-22T04:30:00Z",
    stats: {
      likes: 19,
      comments: 5,
      shares: 1,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "10 hours",
  },
  // ... existing code ...
  {
    id: "post146",
    author: {
      id: "user66",
      name: "Julian Foster",
      avatar: "https://picsum.photos/id/1066/100/100",
    },
    content:
      "Just finished a group project on mobile app development. Proud of our teamwork!",
    images: [
      "https://picsum.photos/id/357/300/200",
      "https://picsum.photos/id/358/300/200",
      "https://picsum.photos/id/359/300/200",
    ],
    createdAt: "2023-05-23T09:00:00Z",
    stats: {
      likes: 38,
      comments: 14,
      shares: 5,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 hour",
  },
  {
    id: "post147",
    author: {
      id: "user67",
      name: "Hazel Bennett",
      avatar: "https://picsum.photos/id/1067/100/100",
    },
    content:
      "Visited the art museum today. The modern art section was truly inspiring!",
    images: [
      "https://picsum.photos/id/360/300/200",
      "https://picsum.photos/id/361/300/200",
      "https://picsum.photos/id/362/300/200",
      "https://picsum.photos/id/363/300/200",
    ],
    createdAt: "2023-05-23T08:30:00Z",
    stats: {
      likes: 41,
      comments: 11,
      shares: 2,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "2 hours",
  },
  {
    id: "post148",
    author: {
      id: "user68",
      name: "Leo Hayes",
      avatar: "https://picsum.photos/id/1068/100/100",
    },
    content:
      "Tried out a new recipe for homemade pizza. It turned out delicious!",
    images: [
      "https://picsum.photos/id/364/300/200",
      "https://picsum.photos/id/365/300/200",
    ],
    createdAt: "2023-05-23T08:00:00Z",
    stats: {
      likes: 29,
      comments: 7,
      shares: 1,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "public",
    timeAgo: "3 hours",
  },
  {
    id: "post149",
    author: {
      id: "user69",
      name: "Aurora Reed",
      avatar: "https://picsum.photos/id/1069/100/100",
    },
    content:
      "Hiking adventure with friends this weekend. The views were amazing!",
    images: [
      "https://picsum.photos/id/366/300/200",
      "https://picsum.photos/id/367/300/200",
      "https://picsum.photos/id/368/300/200",
      "https://picsum.photos/id/369/300/200",
    ],
    createdAt: "2023-05-23T07:30:00Z",
    stats: {
      likes: 54,
      comments: 18,
      shares: 6,
    },
    liked: true,
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "4 hours",
  },
  {
    id: "post150",
    author: {
      id: "user70",
      name: "Gabriel Wood",
      avatar: "https://picsum.photos/id/1070/100/100",
    },
    content:
      "Attended a live coding event. Learned a lot about React Native hooks.",
    images: [
      "https://picsum.photos/id/370/300/200",
      "https://picsum.photos/id/371/300/200",
      "https://picsum.photos/id/372/300/200",
    ],
    createdAt: "2023-05-23T07:00:00Z",
    stats: {
      likes: 33,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post151",
    author: {
      id: "user71",
      name: "Stella Price",
      avatar: "https://picsum.photos/id/1071/100/100",
    },
    content:
      "Weekend photography walk in the old town. Captured some beautiful moments.",
    images: [
      "https://picsum.photos/id/373/300/200",
      "https://picsum.photos/id/374/300/200",
      "https://picsum.photos/id/375/300/200",
    ],
    createdAt: "2023-05-23T06:30:00Z",
    stats: {
      likes: 47,
      comments: 13,
      shares: 4,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "6 hours",
  },
  {
    id: "post152",
    author: {
      id: "user72",
      name: "Carter Bell",
      avatar: "https://picsum.photos/id/1072/100/100",
    },
    content: "Just finished a marathon! Feeling exhausted but accomplished.",
    images: [
      "https://picsum.photos/id/376/300/200",
      "https://picsum.photos/id/377/300/200",
    ],
    createdAt: "2023-05-23T06:00:00Z",
    stats: {
      likes: 52,
      comments: 16,
      shares: 5,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post153",
    author: {
      id: "user73",
      name: "Savannah Cooper",
      avatar: "https://picsum.photos/id/1073/100/100",
    },
    content: "Had a fun game night with friends. Board games are the best!",
    images: [
      "https://picsum.photos/id/378/300/200",
      "https://picsum.photos/id/379/300/200",
      "https://picsum.photos/id/380/300/200",
    ],
    createdAt: "2023-05-23T05:30:00Z",
    stats: {
      likes: 36,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "friends",
    timeAgo: "8 hours",
  },
  {
    id: "post154",
    author: {
      id: "user74",
      name: "Wyatt Morgan",
      avatar: "https://picsum.photos/id/1074/100/100",
    },
    content:
      "Experimented with watercolor painting today. Love how the colors blend.",
    images: [
      "https://picsum.photos/id/381/300/200",
      "https://picsum.photos/id/382/300/200",
      "https://picsum.photos/id/383/300/200",
      "https://picsum.photos/id/384/300/200",
    ],
    createdAt: "2023-05-23T05:00:00Z",
    stats: {
      likes: 28,
      comments: 7,
      shares: 1,
    },
    liked: true,
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "public",
    timeAgo: "9 hours",
  },
  {
    id: "post155",
    author: {
      id: "user75",
      name: "Ellie Bailey",
      avatar: "https://picsum.photos/id/1075/100/100",
    },
    content: "Just finished reading a new book on AI. Highly recommend it!",
    images: [
      "https://picsum.photos/id/385/300/200",
      "https://picsum.photos/id/386/300/200",
    ],
    createdAt: "2023-05-23T04:30:00Z",
    stats: {
      likes: 31,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "10 hours",
  },
  {
    id: "post156",
    author: {
      id: "user76",
      name: "Lincoln Rivera",
      avatar: "https://picsum.photos/id/1076/100/100",
    },
    content:
      "Tried a new workout routine at the gym. Muscles are sore but it's worth it.",
    images: [
      "https://picsum.photos/id/387/300/200",
      "https://picsum.photos/id/388/300/200",
      "https://picsum.photos/id/389/300/200",
    ],
    createdAt: "2023-05-23T04:00:00Z",
    stats: {
      likes: 44,
      comments: 12,
      shares: 3,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "11 hours",
  },
  {
    id: "post157",
    author: {
      id: "user77",
      name: "Paisley Brooks",
      avatar: "https://picsum.photos/id/1077/100/100",
    },
    content: "Weekend trip to the countryside. The fresh air is so refreshing.",
    images: [
      "https://picsum.photos/id/390/300/200",
      "https://picsum.photos/id/391/300/200",
      "https://picsum.photos/id/392/300/200",
      "https://picsum.photos/id/393/300/200",
    ],
    createdAt: "2023-05-23T03:30:00Z",
    stats: {
      likes: 57,
      comments: 15,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "12 hours",
  },
  {
    id: "post158",
    author: {
      id: "user78",
      name: "Nora Jenkins",
      avatar: "https://picsum.photos/id/1078/100/100",
    },
    content: "Cooked a big family dinner tonight. Everyone loved the dessert!",
    images: [
      "https://picsum.photos/id/394/300/200",
      "https://picsum.photos/id/395/300/200",
      "https://picsum.photos/id/396/300/200",
    ],
    createdAt: "2023-05-23T03:00:00Z",
    stats: {
      likes: 39,
      comments: 10,
      shares: 2,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "friends",
    timeAgo: "13 hours",
  },
  {
    id: "post159",
    author: {
      id: "user79",
      name: "Easton Simmons",
      avatar: "https://picsum.photos/id/1079/100/100",
    },
    content:
      "Just finished a React Native side project. Excited to share it soon!",
    images: [
      "https://picsum.photos/id/397/300/200",
      "https://picsum.photos/id/398/300/200",
    ],
    createdAt: "2023-05-23T02:30:00Z",
    stats: {
      likes: 26,
      comments: 6,
      shares: 1,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "14 hours",
  },
  {
    id: "post160",
    author: {
      id: "user80",
      name: "Madeline Foster",
      avatar: "https://picsum.photos/id/1080/100/100",
    },
    content:
      "Attended a music festival last night. The performances were incredible!",
    images: [
      "https://picsum.photos/id/399/300/200",
      "https://picsum.photos/id/400/300/200",
      "https://picsum.photos/id/401/300/200",
      "https://picsum.photos/id/402/300/200",
    ],
    liked: true,
    createdAt: "2023-05-23T02:00:00Z",
    stats: {
      likes: 62,
      comments: 17,
      shares: 7,
    },
    group: {
      id: "g13",
      name: "Music Lovers",
    },
    privacy: "friends",
    timeAgo: "15 hours",
  },
  {
    id: "post161",
    author: {
      id: "user81",
      name: "Hudson Bryant",
      avatar: "https://picsum.photos/id/1081/100/100",
    },
    content: "Just completed a challenging puzzle. Love brain teasers!",
    images: [
      "https://picsum.photos/id/403/300/200",
      "https://picsum.photos/id/404/300/200",
    ],
    createdAt: "2023-05-23T01:30:00Z",
    stats: {
      likes: 21,
      comments: 5,
      shares: 1,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "16 hours",
  },
  {
    id: "post162",
    author: {
      id: "user82",
      name: "Brooklyn Griffin",
      avatar: "https://picsum.photos/id/1082/100/100",
    },
    content:
      "Took some macro shots of flowers in my garden. Nature is amazing.",
    images: [
      "https://picsum.photos/id/405/300/200",
      "https://picsum.photos/id/406/300/200",
      "https://picsum.photos/id/407/300/200",
    ],
    createdAt: "2023-05-23T01:00:00Z",
    stats: {
      likes: 34,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "17 hours",
  },
  {
    id: "post163",
    author: {
      id: "user83",
      name: "Colton Russell",
      avatar: "https://picsum.photos/id/1083/100/100",
    },
    content:
      "Weekend coding challenge: built a weather app using React Native.",
    images: [
      "https://picsum.photos/id/408/300/200",
      "https://picsum.photos/id/409/300/200",
      "https://picsum.photos/id/410/300/200",
    ],
    createdAt: "2023-05-23T00:30:00Z",
    stats: {
      likes: 28,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "18 hours",
  },
  {
    id: "post164",
    author: {
      id: "user84",
      name: "Everly Griffin",
      avatar: "https://picsum.photos/id/1084/100/100",
    },
    content: "Had a relaxing day painting landscapes. Art is my therapy.",
    images: [
      "https://picsum.photos/id/411/300/200",
      "https://picsum.photos/id/412/300/200",
      "https://picsum.photos/id/413/300/200",
      "https://picsum.photos/id/414/300/200",
    ],
    createdAt: "2023-05-23T00:00:00Z",
    stats: {
      likes: 35,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "19 hours",
  },
  // ... existing code ...
  {
    id: "post165",
    author: {
      id: "user85",
      name: "Isla Hayes",
      avatar: "https://picsum.photos/id/1085/100/100",
    },
    liked: true,
    content:
      "Just finished a group project on mobile app development. Proud of our teamwork!",
    images: [
      "https://picsum.photos/id/415/300/200",
      "https://picsum.photos/id/416/300/200",
      "https://picsum.photos/id/417/300/200",
    ],
    createdAt: "2023-05-24T09:00:00Z",
    stats: {
      likes: 38,
      comments: 14,
      shares: 5,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 hour",
  },
  {
    id: "post166",
    author: {
      id: "user86",
      name: "Mila Foster",
      avatar: "https://picsum.photos/id/1086/100/100",
    },
    content:
      "Visited the art museum today. The modern art section was truly inspiring!",
    images: [
      "https://picsum.photos/id/418/300/200",
      "https://picsum.photos/id/419/300/200",
      "https://picsum.photos/id/420/300/200",
      "https://picsum.photos/id/421/300/200",
    ],
    createdAt: "2023-05-24T08:30:00Z",
    stats: {
      likes: 41,
      comments: 11,
      shares: 2,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "2 hours",
  },
  {
    id: "post167",
    author: {
      id: "user87",
      name: "Leo Bennett",
      avatar: "https://picsum.photos/id/1087/100/100",
    },
    content:
      "Tried out a new recipe for homemade pizza. It turned out delicious!",
    images: [
      "https://picsum.photos/id/422/300/200",
      "https://picsum.photos/id/423/300/200",
    ],
    createdAt: "2023-05-24T08:00:00Z",
    stats: {
      likes: 29,
      comments: 7,
      shares: 1,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "public",
    timeAgo: "3 hours",
  },
  {
    id: "post168",
    author: {
      id: "user88",
      name: "Aurora Wood",
      avatar: "https://picsum.photos/id/1088/100/100",
    },
    content:
      "Hiking adventure with friends this weekend. The views were amazing!",
    images: [
      "https://picsum.photos/id/424/300/200",
      "https://picsum.photos/id/425/300/200",
      "https://picsum.photos/id/426/300/200",
      "https://picsum.photos/id/427/300/200",
    ],
    createdAt: "2023-05-24T07:30:00Z",
    stats: {
      likes: 54,
      comments: 18,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "4 hours",
  },
  {
    id: "post169",
    author: {
      id: "user89",
      name: "Gabriel Price",
      avatar: "https://picsum.photos/id/1089/100/100",
    },
    content:
      "Attended a live coding event. Learned a lot about React Native hooks.",
    images: [
      "https://picsum.photos/id/428/300/200",
      "https://picsum.photos/id/429/300/200",
      "https://picsum.photos/id/430/300/200",
    ],
    createdAt: "2023-05-24T07:00:00Z",
    stats: {
      likes: 33,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    liked: true,
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post170",
    author: {
      id: "user90",
      name: "Stella Bell",
      avatar: "https://picsum.photos/id/1090/100/100",
    },
    content:
      "Weekend photography walk in the old town. Captured some beautiful moments.",
    images: [
      "https://picsum.photos/id/431/300/200",
      "https://picsum.photos/id/432/300/200",
      "https://picsum.photos/id/433/300/200",
    ],
    createdAt: "2023-05-24T06:30:00Z",
    stats: {
      likes: 47,
      comments: 13,
      shares: 4,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "6 hours",
  },
  {
    id: "post171",
    author: {
      id: "user91",
      name: "Carter Morgan",
      avatar: "https://picsum.photos/id/1091/100/100",
    },
    content: "Just finished a marathon! Feeling exhausted but accomplished.",
    images: [
      "https://picsum.photos/id/434/300/200",
      "https://picsum.photos/id/435/300/200",
    ],
    createdAt: "2023-05-24T06:00:00Z",
    stats: {
      likes: 52,
      comments: 16,
      shares: 5,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post172",
    author: {
      id: "user92",
      name: "Savannah Rivera",
      avatar: "https://picsum.photos/id/1092/100/100",
    },
    content: "Had a fun game night with friends. Board games are the best!",
    images: [
      "https://picsum.photos/id/436/300/200",
      "https://picsum.photos/id/437/300/200",
      "https://picsum.photos/id/438/300/200",
    ],
    createdAt: "2023-05-24T05:30:00Z",
    stats: {
      likes: 36,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "friends",
    timeAgo: "8 hours",
  },
  {
    id: "post173",
    author: {
      id: "user93",
      name: "Wyatt Brooks",
      avatar: "https://picsum.photos/id/1093/100/100",
    },
    content:
      "Experimented with watercolor painting today. Love how the colors blend.",
    images: [
      "https://picsum.photos/id/439/300/200",
      "https://picsum.photos/id/440/300/200",
      "https://picsum.photos/id/441/300/200",
      "https://picsum.photos/id/442/300/200",
    ],
    createdAt: "2023-05-24T05:00:00Z",
    stats: {
      likes: 28,
      comments: 7,
      shares: 1,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "public",
    timeAgo: "9 hours",
  },
  {
    id: "post174",
    author: {
      id: "user94",
      name: "Ellie Simmons",
      avatar: "https://picsum.photos/id/1094/100/100",
    },
    content: "Just finished reading a new book on AI. Highly recommend it!",
    images: [
      "https://picsum.photos/id/443/300/200",
      "https://picsum.photos/id/444/300/200",
    ],
    createdAt: "2023-05-24T04:30:00Z",
    stats: {
      likes: 31,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "10 hours",
  },
  {
    id: "post175",
    author: {
      id: "user95",
      name: "Lincoln Bailey",
      avatar: "https://picsum.photos/id/1095/100/100",
    },
    content:
      "Tried a new workout routine at the gym. Muscles are sore but it's worth it.",
    images: [
      "https://picsum.photos/id/445/300/200",
      "https://picsum.photos/id/446/300/200",
      "https://picsum.photos/id/447/300/200",
    ],
    createdAt: "2023-05-24T04:00:00Z",
    stats: {
      likes: 44,
      comments: 12,
      shares: 3,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "11 hours",
  },
  {
    id: "post176",
    author: {
      id: "user96",
      name: "Paisley Jenkins",
      avatar: "https://picsum.photos/id/1096/100/100",
    },
    liked: true,
    content: "Weekend trip to the countryside. The fresh air is so refreshing.",
    images: [
      "https://picsum.photos/id/448/300/200",
      "https://picsum.photos/id/449/300/200",
      "https://picsum.photos/id/450/300/200",
      "https://picsum.photos/id/451/300/200",
    ],
    createdAt: "2023-05-24T03:30:00Z",
    stats: {
      likes: 57,
      comments: 15,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "12 hours",
  },
  {
    id: "post177",
    author: {
      id: "user97",
      name: "Nora Russell",
      avatar: "https://picsum.photos/id/1097/100/100",
    },
    content: "Cooked a big family dinner tonight. Everyone loved the dessert!",
    images: [
      "https://picsum.photos/id/452/300/200",
      "https://picsum.photos/id/453/300/200",
      "https://picsum.photos/id/454/300/200",
    ],
    createdAt: "2023-05-24T03:00:00Z",
    stats: {
      likes: 39,
      comments: 10,
      shares: 2,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "friends",
    timeAgo: "13 hours",
  },
  {
    id: "post178",
    author: {
      id: "user98",
      name: "Easton Griffin",
      avatar: "https://picsum.photos/id/1098/100/100",
    },
    content:
      "Just finished a React Native side project. Excited to share it soon!",
    images: [
      "https://picsum.photos/id/455/300/200",
      "https://picsum.photos/id/456/300/200",
    ],
    createdAt: "2023-05-24T02:30:00Z",
    stats: {
      likes: 26,
      comments: 6,
      shares: 1,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "14 hours",
  },
  {
    id: "post179",
    author: {
      id: "user99",
      name: "Madeline Russell",
      avatar: "https://picsum.photos/id/1099/100/100",
    },
    content:
      "Attended a music festival last night. The performances were incredible!",
    images: [
      "https://picsum.photos/id/457/300/200",
      "https://picsum.photos/id/458/300/200",
      "https://picsum.photos/id/459/300/200",
      "https://picsum.photos/id/460/300/200",
    ],
    createdAt: "2023-05-24T02:00:00Z",
    stats: {
      likes: 62,
      comments: 17,
      shares: 7,
    },
    group: {
      id: "g13",
      name: "Music Lovers",
    },
    privacy: "friends",
    timeAgo: "15 hours",
  },
  {
    id: "post180",
    author: {
      id: "user100",
      name: "Hudson Foster",
      avatar: "https://picsum.photos/id/1100/100/100",
    },
    content: "Just completed a challenging puzzle. Love brain teasers!",
    images: [
      "https://picsum.photos/id/461/300/200",
      "https://picsum.photos/id/462/300/200",
    ],
    createdAt: "2023-05-24T01:30:00Z",
    stats: {
      likes: 21,
      comments: 5,
      shares: 1,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "16 hours",
  },
  {
    id: "post181",
    author: {
      id: "user101",
      name: "Brooklyn Bryant",
      avatar: "https://picsum.photos/id/1101/100/100",
    },
    content:
      "Took some macro shots of flowers in my garden. Nature is amazing.",
    images: [
      "https://picsum.photos/id/463/300/200",
      "https://picsum.photos/id/464/300/200",
      "https://picsum.photos/id/465/300/200",
    ],
    createdAt: "2023-05-24T01:00:00Z",
    stats: {
      likes: 34,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "17 hours",
  },
  {
    id: "post182",
    author: {
      id: "user102",
      name: "Colton Jenkins",
      avatar: "https://picsum.photos/id/1102/100/100",
    },
    content:
      "Weekend coding challenge: built a weather app using React Native.",
    images: [
      "https://picsum.photos/id/466/300/200",
      "https://picsum.photos/id/467/300/200",
      "https://picsum.photos/id/468/300/200",
    ],
    createdAt: "2023-05-24T00:30:00Z",
    stats: {
      likes: 28,
      comments: 9,
      shares: 2,
    },
    liked: true,
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "18 hours",
  },
  {
    id: "post183",
    author: {
      id: "user103",
      name: "Everly Jenkins",
      avatar: "https://picsum.photos/id/1103/100/100",
    },
    content: "Had a relaxing day painting landscapes. Art is my therapy.",
    images: [
      "https://picsum.photos/id/469/300/200",
      "https://picsum.photos/id/470/300/200",
      "https://picsum.photos/id/471/300/200",
      "https://picsum.photos/id/472/300/200",
    ],
    createdAt: "2023-05-24T00:00:00Z",
    stats: {
      likes: 35,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "19 hours",
  },
  {
    id: "post184",
    author: {
      id: "user104",
      name: "Aiden Perry",
      avatar: "https://picsum.photos/id/1104/100/100",
    },
    content:
      "Just finished a creative writing workshop. Feeling inspired to start my own novel!",
    images: [
      "https://picsum.photos/id/473/300/200",
      "https://picsum.photos/id/474/300/200",
    ],
    createdAt: "2023-05-23T23:30:00Z",
    stats: {
      likes: 24,
      comments: 7,
      shares: 2,
    },
    group: {
      id: "g8",
      name: "Programming Knowledge Sharing",
    },
    privacy: "public",
    timeAgo: "20 hours",
  },
  // ... existing code ...
  {
    id: "post185",
    author: {
      id: "user85",
      name: "Isla Hayes",
      avatar: "https://picsum.photos/id/1085/100/100",
    },
    content:
      "Just finished a group project on mobile app development. Proud of our teamwork!",
    images: [
      "https://picsum.photos/id/415/300/200",
      "https://picsum.photos/id/416/300/200",
      "https://picsum.photos/id/417/300/200",
    ],
    createdAt: "2023-05-24T09:00:00Z",
    stats: {
      likes: 38,
      comments: 14,
      shares: 5,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "1 hour",
  },
  {
    id: "post186",
    author: {
      id: "user86",
      name: "Mila Bennett",
      avatar: "https://picsum.photos/id/1086/100/100",
    },
    content:
      "Visited the art museum today. The modern art section was truly inspiring!",
    images: [
      "https://picsum.photos/id/418/300/200",
      "https://picsum.photos/id/419/300/200",
      "https://picsum.photos/id/420/300/200",
      "https://picsum.photos/id/421/300/200",
    ],
    createdAt: "2023-05-24T08:30:00Z",
    stats: {
      likes: 41,
      comments: 11,
      shares: 2,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "2 hours",
  },
  {
    id: "post187",
    author: {
      id: "user87",
      name: "Leo Foster",
      avatar: "https://picsum.photos/id/1087/100/100",
    },
    content:
      "Tried out a new recipe for homemade pizza. It turned out delicious!",
    images: [
      "https://picsum.photos/id/422/300/200",
      "https://picsum.photos/id/423/300/200",
    ],
    liked: true,
    createdAt: "2023-05-24T08:00:00Z",
    stats: {
      likes: 29,
      comments: 7,
      shares: 1,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "public",
    timeAgo: "3 hours",
  },
  {
    id: "post188",
    author: {
      id: "user88",
      name: "Aurora Reed",
      avatar: "https://picsum.photos/id/1088/100/100",
    },
    content:
      "Hiking adventure with friends this weekend. The views were amazing!",
    images: [
      "https://picsum.photos/id/424/300/200",
      "https://picsum.photos/id/425/300/200",
      "https://picsum.photos/id/426/300/200",
      "https://picsum.photos/id/427/300/200",
    ],
    createdAt: "2023-05-24T07:30:00Z",
    stats: {
      likes: 54,
      comments: 18,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "4 hours",
  },
  {
    id: "post189",
    author: {
      id: "user89",
      name: "Gabriel Wood",
      avatar: "https://picsum.photos/id/1089/100/100",
    },
    content:
      "Attended a live coding event. Learned a lot about React Native hooks.",
    images: [
      "https://picsum.photos/id/428/300/200",
      "https://picsum.photos/id/429/300/200",
      "https://picsum.photos/id/430/300/200",
    ],
    createdAt: "2023-05-24T07:00:00Z",
    stats: {
      likes: 33,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "5 hours",
  },
  {
    id: "post190",
    author: {
      id: "user90",
      name: "Stella Price",
      avatar: "https://picsum.photos/id/1090/100/100",
    },
    content:
      "Weekend photography walk in the old town. Captured some beautiful moments.",
    images: [
      "https://picsum.photos/id/431/300/200",
      "https://picsum.photos/id/432/300/200",
      "https://picsum.photos/id/433/300/200",
    ],
    createdAt: "2023-05-24T06:30:00Z",
    stats: {
      likes: 47,
      comments: 13,
      shares: 4,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "6 hours",
  },
  {
    id: "post191",
    author: {
      id: "user91",
      name: "Carter Bell",
      avatar: "https://picsum.photos/id/1091/100/100",
    },
    content: "Just finished a marathon! Feeling exhausted but accomplished.",
    images: [
      "https://picsum.photos/id/434/300/200",
      "https://picsum.photos/id/435/300/200",
    ],
    createdAt: "2023-05-24T06:00:00Z",
    stats: {
      likes: 52,
      comments: 16,
      shares: 5,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "7 hours",
  },
  {
    id: "post192",
    author: {
      id: "user92",
      name: "Savannah Cooper",
      avatar: "https://picsum.photos/id/1092/100/100",
    },
    content: "Had a fun game night with friends. Board games are the best!",
    images: [
      "https://picsum.photos/id/436/300/200",
      "https://picsum.photos/id/437/300/200",
      "https://picsum.photos/id/438/300/200",
    ],
    createdAt: "2023-05-24T05:30:00Z",
    stats: {
      likes: 36,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "friends",
    timeAgo: "8 hours",
  },
  {
    id: "post193",
    author: {
      id: "user93",
      name: "Wyatt Morgan",
      avatar: "https://picsum.photos/id/1093/100/100",
    },
    content:
      "Experimented with watercolor painting today. Love how the colors blend.",
    images: [
      "https://picsum.photos/id/439/300/200",
      "https://picsum.photos/id/440/300/200",
      "https://picsum.photos/id/441/300/200",
      "https://picsum.photos/id/442/300/200",
    ],
    createdAt: "2023-05-24T05:00:00Z",
    stats: {
      likes: 28,
      comments: 7,
      shares: 1,
    },
    liked: true,
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "public",
    timeAgo: "9 hours",
  },
  {
    id: "post194",
    author: {
      id: "user94",
      name: "Ellie Bailey",
      avatar: "https://picsum.photos/id/1094/100/100",
    },
    content: "Just finished reading a new book on AI. Highly recommend it!",
    images: [
      "https://picsum.photos/id/443/300/200",
      "https://picsum.photos/id/444/300/200",
    ],
    createdAt: "2023-05-24T04:30:00Z",
    stats: {
      likes: 31,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g1",
      name: "AI Enthusiasts - Applying A.I. & Data in Daily Life",
    },
    privacy: "public",
    timeAgo: "10 hours",
  },
  {
    id: "post195",
    author: {
      id: "user95",
      name: "Lincoln Rivera",
      avatar: "https://picsum.photos/id/1095/100/100",
    },
    content:
      "Tried a new workout routine at the gym. Muscles are sore but it's worth it.",
    images: [
      "https://picsum.photos/id/445/300/200",
      "https://picsum.photos/id/446/300/200",
      "https://picsum.photos/id/447/300/200",
    ],
    createdAt: "2023-05-24T04:00:00Z",
    stats: {
      likes: 44,
      comments: 12,
      shares: 3,
    },
    group: {
      id: "g11",
      name: "Fitness Motivation",
    },
    privacy: "public",
    timeAgo: "11 hours",
  },
  {
    id: "post196",
    author: {
      id: "user96",
      name: "Paisley Brooks",
      avatar: "https://picsum.photos/id/1096/100/100",
    },
    content: "Weekend trip to the countryside. The fresh air is so refreshing.",
    images: [
      "https://picsum.photos/id/448/300/200",
      "https://picsum.photos/id/449/300/200",
      "https://picsum.photos/id/450/300/200",
      "https://picsum.photos/id/451/300/200",
    ],
    createdAt: "2023-05-24T03:30:00Z",
    stats: {
      likes: 57,
      comments: 15,
      shares: 6,
    },
    group: {
      id: "g9",
      name: "Travel Lovers Community",
    },
    privacy: "friends",
    timeAgo: "12 hours",
  },
  {
    id: "post197",
    author: {
      id: "user97",
      name: "Nora Jenkins",
      avatar: "https://picsum.photos/id/1097/100/100",
    },
    content: "Cooked a big family dinner tonight. Everyone loved the dessert!",
    images: [
      "https://picsum.photos/id/452/300/200",
      "https://picsum.photos/id/453/300/200",
      "https://picsum.photos/id/454/300/200",
    ],
    createdAt: "2023-05-24T03:00:00Z",
    stats: {
      likes: 39,
      comments: 10,
      shares: 2,
    },
    group: {
      id: "g12",
      name: "Foodies United",
    },
    privacy: "friends",
    timeAgo: "13 hours",
  },
  {
    id: "post198",
    author: {
      id: "user98",
      name: "Easton Simmons",
      avatar: "https://picsum.photos/id/1098/100/100",
    },
    content:
      "Just finished a React Native side project. Excited to share it soon!",
    images: [
      "https://picsum.photos/id/455/300/200",
      "https://picsum.photos/id/456/300/200",
    ],
    createdAt: "2023-05-24T02:30:00Z",
    stats: {
      likes: 26,
      comments: 6,
      shares: 1,
    },
    liked: true,
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "14 hours",
  },
  {
    id: "post199",
    author: {
      id: "user99",
      name: "Madeline Foster",
      avatar: "https://picsum.photos/id/1099/100/100",
    },
    content:
      "Attended a music festival last night. The performances were incredible!",
    images: [
      "https://picsum.photos/id/457/300/200",
      "https://picsum.photos/id/458/300/200",
      "https://picsum.photos/id/459/300/200",
      "https://picsum.photos/id/460/300/200",
    ],
    createdAt: "2023-05-24T02:00:00Z",
    stats: {
      likes: 62,
      comments: 17,
      shares: 7,
    },
    group: {
      id: "g13",
      name: "Music Lovers",
    },
    privacy: "friends",
    timeAgo: "15 hours",
  },
  {
    id: "post200",
    author: {
      id: "user100",
      name: "Hudson Bryant",
      avatar: "https://picsum.photos/id/1100/100/100",
    },
    content: "Just completed a challenging puzzle. Love brain teasers!",
    images: [
      "https://picsum.photos/id/461/300/200",
      "https://picsum.photos/id/462/300/200",
    ],
    createdAt: "2023-05-24T01:30:00Z",
    stats: {
      likes: 21,
      comments: 5,
      shares: 1,
    },
    group: {
      id: "g10",
      name: "Gamers Community",
    },
    privacy: "public",
    timeAgo: "16 hours",
  },
  {
    id: "post201",
    author: {
      id: "user101",
      name: "Brooklyn Griffin",
      avatar: "https://picsum.photos/id/1101/100/100",
    },
    content:
      "Took some macro shots of flowers in my garden. Nature is amazing.",
    images: [
      "https://picsum.photos/id/463/300/200",
      "https://picsum.photos/id/464/300/200",
      "https://picsum.photos/id/465/300/200",
    ],
    createdAt: "2023-05-24T01:00:00Z",
    stats: {
      likes: 34,
      comments: 8,
      shares: 2,
    },
    group: {
      id: "g7",
      name: "Photography Enthusiasts Club",
    },
    privacy: "public",
    timeAgo: "17 hours",
  },
  {
    id: "post202",
    author: {
      id: "user102",
      name: "Colton Russell",
      avatar: "https://picsum.photos/id/1102/100/100",
    },
    content:
      "Weekend coding challenge: built a weather app using React Native.",
    images: [
      "https://picsum.photos/id/466/300/200",
      "https://picsum.photos/id/467/300/200",
      "https://picsum.photos/id/468/300/200",
    ],
    createdAt: "2023-05-24T00:30:00Z",
    stats: {
      likes: 28,
      comments: 9,
      shares: 2,
    },
    group: {
      id: "g3",
      name: "React Native Developer Community",
    },
    privacy: "public",
    timeAgo: "18 hours",
  },
  {
    id: "post203",
    author: {
      id: "user103",
      name: "Everly Griffin",
      avatar: "https://picsum.photos/id/1103/100/100",
    },
    content: "Had a relaxing day painting landscapes. Art is my therapy.",
    images: [
      "https://picsum.photos/id/469/300/200",
      "https://picsum.photos/id/470/300/200",
      "https://picsum.photos/id/471/300/200",
      "https://picsum.photos/id/472/300/200",
    ],
    createdAt: "2023-05-24T00:00:00Z",
    stats: {
      likes: 35,
      comments: 10,
      shares: 3,
    },
    group: {
      id: "g14",
      name: "Art & Creativity",
    },
    privacy: "friends",
    timeAgo: "19 hours",
  },
  {
    id: "post204",
    author: {
      id: "user104",
      name: "Aiden Perry",
      avatar: "https://picsum.photos/id/1104/100/100",
    },
    content:
      "Just finished a creative writing workshop. Feeling inspired to start my own novel!",
    images: [
      "https://picsum.photos/id/473/300/200",
      "https://picsum.photos/id/474/300/200",
    ],
    liked: true,
    createdAt: "2023-05-23T23:30:00Z",
    stats: {
      likes: 24,
      comments: 7,
      shares: 2,
    },
    group: {
      id: "g8",
      name: "Programming Knowledge Sharing",
    },
    privacy: "public",
    timeAgo: "20 hours",
  },
];
