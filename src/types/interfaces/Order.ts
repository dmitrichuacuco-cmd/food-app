import { type AuditInfo } from '@/types/types/Shared';

export interface BaseOrder {
  image: string;
  title: string;
  content: string;
  category: string;
  price: number;
  rating: number;
}

export interface Order extends BaseOrder, AuditInfo {
  id: number;
}
