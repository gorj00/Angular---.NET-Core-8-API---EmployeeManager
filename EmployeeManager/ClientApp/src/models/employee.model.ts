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
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
  gender: number;
  addressCreateDTO: AddressCreateDto;
  email: string;
  phoneNumber: string;
  superiorId?: number;
  salary: number;
  jobCategoryId: number;
}

export interface AddressCreateDto {
  street: string;
  zipCode: string;
  cityId: number;
  countryId: number;
}

