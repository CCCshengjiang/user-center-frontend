export type TagType = {
  key: string;
  label: string;
};

export type GeographicItemType = {
  name: string;
  id: string;
};

export type GeographicType = {
  province: GeographicItemType;
  city: GeographicItemType;
};

export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export type CurrentUser = {
  id: number;
  username: string;
  avatarUrl?: string;
  gender: number;
  userAccount: string;
  phone: string;
  email: string;
  userStatus: number;
  userRole: number;
  idCode: string;
};
