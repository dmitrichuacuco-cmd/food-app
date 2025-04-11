import { type AuditInfo } from '@/types/types/Shared';
import { Ref } from 'vue';
import type { Order } from "@/types/interfaces/Order"; 

export interface Beverage {
  id: number;
  title: string;
  price: number;
}

export interface Side {
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
  amount: Ref<number>;
  selected: boolean;
}

export interface SubmissionData {
  order: Order;
  quantity: number;
  selectedBeverage: string;
  sides: Side[];
}

