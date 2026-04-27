export interface AdminStats {
  users: number;
  organizations: number;
  projects: number;
  tickets: number;
  features: number;
  posts: number;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  joinedAt: string;
  updatedAt: string;
  profile: {
    name: string;
    username: string;
  } | null;
}

export interface AdminOrganization {
  id: string;
  name: string;
  urlid: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  owner: {
    profile: {
      username: string;
    };
  };
  _count: {
    members: number;
    project: number;
    post: number;
  };
}

export interface AdminProject {
  id: string;
  urlid: string | null;
  title: string;
  summary: string;
  status: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  owner: {
    profile: {
      username: string;
    };
  };
  organization: {
    name: string | null;
    urlid: string | null;
  } | null;
  _count: {
    ticket: number;
    members: number;
  };
}

export interface AdminTicket {
  id: string;
  title: string;
  ticketStatus: string;
  ticketPriority: string;
  ticketType: string | null;
  position: number;
  createdAt: string;
  dueAt: string | null;
  project: {
    title: string;
    urlid: string;
  };
  feature: {
    title: string;
  } | null;
  creator: {
    profile: {
      username: string;
    };
  };
  _count: {
    ticketComment: number;
  };
}

export interface AdminFeature {
  id: string;
  title: string;
  description: string;
  featureType: string;
  isPublic: boolean;
  project: {
    title: string;
    urlid: string;
  };
  owner: {
    profile: {
      username: string;
    };
  };
  _count: {
    ticket: number;
  };
}

export interface AdminPost {
  id: string;
  title: string;
  published: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    profile: {
      username: string;
    };
  };
  organization: {
    name: string | null;
    urlid: string | null;
  } | null;
  _count: {
    postComment: number;
  };
}
