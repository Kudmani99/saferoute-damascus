export type RouteStatus = "On time" | "Delayed" | "Completed";

export type School = {
  id: string;
  name: string;
  neighborhood: string;
  coordinates: [number, number];
};

export type RouteStop = {
  id: string;
  student: string;
  grade: string;
  neighborhood: string;
  pickupTime: string;
  address: string;
  coordinates: [number, number];
  pickedUp: boolean;
};

export type TransportRoute = {
  id: string;
  name: string;
  driver: string;
  schoolId: string;
  status: RouteStatus;
  minibus: string;
  estimatedArrival: string;
  checkpoints: number;
  delayMinutes: number;
  distanceKm: number;
  stops: RouteStop[];
  path: [number, number][];
};

export const schools: School[] = [
  {
    id: "damascus-international",
    name: "Damascus International School",
    neighborhood: "Malki",
    coordinates: [33.5187, 36.2768]
  },
  {
    id: "al-bassel",
    name: "Al-Bassel School",
    neighborhood: "Mazzeh",
    coordinates: [33.5058, 36.2499]
  },
  {
    id: "qalam-language",
    name: "Qalam Private Language School",
    neighborhood: "Kafr Sousa",
    coordinates: [33.4938, 36.2862]
  },
  {
    id: "baramkeh-modern",
    name: "Baramkeh Modern School",
    neighborhood: "Baramkeh",
    coordinates: [33.5073, 36.2944]
  }
];

export const neighborhoods = [
  "Mazzeh",
  "Abu Rummaneh",
  "Kafr Sousa",
  "Malki",
  "Baramkeh",
  "Midan",
  "Qudsaya",
  "Jaramana",
  "Dummar"
];

export const routes: TransportRoute[] = [
  {
    id: "route-mazzeh-malki",
    name: "Mazzeh - Malki Morning Loop",
    driver: "Omar Al-Hakim",
    schoolId: "damascus-international",
    status: "On time",
    minibus: "White Hyundai H-1",
    estimatedArrival: "7:42 AM",
    checkpoints: 1,
    delayMinutes: 3,
    distanceKm: 8.4,
    path: [
      [33.5032, 36.2327],
      [33.5067, 36.2479],
      [33.5124, 36.2629],
      [33.5187, 36.2768]
    ],
    stops: [
      {
        id: "s1",
        student: "Lina Darwish",
        grade: "Grade 5",
        neighborhood: "Mazzeh",
        pickupTime: "6:55 AM",
        address: "Mazzeh Villas, near Al-Jalaa",
        coordinates: [33.5032, 36.2327],
        pickedUp: true
      },
      {
        id: "s2",
        student: "Karim Nassar",
        grade: "Grade 4",
        neighborhood: "Mazzeh",
        pickupTime: "7:08 AM",
        address: "Mazzeh Highway service road",
        coordinates: [33.5067, 36.2479],
        pickedUp: true
      },
      {
        id: "s3",
        student: "Maya Haddad",
        grade: "Grade 7",
        neighborhood: "Abu Rummaneh",
        pickupTime: "7:23 AM",
        address: "Near Rawda Square",
        coordinates: [33.5124, 36.2629],
        pickedUp: false
      }
    ]
  },
  {
    id: "route-jaramana-kafr-sousa",
    name: "Jaramana - Kafr Sousa Cross-City",
    driver: "Samir Qabbani",
    schoolId: "qalam-language",
    status: "Delayed",
    minibus: "Blue Kia Bongo",
    estimatedArrival: "7:58 AM",
    checkpoints: 2,
    delayMinutes: 14,
    distanceKm: 12.7,
    path: [
      [33.4868, 36.3469],
      [33.4893, 36.3261],
      [33.4919, 36.3032],
      [33.4938, 36.2862]
    ],
    stops: [
      {
        id: "s4",
        student: "Yazan Barakat",
        grade: "Grade 6",
        neighborhood: "Jaramana",
        pickupTime: "6:42 AM",
        address: "Jaramana main market",
        coordinates: [33.4868, 36.3469],
        pickedUp: true
      },
      {
        id: "s5",
        student: "Nour Mansour",
        grade: "Grade 3",
        neighborhood: "Midan",
        pickupTime: "7:12 AM",
        address: "Midan, near Al-Hassan Mosque",
        coordinates: [33.4919, 36.3032],
        pickedUp: false
      }
    ]
  },
  {
    id: "route-dummar-mazzeh",
    name: "Dummar - Mazzeh School Run",
    driver: "Rami Khalil",
    schoolId: "al-bassel",
    status: "Completed",
    minibus: "Yellow Toyota HiAce",
    estimatedArrival: "7:35 AM",
    checkpoints: 1,
    delayMinutes: 0,
    distanceKm: 9.1,
    path: [
      [33.5325, 36.2198],
      [33.5206, 36.2352],
      [33.5115, 36.2459],
      [33.5058, 36.2499]
    ],
    stops: [
      {
        id: "s6",
        student: "Tala Saad",
        grade: "Grade 8",
        neighborhood: "Dummar",
        pickupTime: "6:50 AM",
        address: "Dummar Island, gate 3",
        coordinates: [33.5325, 36.2198],
        pickedUp: true
      },
      {
        id: "s7",
        student: "Adam Agha",
        grade: "Grade 2",
        neighborhood: "Qudsaya",
        pickupTime: "7:05 AM",
        address: "Qudsaya roundabout",
        coordinates: [33.5206, 36.2352],
        pickedUp: true
      }
    ]
  }
];

export const alerts = [
  {
    title: "Mazzeh highway congestion",
    detail: "Slow traffic near the western entrance. Add 5-8 minutes for morning pickups.",
    severity: "medium"
  },
  {
    title: "Checkpoint near Kafr Sousa",
    detail: "Mock checkpoint delay reported by drivers on the Jaramana cross-city route.",
    severity: "high"
  },
  {
    title: "Baramkeh school zone",
    detail: "Heavy parent drop-off activity around 7:30 AM.",
    severity: "low"
  }
];

export const neighborhoodStats = [
  { name: "Mazzeh", students: 42 },
  { name: "Malki", students: 19 },
  { name: "Kafr Sousa", students: 31 },
  { name: "Midan", students: 24 },
  { name: "Jaramana", students: 28 },
  { name: "Dummar", students: 22 }
];

export const punctualityStats = [
  { day: "Sun", onTime: 91, delayed: 9 },
  { day: "Mon", onTime: 88, delayed: 12 },
  { day: "Tue", onTime: 93, delayed: 7 },
  { day: "Wed", onTime: 86, delayed: 14 },
  { day: "Thu", onTime: 94, delayed: 6 }
];

export const routeCompletionStats = [
  { route: "Mazzeh", completed: 96 },
  { route: "Jaramana", completed: 84 },
  { route: "Dummar", completed: 100 },
  { route: "Midan", completed: 91 }
];

export function findSuggestedRoute(neighborhood: string) {
  const exact = routes.find((route) =>
    route.stops.some((stop) => stop.neighborhood === neighborhood)
  );

  return exact ?? routes[0];
}

export function getSchoolName(id: string) {
  return schools.find((school) => school.id === id)?.name ?? "Partner School";
}
