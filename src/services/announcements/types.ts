export interface Announcement {
  id: string;
  message: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnnouncementInput {
  message: string;
  active?: boolean;
}

export interface UpdateAnnouncementInput {
  message?: string;
  active?: boolean;
}