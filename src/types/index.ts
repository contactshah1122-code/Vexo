export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption?: string;
  width: number;
  height: number;
  aspectRatio: string;
  camera?: string;
  lens?: string;
  iso?: number;
  aperture?: string;
  shutterSpeed?: string;
  focalLength?: string;
}

export interface PhotoAlbum {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  tags: string[];
  photographer: string;
  modelNames: string[];
  photosCount: number;
  photos: PhotoItem[];
  views: number;
  likes: number;
  isFeatured: boolean;
  isTrending: boolean;
  publishedAt: string;
  verifiedAdult18Plus: boolean;
  modelReleaseId: string;
  resolution: '4K' | 'Ultra HD' | 'High Res';
  orientation: 'portrait' | 'landscape' | 'mixed';
}

export interface VideoEntry {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // playable sample or embed
  externalUrl?: string; // Safe external source attribution
  duration: string; // e.g. "14:28"
  durationSeconds: number;
  category: string;
  tags: string[];
  director: string;
  cinematographer?: string;
  cast: string[];
  views: number;
  likes: number;
  rating: number; // e.g. 4.9
  isFeatured: boolean;
  isTrending: boolean;
  publishedAt: string;
  verifiedAdult18Plus: boolean;
  license: string;
  resolution: '4K' | '1080p' | 'Cinema 2K';
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  albumsCount: number;
  videosCount: number;
  accentColor?: string;
}

export interface UserReport {
  id: string;
  targetType: 'album' | 'video' | 'general';
  targetId: string;
  targetTitle: string;
  reason: 'copyright' | 'non_consensual' | 'underage_concern' | 'inaccurate_metadata' | 'broken_media' | 'other';
  description: string;
  reporterEmail: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
}

export interface TakedownRequest {
  id: string;
  fullName: string;
  email: string;
  claimantRole: 'copyright_owner' | 'authorized_agent' | 'model_depicted';
  mediaUrlOrId: string;
  justification: string;
  swornStatementAccepted: boolean;
  ticketReference: string;
  createdAt: string;
  status: 'submitted' | 'under_review' | 'action_taken' | 'rejected';
}

export interface CommentItem {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
}
