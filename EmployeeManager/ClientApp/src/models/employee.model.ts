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

