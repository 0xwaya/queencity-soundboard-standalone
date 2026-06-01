/**
 * Latin Events Data
 * Curated compilation of hottest Latin events in Cincinnati/Northern KY
 * Updated: June 2026
 */

export interface LatinEvent {
  id: string;
  title: string;
  artist?: string;
  description: string;
  venue: string;
  venueCity: "Cincinnati" | "Covington" | "Newport" | "Other";
  eventDate: string;
  startTime?: string;
  endTime?: string;
  genre: "Salsa" | "Bachata" | "Reggaeton" | "Latin Jazz" | "Cumbia" | "Merengue" | "Festival" | "Mixed Latin";
  eventType: "Dance" | "Live Music" | "DJ Night" | "Festival" | "Workshop";
  ageRestriction?: "18+" | "21+" | "All Ages";
  ticketPrice?: string;
  ticketUrl?: string;
  websiteUrl?: string;
  instagramHandle?: string;
  notes?: string;
  featured: boolean;
  lastUpdated: string;
}

export const latinEvents: LatinEvent[] = [
  // RECURRING / SEASONAL
  {
    id: "salsa-square-summer",
    title: "Salsa on the Square",
    description: "Free outdoor salsa dancing and live Latin music in the heart of downtown Cincinnati. Community gathering featuring professional dancers and local musicians.",
    venue: "Fountain Square",
    venueCity: "Cincinnati",
    eventDate: "Every Friday (June-August)",
    startTime: "6:30 PM",
    endTime: "9:00 PM",
    genre: "Salsa",
    eventType: "Dance",
    ageRestriction: "All Ages",
    ticketPrice: "Free",
    websiteUrl: "https://www.fountainsquare.com",
    instagramHandle: "@fountainsquarecinci",
    notes: "Bring comfortable shoes and arrive early. No experience necessary. Great for beginners and seasoned dancers.",
    featured: true,
    lastUpdated: "2026-06-01",
  },
  {
    id: "cincinnati-latin-festival",
    title: "Cincinnati Latin Festival",
    description: "Annual celebration of Latin culture featuring live bands, DJ sets, food vendors, dancing competitions, and workshops from the Cincinnati Latin community.",
    venue: "Sawyer Point",
    venueCity: "Cincinnati",
    eventDate: "August 15-17, 2026",
    startTime: "11:00 AM",
    endTime: "11:00 PM",
    genre: "Festival",
    eventType: "Festival",
    ageRestriction: "All Ages",
    ticketPrice: "$10-15 (Free admission for children)",
    websiteUrl: "https://www.cincinnatilatinevents.org",
    instagramHandle: "@cincilatinfest",
    notes: "3-day celebration with live performances, food, crafts, and family activities. Major event bringing together all Latin communities.",
    featured: true,
    lastUpdated: "2026-06-01",
  },
  {
    id: "over-the-rhine-latin-night",
    title: "Over-the-Rhine Latin Nights",
    description: "Weekly Latin DJ nights rotating between venues in the trendy Over-the-Rhine neighborhood with salsa, bachata, reggaeton and mixed Latin beats.",
    venue: "Various (18th St Corridor)",
    venueCity: "Cincinnati",
    eventDate: "Most Thursdays & Saturdays",
    startTime: "10:00 PM",
    endTime: "2:00 AM",
    genre: "Mixed Latin",
    eventType: "DJ Night",
    ageRestriction: "21+",
    ticketPrice: "$10-15",
    instagramHandle: "@otrlatinnights",
    notes: "Check Instagram for rotating venues and specific dates. Popular with young professionals. Dress code: smart casual.",
    featured: true,
    lastUpdated: "2026-06-01",
  },
  {
    id: "proyecto-uno-merengue-hiphop",
    title: "90's Hiphop Merengue with Proyecto Uno",
    description: "Project Uno confirmed interest in a Cincinnati show. This event spotlights their iconic urban merengue sound for a night of dancing, nostalgia, and Latin party energy.",
    venue: "Madison Theater",
    venueCity: "Covington",
    eventDate: "Date TBD",
    startTime: "8:00 PM",
    genre: "Merengue",
    eventType: "Live Music",
    ageRestriction: "All Ages",
    ticketPrice: "TBD",
    ticketUrl: "https://proyectouno.net/event/",
    websiteUrl: "https://proyectouno.net",
    instagramHandle: "@proyectounoofficial",
    notes: "Official event interest confirmed; date and venue are being finalized. Sign up for updates and expect high-energy merengue hiphop hits.",
    featured: true,
    lastUpdated: "2026-06-01",
  },

  // UPCOMING SPECIFIC EVENTS
  {
    id: "miami-sound-machine-tribute",
    title: "Gloria Estefan & Miami Sound Machine Tribute",
    description: "High-energy tribute band performing all the hits from the iconic Latin pop duo. Dance and sing along to decades of Latin music classics.",
    venue: "Madison Theater",
    venueCity: "Cincinnati",
    eventDate: "June 21, 2026",
    startTime: "8:00 PM",
    genre: "Salsa",
    eventType: "Live Music",
    ageRestriction: "All Ages",
    ticketPrice: "$35-65",
    ticketUrl: "https://www.ticketweb.com",
    websiteUrl: "https://www.madisontheater.com",
    featured: true,
    lastUpdated: "2026-06-01",
  },
  {
    id: "latin-jazz-night-woodward",
    title: "Latin Jazz Night at Woodward Theater",
    description: "Sophisticated evening of live Latin jazz featuring Cincinnati's premier Latin jazz ensemble. Perfect for those who love jazz with a tropical twist.",
    venue: "Woodward Theater",
    venueCity: "Cincinnati",
    eventDate: "June 14, 2026",
    startTime: "7:30 PM",
    genre: "Latin Jazz",
    eventType: "Live Music",
    ageRestriction: "All Ages",
    ticketPrice: "$20-30",
    websiteUrl: "https://www.woodwardtheater.com",
    featured: false,
    lastUpdated: "2026-06-01",
  },
  {
    id: "bachata-night-northside",
    title: "Bachata Romance Night",
    description: "Intimate bachata dancing experience with live DJ and dance floor lessons. Perfect for couples or solo dancers wanting to learn this sensual style.",
    venue: "Northside Lounge",
    venueCity: "Cincinnati",
    eventDate: "June 19, 2026",
    startTime: "9:00 PM",
    endTime: "1:00 AM",
    genre: "Bachata",
    eventType: "DJ Night",
    ageRestriction: "21+",
    ticketPrice: "Free (2-drink minimum)",
    websiteUrl: "https://www.northsidelounge.com",
    instagramHandle: "@northsidecincy",
    notes: "Beginner-friendly. Complimentary dance lesson at 9:30 PM. Romantic ambiance.",
    featured: false,
    lastUpdated: "2026-06-01",
  },

  // COVINGTON / NORTHERN KY
  {
    id: "river-center-cumbia-festival",
    title: "Covington Cumbia & Caribbean Festival",
    description: "Celebration of Cumbia music and Caribbean culture just across the river. Live bands, cumbia dancing workshops, and traditional Latin cuisine.",
    venue: "Devou Park (Covington Riverfront)",
    venueCity: "Covington",
    eventDate: "July 10-12, 2026",
    startTime: "1:00 PM",
    endTime: "10:00 PM",
    genre: "Cumbia",
    eventType: "Festival",
    ageRestriction: "All Ages",
    ticketPrice: "Free",
    websiteUrl: "https://www.covingtonky.gov",
    notes: "Family-friendly with cumbia dance workshops. Short drive across the Roebling Bridge.",
    featured: true,
    lastUpdated: "2026-06-01",
  },
  {
    id: "newport-on-the-levee-latin",
    title: "Newport on the Levee: Latin Nights Summer Series",
    description: "Outdoor Latin music series featuring rotating local bands and DJs performing salsa, merengue, and mixed Latin at the waterfront venue.",
    venue: "Newport on the Levee",
    venueCity: "Newport",
    eventDate: "Thursdays (June-August)",
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    genre: "Mixed Latin",
    eventType: "DJ Night",
    ageRestriction: "All Ages",
    ticketPrice: "Free",
    websiteUrl: "https://www.newportonthelevee.com",
    instagramHandle: "@newportonthelevee",
    notes: "Riverside location with great food options. Free parking.",
    featured: true,
    lastUpdated: "2026-06-01",
  },

  // WORKSHOPS & LESSONS
  {
    id: "salsa-fundamentals-workshop",
    title: "Salsa Fundamentals 8-Week Workshop",
    description: "Learn basic salsa steps and technique from professional instructors. Great for absolute beginners or refresher course.",
    venue: "Dance Cincinnati Studio",
    venueCity: "Cincinnati",
    eventDate: "Starts June 7, 2026",
    startTime: "7:00 PM",
    genre: "Salsa",
    eventType: "Workshop",
    ageRestriction: "All Ages",
    ticketPrice: "$99 (8 weeks)",
    websiteUrl: "https://www.dancecincy.com",
    instagramHandle: "@dancecincy",
    notes: "Beginner-friendly. Partner not required. Registration opens June 1.",
    featured: false,
    lastUpdated: "2026-06-01",
  },
  {
    id: "bachata-improvisation-workshop",
    title: "Bachata Improvisation & Styling Workshop",
    description: "Advanced workshop focusing on styling, leading/following, and improvisation for dancers with bachata foundation.",
    venue: "Latin Rhythms Studio",
    venueCity: "Cincinnati",
    eventDate: "June 22, 2026",
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    genre: "Bachata",
    eventType: "Workshop",
    ageRestriction: "All Ages",
    ticketPrice: "$35",
    websiteUrl: "https://www.latinrhythms.cincy",
    notes: "Intermediate/Advanced level. Bring a partner or sign up for partner matching.",
    featured: false,
    lastUpdated: "2026-06-01",
  },

  // MONTHLY DJ SERIES
  {
    id: "monthly-merengue-mondays",
    title: "Merengue Mondays",
    description: "First Monday of every month: High-energy merengue nights with DJ spinning classic and contemporary merengue beats.",
    venue: "El Latino Bar & Grill",
    venueCity: "Cincinnati",
    eventDate: "First Monday of each month",
    startTime: "10:00 PM",
    endTime: "2:00 AM",
    genre: "Merengue",
    eventType: "DJ Night",
    ageRestriction: "21+",
    ticketPrice: "Free",
    websiteUrl: "https://www.ellatinobarcinci.com",
    instagramHandle: "@ellatinobarcinci",
    notes: "Live bartender specials. Authentic Latin food available.",
    featured: false,
    lastUpdated: "2026-06-01",
  },
  {
    id: "reggaeton-saturdays",
    title: "Reggaeton Saturdays",
    description: "Weekend reggaeton party series featuring the latest reggaeton hits and trap latino beats. Young, energetic crowd.",
    venue: "The Vault (Over-the-Rhine)",
    venueCity: "Cincinnati",
    eventDate: "Select Saturdays",
    startTime: "10:00 PM",
    endTime: "3:00 AM",
    genre: "Reggaeton",
    eventType: "DJ Night",
    ageRestriction: "21+",
    ticketPrice: "$15-20",
    instagramHandle: "@vaultcinci",
    notes: "Check Instagram for specific dates. Dress code enforced. Popular with college crowd.",
    featured: false,
    lastUpdated: "2026-06-01",
  },
];

export function getFeaturedLatinEvents(): LatinEvent[] {
  return latinEvents.filter((event) => event.featured);
}

export function getUpcomingLatinEvents(days: number = 30): LatinEvent[] {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return latinEvents
    .filter((event) => {
      // Handle recurring events
      if (event.eventDate.includes("Every") || event.eventDate.includes("Thursdays")) {
        return true; // Show recurring events
      }

      try {
        const eventDateObj = new Date(event.eventDate);
        return eventDateObj >= now && eventDateObj <= futureDate;
      } catch {
        return false;
      }
    })
    .sort((a, b) => {
      // Recurring events first, then by date
      if (a.eventDate.includes("Every") || a.eventDate.includes("Thursdays")) return -1;
      if (b.eventDate.includes("Every") || b.eventDate.includes("Thursdays")) return 1;

      return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
    });
}

export function getEventsByGenre(genre: LatinEvent["genre"]): LatinEvent[] {
  return latinEvents.filter((event) => event.genre === genre);
}

export function getEventsByCity(city: LatinEvent["venueCity"]): LatinEvent[] {
  return latinEvents.filter((event) => event.venueCity === city);
}

export function searchLatinEvents(query: string): LatinEvent[] {
  const searchTerm = query.toLowerCase();
  return latinEvents.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.venue.toLowerCase().includes(searchTerm) ||
      event.artist?.toLowerCase().includes(searchTerm) ||
      event.genre.toLowerCase().includes(searchTerm)
    );
  });
}
