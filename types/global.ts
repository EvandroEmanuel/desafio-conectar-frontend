import { ROLES_OBJECT } from "@/config";


const { ADMIN, USER } = ROLES_OBJECT;

export const CNH_CATEGORIES = ["A", "B", "C", "D", "E"] as const;
export const CNH_SITUATIONS = [
  { value: "REGULAR", label: "Válido" },
  { value: "VENCIDA", label: "Expirado" },
  { value: "SUSPENSA", label: "Suspenso" },
  { value: "CASSADA", label: "Revogado" },
  { value: "PROVISORIA", label: "Provisório" },
  { value: "APREENDIDA", label: "Apreendido" },
  { value: "BLOQUEADA", label: "Bloqueado" },
  { value: "CANCELADA", label: "Cancelado" },
] as const;
export const CNH_SITUATION_VALUES = CNH_SITUATIONS.map((s) => s.value) as [
  "REGULAR",
  "VENCIDA",
  "SUSPENSA",
  "CASSADA",
  "PROVISORIA",
  "APREENDIDA",
  "BLOQUEADA",
  "CANCELADA"
];

export type CnhCategory = (typeof CNH_CATEGORIES)[number];
export type CnhSituation = (typeof CNH_SITUATION_VALUES)[number];

export interface StorageData {
  name: string;
  sub: string;
  hash: string;
  expiresAt: number;
  user: {
    sub: string;
    name: string;
  };
}

export type ErrorBody = {
  code?: string | number;
  message?: string;
  status?: number;
};

export type ApiResponseLogin = {
  token: string;
  expiresIn: number;
};

export type TokenData = {
  sub: string;
  name: string;
};

export type UserProfile = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  roles: Array<typeof ADMIN | typeof USER>;
};

export type PaginationBase = {
  success: boolean;
  count: number;
  next: string | null;
  previous: string | null;
};

export type AuditInfo = {
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
};

export interface GetUsers extends PaginationBase {
  data: Array<UserProfile>;
}

export interface GetSecretaries extends PaginationBase {
  data: Array<Secretary>;
}

export interface GetVehicles extends PaginationBase {
  data: Array<Vehicle>;
}

export interface GetVehicleTypes extends PaginationBase {
  data: Array<VehicleType>;
}

export interface GetMotorists extends PaginationBase {
  data: Array<Motorist>;
}

export interface GetPosts extends PaginationBase {
  data: Array<Post>;
}

export interface GetGasStationAttendant extends PaginationBase {
  data: Array<GasStationAttendant>;
}

export interface GetSupply extends PaginationBase {
  data: Array<Supply>;
}

export interface GetPendingOrder extends PaginationBase {
  data: Array<PendingOrder>;
}

export interface GetSuppliers extends PaginationBase {
  data: Array<Supplier>;
}

export interface GetPaymentMethods extends PaginationBase {
  data: Array<PaymentMethod>;
}

export interface GetAccountsPayable extends PaginationBase {
  data: Array<AccountsPayable>;
}

export interface GetClients extends PaginationBase {
  data: Array<Client>;
}

export interface GetMaintenances extends PaginationBase {
  data: Array<Maintenance>;
}

export interface Secretary extends AuditInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  responsible: string;
  cep: string;
  uf: string;
  address: string;
  city: string;
  users: Array<{
    id: string;
    username: string;
  }>;
  motorists: Array<{
    id: string;
    name: string;
    phone: string;
    chn: string;
  }>;
}

export interface SecretaryDto {
  name: string;
  email: string;
  phone: string;
  responsible: string;
  cep: string;
  address: string;
  uf: string;
  city: string;
}

export interface Client {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  city: string;
  uf: string;
  secretary: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Vehicle extends AuditInfo {
  id: string;
  vehicle: string;
  vehicleType: {
    id: string;
    name: string;
  };
  place: string;
  km: string;
  renavam: string;
  chassis: string;
  color: string;
  year: string;
  insurance: string;
  ipva: string;
  mandatory_insurance: string;
  licensing: string;
  documentation_expiration: string;
  cap: string;
  pat: string;
  cil: string;
}

export interface Supplier extends AuditInfo {
  id: string;
  address: string;
  name: string;
  is_active: boolean;
  email: string;
  phone: string;
  fantasy: string;
  cnpj: string;
  responsible: string;
  cep: string;
  city: string;
  uf: string;
}

export interface VehicleType extends AuditInfo {
  id: string;
  name: string;
}

export interface Motorist extends AuditInfo {
  id: string;
  name: string;
  cpf: string;
  cnh: string;
  phone: string;
  cep: string;
  address: string;
  district: string;
  city: string;
  uf: string;
  identity: string;
  cnh_category: string;
  cnh_expiration: string;
  cnh_situation: CnhSituation;
  secretary: {
    id: string;
    name: string;
  };
}

export interface PaymentMethod extends AuditInfo {
  id: string;
  name: string;
  description: string;
}

export interface ReceivingMethod extends AuditInfo {
  id: string;
  name: string;
  description: string;
}

export interface AccountsPayable extends AuditInfo {
  id: string;
  name: string;
  value: number;
  type: string;
  discount_value: number;
  addition_value: number;
  due_date: string;
  payment_date: string;
  observations: string;
  status: "PENDING" | "PAYED" | "CANCELLED";
  payment_method: {
    id: string;
    name: string;
  };
  supplier: {
    id: string;
    name: string;
    fantasy: string;
  };
}

export interface AccountsReceivable extends AuditInfo {
  id: string;
  name: string;
  value: number;
  type: string;
  discount_value: number;
  additional_value: number;
  due_date: string;
  payment_date: string;
  observations: string;
  status: "PENDING" | "RECEIVED" | "CANCELLED";
  payment_methods: {
    id: string;
    name: string;
  };
  client: {
    id: string;
    name: string;
    document: string;
  };
}

export interface UserDto {
  id?: string;
  username: string;
  password?: string;
  passwordHash?: string;
  socialName: string;
  cpf: string;
  email: string;
  birthDate: string;
  cep: string;
  address: string;
  secretaryId: string;
  is_active?: boolean;
  roles?: string;
}

export interface VehicleDto {
  vehicle: string;
  vehicleTypeId: string;
  place: string;
  km: string;
  renavam: string;
  chassis: string;
  color: string;
  year: string;
  insurance: string;
  ipva: string;
  mandatory_insurance: string;
  licensing: string;
  documentation_expiration: string;
  cap: string;
  pat: string;
  cil: string;
  is_active: boolean;
}

export interface PostDto {
  name: string;
  fantasy: string;
  email: string;
  phone: string;
  cep: string;
  cnpj: string;
  city: string;
  address: string;
  regular_gasoline: number;
  uf: string;
  ethanol: number;
  added_gasoline: number;
  diesel_s10: number;
  regular_diesel: number;
}

export interface GasStationAttendantDto {
  name: string;
  email: string;
  phone: string;
  postId: string;
}

export interface SupplyDto {
  post: string;
  vehicle: string;
  motorist: string;
  supply_date: string;
  supply_type:
    | "GASOLINE"
    | "GASOLINE_ADDITIVE"
    | "ETHANOL"
    | "DIESEL"
    | "DIESEL_S10"
    | "ALCOHOL"
    | "GAS";
  complete_tank: boolean;
  description: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "ACCOMPLISHED" | "CANCELED";
}

export interface PendingOrderDto {
  service_order: string;
  vehicle: string;
  description: string;
  suppliers: string;
}

export interface MaintenanceDto {
  mechanic_name: string;
  maintenance_type:
    | "PREVENTIVE"
    | "CORRECTIVE"
    | "OIL_CHANGE"
    | "BRAKE_SERVICE"
    | "ENGINE_SERVICE"
    | "TRANSMISSION_SERVICE"
    | "SUSPENSION_SERVICE"
    | "ELECTRICAL_SERVICE"
    | "TIRE_SERVICE"
    | "GENERAL_INSPECTION";
  description: string;
  date: string;
  mileage: number;
  next_maintenance_date: string;
  next_maintenance_mileage: number;
  labor_cost: number;
  parts_cost: number;
  vehicle: string;
  payment_method: string;
  supplier: string;
}

export interface VehicleTypeDto {
  name: string;
}

export interface SecretaryDto {
  name: string;
  email: string;
  phone: string;
  responsible: string;
  cep: string;
  address: string;
  uf: string;
  city: string;
}

export interface MotoristDto {
  name: string;
  cpf: string;
  cnh: string;
  phone: string;
  cep: string;
  address: string;
  district: string;
  city: string;
  uf: string;
  identity: string;
  cnh_category: CnhCategory[];
  cnh_expiration: string;
  cnh_situation: CnhSituation;
  secretaryId: string;
}

export interface SupplierDto {
  name: string;
  fantasy: string;
  cnpj: string;
  responsible: string;
  phone: string;
  email: string;
  cep: string;
  address: string;
  city: string;
  uf: string;
  is_active: boolean;
}

export interface AccountsReceivableDto {
  name: string;
  value: number;
  type: string;
  discount_value: number;
  additional_value: number;
  due_date: string;
  status: "PENDING" | "RECEIVED" | "CANCELLED";
  payment_method_id: string;
  client_id: string;
  payment_date?: string;
  observations?: string;
}

export interface AccountsPayableDto {
  name: string;
  value: number;
  type: string;
  status: "PENDING" | "PAYED" | "CANCELLED";
  discount_value: number;
  addition_value: number;
  due_date: string;
  payment_method_id: string;
  supplier_id: string;
  payment_date?: string;
  observations?: string;
}

export interface ClientDto {
  name: string;
  document: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  city: string;
  uf: string;
  secretaryId?: string;
}

export interface PaymentMethodDto {
  name: string;
  description: string;
  is_active: boolean;
}

export interface ReceivingMethodDto {
  name: string;
  description: string;
  is_active: boolean;
}

export interface Filters {
  search?: string;
  is_active?: boolean;
  startDate?: string;
  finishDate?: string;
  page?: number;
  limit?: number;
}

export interface Post extends AuditInfo {
  id: string;
  name: string;
  fantasy: string;
  email: string;
  phone: string;
  cep: string;
  cnpj: string;
  city: string;
  address: string;
  regular_gasoline: number;
  uf: string;
  ethanol: number;
  added_gasoline: number;
  diesel_s10: number;
  regular_diesel: number;
  attendants: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}

export interface GasStationAttendant extends AuditInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  post: {
    id: string;
    name: string;
    fantasy: string;
  };
}

export interface Supply extends AuditInfo {
  id: string;
  code: string;
  supply_date: string;
  supply_type:
    | "GASOLINE"
    | "GASOLINE_ADDITIVE"
    | "ETHANOL"
    | "DIESEL"
    | "DIESEL_S10"
    | "ALCOHOL"
    | "GAS";
  complete_tank: boolean;
  description: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "ACCOMPLISHED" | "CANCELED";
  post: {
    id: string;
    name: string;
    fantasy: string;
  };
  vehicle: {
    id: string;
    vehicle: string;
    place: string;
  };
  motorist: {
    id: string;
    name: string;
    cnh: string;
  };
}

export interface PendingOrder extends AuditInfo {
  id: string;
  service_order: string;
  description: string;
  vehicle: {
    id: string;
    vehicle: string;
    place: string;
  };
  suppliers: [
    {
      id: string;
      name: string;
      fantasy: string;
    }
  ];
}

export interface Maintenance extends AuditInfo {
  id: string;
  mechanic_name: string;
  maintenance_type:
    | "PREVENTIVE"
    | "CORRECTIVE"
    | "OIL_CHANGE"
    | "BRAKE_SERVICE"
    | "ENGINE_SERVICE"
    | "TRANSMISSION_SERVICE"
    | "SUSPENSION_SERVICE"
    | "ELECTRICAL_SERVICE"
    | "TIRE_SERVICE"
    | "GENERAL_INSPECTION";
  description: string;
  date: string;
  mileage: number;
  next_maintenance_date: string;
  next_maintenance_mileage: number;
  labor_cost: number;
  parts_cost: number;
  vehicle: {
    id: string;
    vehicle: string;
    place: string;
  };
  payment_methods: {
    id: string;
    name: string;
  };
  supplier: {
    id: string;
    name: string;
    fantasy: string;
  };
}
