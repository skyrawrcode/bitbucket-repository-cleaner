export interface Response {
  size?:          number;
  limit?:         number;
  isLastPage?:    boolean;
  values:        Value[];
  start?:         number;
  nextPageStart?: number;
}

export interface Value {
  slug?:          string;
  id?:            number;
  name?:          string;
  scmId?:         string;
  state?:         string;
  statusMessage?: string;
  forkable?:      boolean;
  project?:       Project;
  public?:        boolean;
  links?:         ValueLinks;
}

export interface ValueLinks {
  clone?: Clone[];
  self?:  Self[];
}

export interface Clone {
  href?: string;
  name?: string;
}

export interface Self {
  href?: string;
}

export interface Project {
  key?:    string;
  id?:     number;
  name?:   string;
  public?: boolean;
  type?:   string;
  links?:  ProjectLinks;
  owner?:  Owner;
}

export interface ProjectLinks {
  self?: Self[];
}

export interface Owner {
  name?:         string;
  emailAddress?: string;
  id?:           number;
  displayName?:  string;
  active?:       boolean;
  slug?:         string;
  type?:         string;
  links?:        ProjectLinks;
}
