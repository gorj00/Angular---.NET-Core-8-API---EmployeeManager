export type INewEmployeeForm = Partial<{
    identity: Partial<{
        genderId: number | null;
        firstName: string | null;
        middleName?: string | null;
        lastName: string | null;
        birthDate: Date | null;
        email: string | null;
        phone: string | null;
    }>;
    address: Partial<{
        street: string | null;
        zipCode: string | null;
        city: { id: number; name: string; } | null;
        countryId: number | null;
    }>;
    corporate: Partial<{
        salary: number | null;
        superiorId?: number | null;
        jobCategoryId: number | null;
    }>;
}> | null;

export interface IEmployeeCreateRequest {
  firstName: string | null | undefined;
  middleName?: string | null | undefined;
  lastName: string | null | undefined;
  birthDate: string | null | undefined;
  gender: number | null | undefined;
  addressCreateDTO: IAddressCreateDto;
  email: string | null | undefined;
  phoneNumber: string | null | undefined;
  superiorId?: number | null | undefined;
  salary: number | null | undefined;
  jobCategoryId: number | null | undefined;
}

export interface IAddressCreateDto {
  street: string | null | undefined;
  zipCode: string| null | undefined;
  cityId: number | undefined;
  countryId: number | null | undefined;
}

export interface IEmployeeResponse {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  gender: number;
  address: Address;
  addressId: number;
  country: Country;
  countryId: number;
  email: string;
  phoneNumber: string;
  joinedDate: string;
  exitedDay: string;
  superior: string;
  superiorId: number;
}
interface Address {
  id: number;
  street: string;
  zipCode: string;
  city: City;
  cityId: number;
  country: Country;
  countryId: number;
  isActive: boolean;
}
interface City {
  id: number;
  name: string;
  country: Country;
  countryId: number;
}
interface Country {
  id: number;
  name: string;
}

