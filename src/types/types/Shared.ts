// Base audit fields commonly found in most models
export type AuditFields =
  | 'created_by'
  | 'modified_by'
  | 'deleted_by'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at';

// Define a general-purpose type to hold audit information
export type AuditInfo = Partial<Record<AuditFields, number | string | null>>;

// Utility type to exclude audit fields from a model
export type EntityWithoutAuditFields<T> = Omit<T, AuditFields>;

// Utility type to exclude audit fields and ID from a model for input purposes (e.g., CreateInput)
export type EntityInput<T> = Omit<EntityWithoutAuditFields<T>, 'id'>;

// Utility type for update operations that allows partial fields and optionally includes audit fields
export type UpdateEntityInput<T> = Partial<EntityWithoutAuditFields<T>> &
  Partial<Record<AuditFields, number | null>>;

// Utility type for creation with audit fields
export type CreationEntityInput<T> = EntityInput<T> & {
  created_by: number;
  modified_by: number;
};
