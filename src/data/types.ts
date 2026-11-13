/** Image keys are upload paths relative to wp-content/uploads, e.g. "2024/08/dharma-.png". */
export type ImageKey = string;

export interface Link { label: string; href: string }

export interface Section {
  id?: string;
  kicker?: string;
  title: string;
  body?: string[];
  list?: string[];
  ordered?: boolean;
  quote?: string;
  image?: ImageKey;
  links?: Link[];
}

export interface Practice { title: string; text?: string; image?: ImageKey; href?: string }

export interface Programme {
  slug: string;
  title: string;
  short: string;          // one-line index description
  kicker: string;
  lead: string;
  icon: ImageKey;         // 1080x1080 transparent PNG
  tint: string;           // CSS colour for the icon tile
  peek: ImageKey;         // photo used for the hover peek
  intro: string[];
  sections: Section[];
  practices?: { title: string; items: Practice[] };
  timetable?: { title: string; rows: { when: string; what: string }[]; note?: string };
  books?: { lang: string; title: string; cover: ImageKey; read: string; download: string; readLabel: string; downloadLabel: string }[];
  more?: Link[];
}

export interface Testimonial { title: string; name: string; role: string; text: string; portrait: ImageKey }
export interface Saying { title: string; text: string }

export interface Branch {
  id: string;
  country: string;
  cities?: string;
  phone?: string;
  email?: string;
  address?: string;
  contact?: string;
  banner?: ImageKey;      // illustrated country-map banner when the foundation has one
  extra?: ImageKey[];     // teacher / schedule posters from the branch page
  note?: string;
}

export interface EventItem {
  id: string;
  title: string;
  kicker: string;
  date: string;
  time?: string;          // omitted when unknown
  place: string;
  duration?: string;
  text: string;
  themes?: string[];
  image?: ImageKey;
  crop?: 'watermark';     // crop the phone watermark off the bottom
  fit?: 'contain';        // posters with text: show whole, on a tinted mat
  href?: string;
}

export interface VolunteerRole { title: string; tags: string; text: string[]; images: ImageKey[] }

export interface Commitment { title: string; text: string[]; image: ImageKey }

export interface Content {
  programmes: Programme[];
  testimonials: Testimonial[];
  sayings: Saying[];
  branches: Branch[];
  events: EventItem[];
  alsoEvents: EventItem[];
  pastEvents: EventItem[];
  volunteerRoles: VolunteerRole[];
  commitments: Commitment[];
  qualities: string[];
  path: { title: string; text: string; image: ImageKey }[];
  teachers: { name: string; photo: ImageKey; bio: string[] }[];
  stats: { value: string; label: string }[];
  schedule: { time: string; what: string }[];
  retreatPractices: string[];
  retreatRules: { title: string; text: string }[];
  precepts: { five: string[]; three: string[]; note: string };
  community: { title: string; image: ImageKey; text: string[]; links: Link[] }[];
  onlineClasses: { title: string; image: ImageKey; goal: string; content: string[]; times: string[] }[];
  connections: { place: string; cities?: string }[];
  wisdomCollections: { title: string; image: ImageKey }[];
}
