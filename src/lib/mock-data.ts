export type Role = "User" | "Client" | "Coach" | "Admin" | "Super Admin";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  location: string | null;
  postalCode: string | null;
  dateCreated: string;
  dateAssigned: string | null;
  group: string | null;
  tag: string | null;
}

export const MOCK_USERS: User[] = [
  { id: "1",  firstName: "Maria",  lastName: "Chen",      role: "User", email: "m.chen@email.com",       location: "Toronto, ON",    postalCode: "M4B 1B3", dateCreated: "2024-01-15", dateAssigned: "2024-01-20", group: "Acme Corp",        tag: "active"   },
  { id: "2",  firstName: "Ed",     lastName: "Socrates",  role: "User", email: "m.jones@coaching.com",   location: "Vancouver, BC",   postalCode: "V5K 0A1", dateCreated: "2024-02-03", dateAssigned: "2024-02-07", group: "TechNorth Inc",    tag: "pending"  },
  { id: "3",  firstName: "Sofia",  lastName: "Reyes",     role: "User", email: "s.reyes@email.com",      location: "Calgary, AB",     postalCode: "T2P 1J9", dateCreated: "2024-02-18", dateAssigned: "2024-02-22", group: "BuildRight Group", tag: "active"   },
  { id: "4",  firstName: "Liam",   lastName: "Thompson",  role: "User", email: "l.thompson@email.com",   location: "Ottawa, ON",      postalCode: "K1A 0B1", dateCreated: "2024-03-05", dateAssigned: "2024-03-10", group: "GreenPath Ltd",    tag: "inactive" },
  { id: "5",  firstName: "Amara",  lastName: "Diallo",    role: "User", email: "a.diallo@email.com",     location: "Montreal, QC",    postalCode: "H3A 1A1", dateCreated: "2024-03-22", dateAssigned: "2024-03-25", group: "Horizon Works",    tag: "active"   },
  { id: "6",  firstName: "Noah",   lastName: "Park",      role: "User", email: "n.park@email.com",       location: "Edmonton, AB",    postalCode: "T5J 0N3", dateCreated: "2024-04-01", dateAssigned: "2024-04-05", group: "Acme Corp",        tag: "pending"  },
  { id: "7",  firstName: "Priya",  lastName: "Sharma",    role: "User", email: "p.sharma@email.com",     location: "Winnipeg, MB",    postalCode: "R3C 0V8", dateCreated: "2024-04-14", dateAssigned: "2024-04-18", group: "TechNorth Inc",    tag: "active"   },
  { id: "8",  firstName: "Ethan",  lastName: "Bouchard",  role: "User", email: "e.bouchard@email.com",   location: "Halifax, NS",     postalCode: "B3J 2N9", dateCreated: "2024-05-02", dateAssigned: "2024-05-06", group: "GreenPath Ltd",    tag: "active"   },
  { id: "9",  firstName: "Isla",   lastName: "MacKenzie", role: "User", email: "i.mackenzie@email.com",  location: "Victoria, BC",    postalCode: "V8W 1P6", dateCreated: "2024-05-19", dateAssigned: "2024-05-23", group: "BuildRight Group", tag: "inactive" },
  { id: "10", firstName: "Daniel", lastName: "Nwosu",     role: "User", email: "d.nwosu@email.com",      location: "Mississauga, ON", postalCode: "L5B 1M2", dateCreated: "2024-06-07", dateAssigned: "2024-06-11", group: "Horizon Works",    tag: "pending"  },
];

export const MOCK_COACHES: { id: string; name: string; assignedUsers: number; totalApplies: number; avgApplies: number }[] = [
  { id: "c1", name: "J. Harris", assignedUsers: 4, totalApplies: 0, avgApplies: 0 },
  { id: "c2", name: "M. Jones",  assignedUsers: 1, totalApplies: 0, avgApplies: 0 },
  { id: "c3", name: "L. Brown",  assignedUsers: 3, totalApplies: 0, avgApplies: 0 },
  { id: "c4", name: "S. Patel",  assignedUsers: 2, totalApplies: 0, avgApplies: 0 },
];
