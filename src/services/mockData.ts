import { MediaItem, CategoryRow, UserProfile } from '../types/media';

export const USER_PROFILES: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Omar',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'user-2',
    name: 'Kids',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
    isKids: true,
  },
  {
    id: 'user-3',
    name: 'Studio VIP',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

export const BILLBOARD_ITEM: MediaItem = {
  "id": "tmdb-movie-693134",
  "tmdbId": 693134,
  "title": "Dune: Part Two",
  "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
  "backdropUrl": "https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
  "posterUrl": "https://image.tmdb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
  "trailerUrl": "https://www.youtube-nocookie.com/embed/p-4Xgcuwb00?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
  "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "youtubeKey": "p-4Xgcuwb00",
  "matchScore": 91,
  "maturityRating": "16+",
  "advisoryTags": [
    "4K Ultra HD",
    "Dolby Atmos",
    "Blockbuster"
  ],
  "releaseYear": 2024,
  "duration": "2h 47m",
  "quality": "4K Ultra HD",
  "genres": [
    "Science Fiction",
    "Adventure"
  ],
  "type": "movie",
  "cast": [
    "Timothée Chalamet",
    "Zendaya",
    "Rebecca Ferguson",
    "Javier Bardem",
    "Josh Brolin"
  ],
  "director": "Denis Villeneuve",
  "audioChannels": "Dolby Atmos 5.1",
  "subtitles": [
    "English [CC]",
    "Spanish",
    "French",
    "Arabic",
    "German"
  ],
  "isOriginal": false,
  "top10Rank": 1
};

export const ALL_MEDIA_ITEMS: MediaItem[] = [
  {
    "id": "tmdb-movie-693134",
    "tmdbId": 693134,
    "title": "Dune: Part Two",
    "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/p-4Xgcuwb00?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "p-4Xgcuwb00",
    "matchScore": 91,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 47m",
    "quality": "4K Ultra HD",
    "genres": [
      "Science Fiction",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Javier Bardem",
      "Josh Brolin"
    ],
    "director": "Denis Villeneuve",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-533535",
    "tmdbId": 533535,
    "title": "Deadpool & Wolverine",
    "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/dyq7hMlF9iY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "dyq7hMlF9iY",
    "matchScore": 86,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 8m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Ryan Reynolds",
      "Hugh Jackman",
      "Emma Corrin",
      "Matthew Macfadyen",
      "Dafne Keen"
    ],
    "director": "Shawn Levy",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-tv-100757",
    "tmdbId": 100757,
    "title": "Outer Banks",
    "overview": "On a North Carolina island of haves and have-nots, John B and his tight-knit crew of friends find mystery and adventure while hunting for lost treasure.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/fjJ0aqDeDXFzmFXXJ4CF3ryB19b.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/ovDgO2LPfwdVRfvScAqo9aMiIW.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/pfY3j-3uQhk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "pfY3j-3uQhk",
    "matchScore": 92,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2020,
    "duration": "5 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Mystery"
    ],
    "type": "tv",
    "cast": [
      "Chase Stokes",
      "Madelyn Cline",
      "Madison Bailey",
      "Jonathan Daviss",
      "Carlacia Grant"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-558449",
    "tmdbId": 558449,
    "title": "Gladiator II",
    "overview": "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/tOqIwliWMovSIZ9DyvHcHI7p2im.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/abP1EYHvGvc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "abP1EYHvGvc",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 28m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Adventure",
      "Drama"
    ],
    "type": "movie",
    "cast": [
      "Paul Mescal",
      "Denzel Washington",
      "Pedro Pascal",
      "Connie Nielsen",
      "Joseph Quinn"
    ],
    "director": "Ridley Scott",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-933260",
    "tmdbId": 933260,
    "title": "The Substance",
    "overview": "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/bVSOgrxasVJF6V71T7v2KfBRSzu.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vhbQQdPnfLUxhdXhREITF5cYppT.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/lR5nlovVgvQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "lR5nlovVgvQ",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 21m",
    "quality": "4K Ultra HD",
    "genres": [
      "Horror",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Demi Moore",
      "Margaret Qualley",
      "Dennis Quaid",
      "Edward Hamilton-Clark",
      "Gore Abrams"
    ],
    "director": "Coralie Fargeat",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-872585",
    "tmdbId": 872585,
    "title": "Oppenheimer",
    "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/hlZO437mwXQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "hlZO437mwXQ",
    "matchScore": 90,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "3h 1m",
    "quality": "4K Ultra HD",
    "genres": [
      "Drama",
      "History"
    ],
    "type": "movie",
    "cast": [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr.",
      "Florence Pugh"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-tv-66732",
    "tmdbId": 66732,
    "title": "Stranger Things",
    "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/mnd7sFt5c3A?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "mnd7sFt5c3A",
    "matchScore": 96,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2016,
    "duration": "5 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Mystery",
      "Sci-Fi & Fantasy"
    ],
    "type": "tv",
    "cast": [
      "Winona Ryder",
      "David Harbour",
      "Millie Bobby Brown",
      "Finn Wolfhard",
      "Gaten Matarazzo"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-119051",
    "tmdbId": 119051,
    "title": "Wednesday",
    "overview": "Smart, sarcastic and a little dead inside, Wednesday Addams investigates twisted mysteries while making new friends — and foes — at Nevermore Academy.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Qa5kFRxBkNw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Qa5kFRxBkNw",
    "matchScore": 93,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2022,
    "duration": "3 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Sci-Fi & Fantasy",
      "Mystery",
      "Comedy"
    ],
    "type": "tv",
    "cast": [
      "Jenna Ortega",
      "Steve Buscemi",
      "Emma Myers",
      "Hunter Doohan",
      "Joy Sunday"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-93405",
    "tmdbId": 93405,
    "title": "Squid Game",
    "overview": "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/oqxAJKy0ii4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "oqxAJKy0ii4",
    "matchScore": 89,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2021,
    "duration": "3 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Mystery",
      "Drama"
    ],
    "type": "tv",
    "cast": [
      "Lee Jung-jae",
      "Yim Si-wan",
      "Wi Ha-jun",
      "Jo Yuri",
      "Lee Byung-hun"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-569094",
    "tmdbId": 569094,
    "title": "Spider-Man: Across the Spider-Verse",
    "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/LYtS6yKsOEQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "LYtS6yKsOEQ",
    "matchScore": 93,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Animation",
      "Action",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Shameik Moore",
      "Hailee Steinfeld",
      "Brian Tyree Henry",
      "Luna Lauren Vélez",
      "Jake Johnson"
    ],
    "director": "Justin K. Thompson",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-157336",
    "tmdbId": 157336,
    "title": "Interstellar",
    "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/PG5c2GgkA2w?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "PG5c2GgkA2w",
    "matchScore": 95,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2014,
    "duration": "2h 49m",
    "quality": "4K Ultra HD",
    "genres": [
      "Adventure",
      "Drama",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Michael Caine",
      "Jessica Chastain",
      "Casey Affleck"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-27205",
    "tmdbId": 27205,
    "title": "Inception",
    "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/cdx31ak4KbQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "cdx31ak4KbQ",
    "matchScore": 94,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2010,
    "duration": "2h 28m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Science Fiction",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Ken Watanabe",
      "Tom Hardy",
      "Elliot Page"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-361743",
    "tmdbId": 361743,
    "title": "Top Gun: Maverick",
    "overview": "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Klc__shdj88?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Klc__shdj88",
    "matchScore": 92,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2022,
    "duration": "2h 11m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Drama"
    ],
    "type": "movie",
    "cast": [
      "Tom Cruise",
      "Miles Teller",
      "Jennifer Connelly",
      "Bashir Salahuddin",
      "Jon Hamm"
    ],
    "director": "Joseph Kosinski",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-414906",
    "tmdbId": 414906,
    "title": "The Batman",
    "overview": "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/rvtdN5XkWAfGX6xDuPL6yYS2seK.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/XS8rfqYJXRY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "XS8rfqYJXRY",
    "matchScore": 87,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2022,
    "duration": "2h 57m",
    "quality": "4K Ultra HD",
    "genres": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "type": "movie",
    "cast": [
      "Robert Pattinson",
      "Zoë Kravitz",
      "Jeffrey Wright",
      "Colin Farrell",
      "Paul Dano"
    ],
    "director": "Matt Reeves",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-512195",
    "tmdbId": 512195,
    "title": "Red Notice",
    "overview": "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/p34WRcgkN2QIHcds5FtFiSpV3PC.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Pj0wz7zu3Ms?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Pj0wz7zu3Ms",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2021,
    "duration": "1h 58m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Dwayne Johnson",
      "Ryan Reynolds",
      "Gal Gadot",
      "Ritu Arya",
      "Chris Diamantopoulos"
    ],
    "director": "Rawson Marshall Thurber",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-661374",
    "tmdbId": 661374,
    "title": "Glass Onion: A Knives Out Mystery",
    "overview": "World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery surrounding a tech billionaire and his eclectic crew of friends.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/y3uOfZAYwLkbvhunswBCskNMrfI.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/gj5ibYSz8C0?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "gj5ibYSz8C0",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2022,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Comedy",
      "Crime",
      "Mystery"
    ],
    "type": "movie",
    "cast": [
      "Daniel Craig",
      "Edward Norton",
      "Janelle Monáe",
      "Kathryn Hahn",
      "Leslie Odom Jr."
    ],
    "director": "Rian Johnson",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-697843",
    "tmdbId": 697843,
    "title": "Extraction 2",
    "overview": "Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission: saving the imprisoned family of a ruthless gangster.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/wRxLAw4l17LqiFcPLkobriPTZAw.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Y274jZs5s7s?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Y274jZs5s7s",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 2m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Thriller",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Chris Hemsworth",
      "Golshifteh Farahani",
      "Adam Bessa",
      "Tornike Gogrichiani",
      "Tornike Bziava"
    ],
    "director": "Sam Hargrave",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-726209",
    "tmdbId": 726209,
    "title": "Leave the World Behind",
    "overview": "A family's getaway to a luxurious rental home takes an ominous turn when a cyberattack knocks out their devices—and two strangers appear at their door.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5cRw2QHQz5bp7W2KLdSpZoFoTTw.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/29rhl1xopxA7JlGVVsf1UHfYPvN.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/xM4ILvKeTxs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "xM4ILvKeTxs",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "type": "movie",
    "cast": [
      "Julia Roberts",
      "Ethan Hawke",
      "Mahershala Ali",
      "Myha'la",
      "Farrah Mackenzie"
    ],
    "director": "Sam Esmail",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-280180",
    "tmdbId": 280180,
    "title": "Beverly Hills Cop: Axel F",
    "overview": "Forty years after his unforgettable first case in Beverly Hills, Detroit cop Axel Foley returns to do what he does best: solve crimes and cause chaos.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/rrwt0u1rW685u9bJ9ougg5HJEHC.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/yE0iZBxkL8aKYNkkeHoUzx5M88c.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/4T4YPfCbPto?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "4T4YPfCbPto",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 58m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Eddie Murphy",
      "Joseph Gordon-Levitt",
      "Taylour Paige",
      "Judge Reinhold",
      "John Ashton"
    ],
    "director": "Mark Molloy",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-94605",
    "tmdbId": 94605,
    "title": "Arcane",
    "overview": "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/W4gLFBNGgiY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "W4gLFBNGgiY",
    "matchScore": 97,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2021,
    "duration": "2 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Animation",
      "Action & Adventure",
      "Sci-Fi & Fantasy"
    ],
    "type": "tv",
    "cast": [
      "Hailee Steinfeld",
      "Ella Purnell"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-111110",
    "tmdbId": 111110,
    "title": "ONE PIECE",
    "overview": "With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/qD211Hb5XwFxrszzBBe5EUYJerh.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/blWCPEqDGLBuLB9u89CxP9ORQP4.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/l6kp780S-os?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "l6kp780S-os",
    "matchScore": 91,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2023,
    "duration": "3 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Sci-Fi & Fantasy"
    ],
    "type": "tv",
    "cast": [
      "Iñaki Godoy",
      "Emily Rudd",
      "Mackenyu",
      "Jacob Gibson",
      "Taz Skylar"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-1022789",
    "tmdbId": 1022789,
    "title": "Inside Out 2",
    "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/QGFELnpig2M?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "QGFELnpig2M",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 37m",
    "quality": "4K Ultra HD",
    "genres": [
      "Animation",
      "Adventure",
      "Comedy"
    ],
    "type": "movie",
    "cast": [
      "Amy Poehler",
      "Maya Hawke",
      "Kensington Tallman",
      "Liza Lapira",
      "Tony Hale"
    ],
    "director": "Kelsey Mann",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-945961",
    "tmdbId": 945961,
    "title": "Alien: Romulus",
    "overview": "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/bQlwYnouC98?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "bQlwYnouC98",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 59m",
    "quality": "4K Ultra HD",
    "genres": [
      "Horror",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Cailee Spaeny",
      "David Jonsson",
      "Archie Renaux",
      "Isabela Merced",
      "Spike Fearn"
    ],
    "director": "Fede Álvarez",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-718821",
    "tmdbId": 718821,
    "title": "Twisters",
    "overview": "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/5fuQUrEW8oc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "5fuQUrEW8oc",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 3m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Thriller"
    ],
    "type": "movie",
    "cast": [
      "Daisy Edgar-Jones",
      "Glen Powell",
      "Anthony Ramos",
      "Brandon Perea",
      "Maura Tierney"
    ],
    "director": "Lee Isaac Chung",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-603692",
    "tmdbId": 603692,
    "title": "John Wick: Chapter 4",
    "overview": "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/7I6VUdPj6tQECNHdviJkUHD2u89.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/yjRHZEUamCc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "yjRHZEUamCc",
    "matchScore": 87,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 50m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Thriller",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Keanu Reeves",
      "Donnie Yen",
      "Bill Skarsgård",
      "Ian McShane",
      "Laurence Fishburne"
    ],
    "director": "Chad Stahelski",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-238628",
    "tmdbId": 238628,
    "title": "Tangerines",
    "overview": "War in Abkhazia, 1992. An Estonian man Ivo has stayed behind to harvest his crops of tangerines. In a bloody conflict at his door, a wounded man is left behind, and Ivo is forced to take him in.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/6nPbmf5ctz3xFDWEMNokV4vUpyt.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/jNKUXcwZr1vpgq7sGTCEqdngo4Z.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/WdHwowSRRcs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "WdHwowSRRcs",
    "matchScore": 87,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2013,
    "duration": "1h 27m",
    "quality": "4K Ultra HD",
    "genres": [
      "Drama",
      "War"
    ],
    "type": "movie",
    "cast": [
      "Lembit Ulfsak",
      "Giorgi Nakashidze",
      "Elmo Nüganen",
      "Misha Meskhi",
      "Raivo Trass"
    ],
    "director": "Zaza Urushadze",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  }
];

export const TANGERINES_ITEM: MediaItem = ALL_MEDIA_ITEMS.find((i) => i.title.toLowerCase().includes('tangerines')) || ALL_MEDIA_ITEMS[0];

export const CATEGORY_ROWS: CategoryRow[] = [
  {
    id: 'trending-now',
    title: 'Trending on Netflix & Viral Hits',
    items: [
  {
    "id": "tmdb-movie-533535",
    "tmdbId": 533535,
    "title": "Deadpool & Wolverine",
    "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/dyq7hMlF9iY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "dyq7hMlF9iY",
    "matchScore": 86,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 8m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Ryan Reynolds",
      "Hugh Jackman",
      "Emma Corrin",
      "Matthew Macfadyen",
      "Dafne Keen"
    ],
    "director": "Shawn Levy",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-693134",
    "tmdbId": 693134,
    "title": "Dune: Part Two",
    "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/p-4Xgcuwb00?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "p-4Xgcuwb00",
    "matchScore": 91,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 47m",
    "quality": "4K Ultra HD",
    "genres": [
      "Science Fiction",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Javier Bardem",
      "Josh Brolin"
    ],
    "director": "Denis Villeneuve",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-tv-100757",
    "tmdbId": 100757,
    "title": "Outer Banks",
    "overview": "On a North Carolina island of haves and have-nots, John B and his tight-knit crew of friends find mystery and adventure while hunting for lost treasure.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/fjJ0aqDeDXFzmFXXJ4CF3ryB19b.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/ovDgO2LPfwdVRfvScAqo9aMiIW.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/pfY3j-3uQhk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "pfY3j-3uQhk",
    "matchScore": 92,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2020,
    "duration": "5 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Mystery"
    ],
    "type": "tv",
    "cast": [
      "Chase Stokes",
      "Madelyn Cline",
      "Madison Bailey",
      "Jonathan Daviss",
      "Carlacia Grant"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-933260",
    "tmdbId": 933260,
    "title": "The Substance",
    "overview": "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/bVSOgrxasVJF6V71T7v2KfBRSzu.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vhbQQdPnfLUxhdXhREITF5cYppT.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/lR5nlovVgvQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "lR5nlovVgvQ",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 21m",
    "quality": "4K Ultra HD",
    "genres": [
      "Horror",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Demi Moore",
      "Margaret Qualley",
      "Dennis Quaid",
      "Edward Hamilton-Clark",
      "Gore Abrams"
    ],
    "director": "Coralie Fargeat",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-558449",
    "tmdbId": 558449,
    "title": "Gladiator II",
    "overview": "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/tOqIwliWMovSIZ9DyvHcHI7p2im.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/abP1EYHvGvc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "abP1EYHvGvc",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 28m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Adventure",
      "Drama"
    ],
    "type": "movie",
    "cast": [
      "Paul Mescal",
      "Denzel Washington",
      "Pedro Pascal",
      "Connie Nielsen",
      "Joseph Quinn"
    ],
    "director": "Ridley Scott",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-945961",
    "tmdbId": 945961,
    "title": "Alien: Romulus",
    "overview": "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/bQlwYnouC98?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "bQlwYnouC98",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 59m",
    "quality": "4K Ultra HD",
    "genres": [
      "Horror",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Cailee Spaeny",
      "David Jonsson",
      "Archie Renaux",
      "Isabela Merced",
      "Spike Fearn"
    ],
    "director": "Fede Álvarez",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-726209",
    "tmdbId": 726209,
    "title": "Leave the World Behind",
    "overview": "A family's getaway to a luxurious rental home takes an ominous turn when a cyberattack knocks out their devices—and two strangers appear at their door.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5cRw2QHQz5bp7W2KLdSpZoFoTTw.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/29rhl1xopxA7JlGVVsf1UHfYPvN.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/xM4ILvKeTxs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "xM4ILvKeTxs",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "type": "movie",
    "cast": [
      "Julia Roberts",
      "Ethan Hawke",
      "Mahershala Ali",
      "Myha'la",
      "Farrah Mackenzie"
    ],
    "director": "Sam Esmail",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-280180",
    "tmdbId": 280180,
    "title": "Beverly Hills Cop: Axel F",
    "overview": "Forty years after his unforgettable first case in Beverly Hills, Detroit cop Axel Foley returns to do what he does best: solve crimes and cause chaos.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/rrwt0u1rW685u9bJ9ougg5HJEHC.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/yE0iZBxkL8aKYNkkeHoUzx5M88c.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/4T4YPfCbPto?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "4T4YPfCbPto",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 58m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Eddie Murphy",
      "Joseph Gordon-Levitt",
      "Taylour Paige",
      "Judge Reinhold",
      "John Ashton"
    ],
    "director": "Mark Molloy",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-512195",
    "tmdbId": 512195,
    "title": "Red Notice",
    "overview": "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/p34WRcgkN2QIHcds5FtFiSpV3PC.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Pj0wz7zu3Ms?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Pj0wz7zu3Ms",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2021,
    "duration": "1h 58m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Dwayne Johnson",
      "Ryan Reynolds",
      "Gal Gadot",
      "Ritu Arya",
      "Chris Diamantopoulos"
    ],
    "director": "Rawson Marshall Thurber",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-718821",
    "tmdbId": 718821,
    "title": "Twisters",
    "overview": "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/5fuQUrEW8oc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "5fuQUrEW8oc",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 3m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Thriller"
    ],
    "type": "movie",
    "cast": [
      "Daisy Edgar-Jones",
      "Glen Powell",
      "Anthony Ramos",
      "Brandon Perea",
      "Maura Tierney"
    ],
    "director": "Lee Isaac Chung",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-1022789",
    "tmdbId": 1022789,
    "title": "Inside Out 2",
    "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/QGFELnpig2M?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "QGFELnpig2M",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 37m",
    "quality": "4K Ultra HD",
    "genres": [
      "Animation",
      "Adventure",
      "Comedy"
    ],
    "type": "movie",
    "cast": [
      "Amy Poehler",
      "Maya Hawke",
      "Kensington Tallman",
      "Liza Lapira",
      "Tony Hale"
    ],
    "director": "Kelsey Mann",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-661374",
    "tmdbId": 661374,
    "title": "Glass Onion: A Knives Out Mystery",
    "overview": "World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery surrounding a tech billionaire and his eclectic crew of friends.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/y3uOfZAYwLkbvhunswBCskNMrfI.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/gj5ibYSz8C0?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "gj5ibYSz8C0",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2022,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Comedy",
      "Crime",
      "Mystery"
    ],
    "type": "movie",
    "cast": [
      "Daniel Craig",
      "Edward Norton",
      "Janelle Monáe",
      "Kathryn Hahn",
      "Leslie Odom Jr."
    ],
    "director": "Rian Johnson",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  }
],
  },
  {
    id: 'top-10-today',
    title: 'Top 10 Movies & Series Today',
    isTop10: true,
    items: [
  {
    "id": "tmdb-movie-693134",
    "tmdbId": 693134,
    "title": "Dune: Part Two",
    "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/p-4Xgcuwb00?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "p-4Xgcuwb00",
    "matchScore": 91,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 47m",
    "quality": "4K Ultra HD",
    "genres": [
      "Science Fiction",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Javier Bardem",
      "Josh Brolin"
    ],
    "director": "Denis Villeneuve",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 1
  },
  {
    "id": "tmdb-movie-533535",
    "tmdbId": 533535,
    "title": "Deadpool & Wolverine",
    "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/dyq7hMlF9iY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "dyq7hMlF9iY",
    "matchScore": 86,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 8m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Ryan Reynolds",
      "Hugh Jackman",
      "Emma Corrin",
      "Matthew Macfadyen",
      "Dafne Keen"
    ],
    "director": "Shawn Levy",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 2
  },
  {
    "id": "tmdb-movie-558449",
    "tmdbId": 558449,
    "title": "Gladiator II",
    "overview": "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist. With rage in his heart and the future of the Empire at stake, Lucius must look to his past to find strength and honor to return the glory of Rome to its people.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/tOqIwliWMovSIZ9DyvHcHI7p2im.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/abP1EYHvGvc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "abP1EYHvGvc",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 28m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Adventure",
      "Drama"
    ],
    "type": "movie",
    "cast": [
      "Paul Mescal",
      "Denzel Washington",
      "Pedro Pascal",
      "Connie Nielsen",
      "Joseph Quinn"
    ],
    "director": "Ridley Scott",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 3
  },
  {
    "id": "tmdb-movie-933260",
    "tmdbId": 933260,
    "title": "The Substance",
    "overview": "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/bVSOgrxasVJF6V71T7v2KfBRSzu.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vhbQQdPnfLUxhdXhREITF5cYppT.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/lR5nlovVgvQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "lR5nlovVgvQ",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 21m",
    "quality": "4K Ultra HD",
    "genres": [
      "Horror",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Demi Moore",
      "Margaret Qualley",
      "Dennis Quaid",
      "Edward Hamilton-Clark",
      "Gore Abrams"
    ],
    "director": "Coralie Fargeat",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 4
  },
  {
    "id": "tmdb-movie-945961",
    "tmdbId": 945961,
    "title": "Alien: Romulus",
    "overview": "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/bQlwYnouC98?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "bQlwYnouC98",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 59m",
    "quality": "4K Ultra HD",
    "genres": [
      "Horror",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Cailee Spaeny",
      "David Jonsson",
      "Archie Renaux",
      "Isabela Merced",
      "Spike Fearn"
    ],
    "director": "Fede Álvarez",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 5
  },
  {
    "id": "tmdb-movie-718821",
    "tmdbId": 718821,
    "title": "Twisters",
    "overview": "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/5fuQUrEW8oc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "5fuQUrEW8oc",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 3m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Thriller"
    ],
    "type": "movie",
    "cast": [
      "Daisy Edgar-Jones",
      "Glen Powell",
      "Anthony Ramos",
      "Brandon Perea",
      "Maura Tierney"
    ],
    "director": "Lee Isaac Chung",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 6
  },
  {
    "id": "tmdb-movie-1022789",
    "tmdbId": 1022789,
    "title": "Inside Out 2",
    "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/QGFELnpig2M?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "QGFELnpig2M",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 37m",
    "quality": "4K Ultra HD",
    "genres": [
      "Animation",
      "Adventure",
      "Comedy"
    ],
    "type": "movie",
    "cast": [
      "Amy Poehler",
      "Maya Hawke",
      "Kensington Tallman",
      "Liza Lapira",
      "Tony Hale"
    ],
    "director": "Kelsey Mann",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 7
  },
  {
    "id": "tmdb-movie-872585",
    "tmdbId": 872585,
    "title": "Oppenheimer",
    "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/hlZO437mwXQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "hlZO437mwXQ",
    "matchScore": 90,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "3h 1m",
    "quality": "4K Ultra HD",
    "genres": [
      "Drama",
      "History"
    ],
    "type": "movie",
    "cast": [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr.",
      "Florence Pugh"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 8
  },
  {
    "id": "tmdb-movie-569094",
    "tmdbId": 569094,
    "title": "Spider-Man: Across the Spider-Verse",
    "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/LYtS6yKsOEQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "LYtS6yKsOEQ",
    "matchScore": 93,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Animation",
      "Action",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Shameik Moore",
      "Hailee Steinfeld",
      "Brian Tyree Henry",
      "Luna Lauren Vélez",
      "Jake Johnson"
    ],
    "director": "Justin K. Thompson",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false,
    "top10Rank": 9
  },
  {
    "id": "tmdb-movie-697843",
    "tmdbId": 697843,
    "title": "Extraction 2",
    "overview": "Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission: saving the imprisoned family of a ruthless gangster.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/wRxLAw4l17LqiFcPLkobriPTZAw.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Y274jZs5s7s?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Y274jZs5s7s",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 2m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Thriller",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Chris Hemsworth",
      "Golshifteh Farahani",
      "Adam Bessa",
      "Tornike Gogrichiani",
      "Tornike Bziava"
    ],
    "director": "Sam Hargrave",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true,
    "top10Rank": 10
  }
],
  },
  {
    id: 'netflix-flagship',
    title: 'Netflix Flagship & Global Sensation Series',
    items: [
  {
    "id": "tmdb-tv-100757",
    "tmdbId": 100757,
    "title": "Outer Banks",
    "overview": "On a North Carolina island of haves and have-nots, John B and his tight-knit crew of friends find mystery and adventure while hunting for lost treasure.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/fjJ0aqDeDXFzmFXXJ4CF3ryB19b.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/ovDgO2LPfwdVRfvScAqo9aMiIW.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/pfY3j-3uQhk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "pfY3j-3uQhk",
    "matchScore": 92,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2020,
    "duration": "5 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Mystery"
    ],
    "type": "tv",
    "cast": [
      "Chase Stokes",
      "Madelyn Cline",
      "Madison Bailey",
      "Jonathan Daviss",
      "Carlacia Grant"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-66732",
    "tmdbId": 66732,
    "title": "Stranger Things",
    "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/mnd7sFt5c3A?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "mnd7sFt5c3A",
    "matchScore": 96,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2016,
    "duration": "5 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Mystery",
      "Sci-Fi & Fantasy"
    ],
    "type": "tv",
    "cast": [
      "Winona Ryder",
      "David Harbour",
      "Millie Bobby Brown",
      "Finn Wolfhard",
      "Gaten Matarazzo"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-119051",
    "tmdbId": 119051,
    "title": "Wednesday",
    "overview": "Smart, sarcastic and a little dead inside, Wednesday Addams investigates twisted mysteries while making new friends — and foes — at Nevermore Academy.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Qa5kFRxBkNw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Qa5kFRxBkNw",
    "matchScore": 93,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2022,
    "duration": "3 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Sci-Fi & Fantasy",
      "Mystery",
      "Comedy"
    ],
    "type": "tv",
    "cast": [
      "Jenna Ortega",
      "Steve Buscemi",
      "Emma Myers",
      "Hunter Doohan",
      "Joy Sunday"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-93405",
    "tmdbId": 93405,
    "title": "Squid Game",
    "overview": "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/oqxAJKy0ii4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "oqxAJKy0ii4",
    "matchScore": 89,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2021,
    "duration": "3 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Mystery",
      "Drama"
    ],
    "type": "tv",
    "cast": [
      "Lee Jung-jae",
      "Yim Si-wan",
      "Wi Ha-jun",
      "Jo Yuri",
      "Lee Byung-hun"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-94605",
    "tmdbId": 94605,
    "title": "Arcane",
    "overview": "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/W4gLFBNGgiY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "W4gLFBNGgiY",
    "matchScore": 97,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2021,
    "duration": "2 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Animation",
      "Action & Adventure",
      "Sci-Fi & Fantasy"
    ],
    "type": "tv",
    "cast": [
      "Hailee Steinfeld",
      "Ella Purnell"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-tv-111110",
    "tmdbId": 111110,
    "title": "ONE PIECE",
    "overview": "With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/qD211Hb5XwFxrszzBBe5EUYJerh.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/blWCPEqDGLBuLB9u89CxP9ORQP4.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/l6kp780S-os?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "l6kp780S-os",
    "matchScore": 91,
    "maturityRating": "TV-MA",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Top Rated Series"
    ],
    "releaseYear": 2023,
    "duration": "3 Seasons",
    "quality": "4K Ultra HD",
    "genres": [
      "Action & Adventure",
      "Sci-Fi & Fantasy"
    ],
    "type": "tv",
    "cast": [
      "Iñaki Godoy",
      "Emily Rudd",
      "Mackenyu",
      "Jacob Gibson",
      "Taz Skylar"
    ],
    "director": "Acclaimed Director",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-512195",
    "tmdbId": 512195,
    "title": "Red Notice",
    "overview": "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/p34WRcgkN2QIHcds5FtFiSpV3PC.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Pj0wz7zu3Ms?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Pj0wz7zu3Ms",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2021,
    "duration": "1h 58m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Dwayne Johnson",
      "Ryan Reynolds",
      "Gal Gadot",
      "Ritu Arya",
      "Chris Diamantopoulos"
    ],
    "director": "Rawson Marshall Thurber",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-697843",
    "tmdbId": 697843,
    "title": "Extraction 2",
    "overview": "Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission: saving the imprisoned family of a ruthless gangster.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/wRxLAw4l17LqiFcPLkobriPTZAw.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Y274jZs5s7s?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Y274jZs5s7s",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 2m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Thriller",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Chris Hemsworth",
      "Golshifteh Farahani",
      "Adam Bessa",
      "Tornike Gogrichiani",
      "Tornike Bziava"
    ],
    "director": "Sam Hargrave",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-726209",
    "tmdbId": 726209,
    "title": "Leave the World Behind",
    "overview": "A family's getaway to a luxurious rental home takes an ominous turn when a cyberattack knocks out their devices—and two strangers appear at their door.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5cRw2QHQz5bp7W2KLdSpZoFoTTw.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/29rhl1xopxA7JlGVVsf1UHfYPvN.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/xM4ILvKeTxs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "xM4ILvKeTxs",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "type": "movie",
    "cast": [
      "Julia Roberts",
      "Ethan Hawke",
      "Mahershala Ali",
      "Myha'la",
      "Farrah Mackenzie"
    ],
    "director": "Sam Esmail",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-661374",
    "tmdbId": 661374,
    "title": "Glass Onion: A Knives Out Mystery",
    "overview": "World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery surrounding a tech billionaire and his eclectic crew of friends.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/y3uOfZAYwLkbvhunswBCskNMrfI.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/gj5ibYSz8C0?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "gj5ibYSz8C0",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2022,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Comedy",
      "Crime",
      "Mystery"
    ],
    "type": "movie",
    "cast": [
      "Daniel Craig",
      "Edward Norton",
      "Janelle Monáe",
      "Kathryn Hahn",
      "Leslie Odom Jr."
    ],
    "director": "Rian Johnson",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  },
  {
    "id": "tmdb-movie-280180",
    "tmdbId": 280180,
    "title": "Beverly Hills Cop: Axel F",
    "overview": "Forty years after his unforgettable first case in Beverly Hills, Detroit cop Axel Foley returns to do what he does best: solve crimes and cause chaos.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/rrwt0u1rW685u9bJ9ougg5HJEHC.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/yE0iZBxkL8aKYNkkeHoUzx5M88c.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/4T4YPfCbPto?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "4T4YPfCbPto",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 58m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Eddie Murphy",
      "Joseph Gordon-Levitt",
      "Taylour Paige",
      "Judge Reinhold",
      "John Ashton"
    ],
    "director": "Mark Molloy",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": true
  }
],
  },
  {
    id: 'action-scifi',
    title: 'Action & Sci-Fi Blockbusters',
    items: [
  {
    "id": "tmdb-movie-157336",
    "tmdbId": 157336,
    "title": "Interstellar",
    "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/PG5c2GgkA2w?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "PG5c2GgkA2w",
    "matchScore": 95,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2014,
    "duration": "2h 49m",
    "quality": "4K Ultra HD",
    "genres": [
      "Adventure",
      "Drama",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Michael Caine",
      "Jessica Chastain",
      "Casey Affleck"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-27205",
    "tmdbId": 27205,
    "title": "Inception",
    "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/cdx31ak4KbQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "cdx31ak4KbQ",
    "matchScore": 94,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2010,
    "duration": "2h 28m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Science Fiction",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Ken Watanabe",
      "Tom Hardy",
      "Elliot Page"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-361743",
    "tmdbId": 361743,
    "title": "Top Gun: Maverick",
    "overview": "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/Klc__shdj88?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "Klc__shdj88",
    "matchScore": 92,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2022,
    "duration": "2h 11m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Drama"
    ],
    "type": "movie",
    "cast": [
      "Tom Cruise",
      "Miles Teller",
      "Jennifer Connelly",
      "Bashir Salahuddin",
      "Jon Hamm"
    ],
    "director": "Joseph Kosinski",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-414906",
    "tmdbId": 414906,
    "title": "The Batman",
    "overview": "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/rvtdN5XkWAfGX6xDuPL6yYS2seK.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/XS8rfqYJXRY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "XS8rfqYJXRY",
    "matchScore": 87,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2022,
    "duration": "2h 57m",
    "quality": "4K Ultra HD",
    "genres": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "type": "movie",
    "cast": [
      "Robert Pattinson",
      "Zoë Kravitz",
      "Jeffrey Wright",
      "Colin Farrell",
      "Paul Dano"
    ],
    "director": "Matt Reeves",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-603692",
    "tmdbId": 603692,
    "title": "John Wick: Chapter 4",
    "overview": "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/7I6VUdPj6tQECNHdviJkUHD2u89.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/yjRHZEUamCc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "yjRHZEUamCc",
    "matchScore": 87,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 50m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Thriller",
      "Crime"
    ],
    "type": "movie",
    "cast": [
      "Keanu Reeves",
      "Donnie Yen",
      "Bill Skarsgård",
      "Ian McShane",
      "Laurence Fishburne"
    ],
    "director": "Chad Stahelski",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-569094",
    "tmdbId": 569094,
    "title": "Spider-Man: Across the Spider-Verse",
    "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/LYtS6yKsOEQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "LYtS6yKsOEQ",
    "matchScore": 93,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "2h 20m",
    "quality": "4K Ultra HD",
    "genres": [
      "Animation",
      "Action",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Shameik Moore",
      "Hailee Steinfeld",
      "Brian Tyree Henry",
      "Luna Lauren Vélez",
      "Jake Johnson"
    ],
    "director": "Justin K. Thompson",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-693134",
    "tmdbId": 693134,
    "title": "Dune: Part Two",
    "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/p-4Xgcuwb00?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "p-4Xgcuwb00",
    "matchScore": 91,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 47m",
    "quality": "4K Ultra HD",
    "genres": [
      "Science Fiction",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Javier Bardem",
      "Josh Brolin"
    ],
    "director": "Denis Villeneuve",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-533535",
    "tmdbId": 533535,
    "title": "Deadpool & Wolverine",
    "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/dyq7hMlF9iY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "dyq7hMlF9iY",
    "matchScore": 86,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 8m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Comedy",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Ryan Reynolds",
      "Hugh Jackman",
      "Emma Corrin",
      "Matthew Macfadyen",
      "Dafne Keen"
    ],
    "director": "Shawn Levy",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-945961",
    "tmdbId": 945961,
    "title": "Alien: Romulus",
    "overview": "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/bQlwYnouC98?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "bQlwYnouC98",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "1h 59m",
    "quality": "4K Ultra HD",
    "genres": [
      "Horror",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Cailee Spaeny",
      "David Jonsson",
      "Archie Renaux",
      "Isabela Merced",
      "Spike Fearn"
    ],
    "director": "Fede Álvarez",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  }
],
  },
  {
    id: 'critically-acclaimed',
    title: 'Critically Acclaimed Masterpieces',
    items: [
  {
    "id": "tmdb-movie-872585",
    "tmdbId": 872585,
    "title": "Oppenheimer",
    "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/hlZO437mwXQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "hlZO437mwXQ",
    "matchScore": 90,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2023,
    "duration": "3h 1m",
    "quality": "4K Ultra HD",
    "genres": [
      "Drama",
      "History"
    ],
    "type": "movie",
    "cast": [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr.",
      "Florence Pugh"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-157336",
    "tmdbId": 157336,
    "title": "Interstellar",
    "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/PG5c2GgkA2w?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "PG5c2GgkA2w",
    "matchScore": 95,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2014,
    "duration": "2h 49m",
    "quality": "4K Ultra HD",
    "genres": [
      "Adventure",
      "Drama",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Michael Caine",
      "Jessica Chastain",
      "Casey Affleck"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-238628",
    "tmdbId": 238628,
    "title": "Tangerines",
    "overview": "War in Abkhazia, 1992. An Estonian man Ivo has stayed behind to harvest his crops of tangerines. In a bloody conflict at his door, a wounded man is left behind, and Ivo is forced to take him in.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/6nPbmf5ctz3xFDWEMNokV4vUpyt.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/jNKUXcwZr1vpgq7sGTCEqdngo4Z.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/WdHwowSRRcs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "WdHwowSRRcs",
    "matchScore": 87,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2013,
    "duration": "1h 27m",
    "quality": "4K Ultra HD",
    "genres": [
      "Drama",
      "War"
    ],
    "type": "movie",
    "cast": [
      "Lembit Ulfsak",
      "Giorgi Nakashidze",
      "Elmo Nüganen",
      "Misha Meskhi",
      "Raivo Trass"
    ],
    "director": "Zaza Urushadze",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-933260",
    "tmdbId": 933260,
    "title": "The Substance",
    "overview": "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/bVSOgrxasVJF6V71T7v2KfBRSzu.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/vhbQQdPnfLUxhdXhREITF5cYppT.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/lR5nlovVgvQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "lR5nlovVgvQ",
    "matchScore": 85,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 21m",
    "quality": "4K Ultra HD",
    "genres": [
      "Horror",
      "Science Fiction"
    ],
    "type": "movie",
    "cast": [
      "Demi Moore",
      "Margaret Qualley",
      "Dennis Quaid",
      "Edward Hamilton-Clark",
      "Gore Abrams"
    ],
    "director": "Coralie Fargeat",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-693134",
    "tmdbId": 693134,
    "title": "Dune: Part Two",
    "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/p-4Xgcuwb00?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "p-4Xgcuwb00",
    "matchScore": 91,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2024,
    "duration": "2h 47m",
    "quality": "4K Ultra HD",
    "genres": [
      "Science Fiction",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Javier Bardem",
      "Josh Brolin"
    ],
    "director": "Denis Villeneuve",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  },
  {
    "id": "tmdb-movie-27205",
    "tmdbId": 27205,
    "title": "Inception",
    "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    "backdropUrl": "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    "posterUrl": "https://image.tmdb.org/t/p/w780/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    "trailerUrl": "https://www.youtube-nocookie.com/embed/cdx31ak4KbQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "youtubeKey": "cdx31ak4KbQ",
    "matchScore": 94,
    "maturityRating": "16+",
    "advisoryTags": [
      "4K Ultra HD",
      "Dolby Atmos",
      "Blockbuster"
    ],
    "releaseYear": 2010,
    "duration": "2h 28m",
    "quality": "4K Ultra HD",
    "genres": [
      "Action",
      "Science Fiction",
      "Adventure"
    ],
    "type": "movie",
    "cast": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Ken Watanabe",
      "Tom Hardy",
      "Elliot Page"
    ],
    "director": "Christopher Nolan",
    "audioChannels": "Dolby Atmos 5.1",
    "subtitles": [
      "English [CC]",
      "Spanish",
      "French",
      "Arabic",
      "German"
    ],
    "isOriginal": false
  }
],
  },
];
