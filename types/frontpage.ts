export interface Welcome {
  sys?: WelcomeSys;
  total?: number;
  skip?: number;
  limit?: number;
  items?: Item[];
  includes?: Includes;
}

export interface Includes {
  Entry?: Entry[];
  Asset?: Asset[];
}

export interface Asset {
  metadata?: Metadata;
  sys?: AssetSys;
  fields?: AssetFields;
}

export interface AssetFields {
  title?: string;
  description?: string;
  file?: File;
}

export interface File {
  url?: string;
  details?: Details;
  fileName?: string;
  contentType?: string;
}

export interface Details {
  size?: number;
  image?: Image;
}

export interface Image {
  width?: number;
  height?: number;
}

export interface Metadata {
  tags?: ContentType[];
  concepts?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ContentType {
  sys?: ContentTypeSys;
}

export interface ContentTypeSys {
  id?: string;
  type?: Type;
  linkType?: string;
}

export enum Type {
  Link = 'Link',
}

export interface AssetSys {
  space?: ContentType;
  id?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  environment?: ContentType;
  publishedVersion?: number;
  revision?: number;
  locale?: string;
  contentType?: ContentType;
}

export interface Entry {
  metadata?: Metadata;
  sys?: AssetSys;
  fields?: EntryFields;
}

export interface EntryFields {
  image?: ContentType;
  title?: string;
  shortText?: string;
  sellingspoints?: string[];
  heading?: string;
  tier1?: Tier;
  tier2?: Tier;
  tier3?: Tier;
}

export interface Tier {
  price?: number;
  title?: string;
  included?: string[];
  description?: string;
}

export interface Item {
  metadata?: Metadata;
  sys?: AssetSys;
  fields?: ItemFields;
}

export interface ItemFields {
  contentType?: string;
  siteContent?: ContentType[];
}

export interface WelcomeSys {
  type?: string;
}
