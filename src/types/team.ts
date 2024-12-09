export interface Team {
  id: string;
  name: string;
  organizerId: string;
  createdAt: Date;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'promoter';
  joinedAt: Date;
}