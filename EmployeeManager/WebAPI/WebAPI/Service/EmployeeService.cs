using WebAPI.Dto;
using WebAPI.Interface;
using WebAPI.Model;

namespace WebAPI.Service
{
    // TODO: refactor with automapper
    public class EmployeeService : IEmployeeService
    {
        public EmployeeService() {}

        public Employee mapCreateDto(
            EmployeeCreateDTO employeeDTO, Country verifiedCountry, City verifiedCity, Employee verifiedSuperior, JobCategory verifiedJobCategory)
        {
            AddressCreateDTO addressCreateDTO = employeeDTO.AddressCreateDTO;

            if (verifiedCountry == null || verifiedCity == null || verifiedJobCategory == null || (employeeDTO.SuperiorId != null && verifiedSuperior == null))
            {
                throw new ArgumentException("Some IDs from the request body refer to objects not present in the database.");
            }

            Address address = new Address()
            {
                CityId = verifiedCity.Id,
                CountryId = verifiedCountry.Id,
                Street = addressCreateDTO.Street,
                ZipCode = addressCreateDTO.ZipCode,
                IsActive = true
            };

            Employee employee = new Employee()
            {
                BirthDate = employeeDTO.BirthDate,
                Email = employeeDTO.Email,
                FirstName = employeeDTO.FirstName,
                MiddleName = employeeDTO.MiddleName,
                LastName = employeeDTO.LastName,
                Gender = employeeDTO.Gender,
                JoinedDate = DateTime.UtcNow,
                PhoneNumber = employeeDTO.PhoneNumber,
                Address = address,
                AddressId = address.Id,
                CountryId = verifiedCountry.Id,
                SuperiorId = null
            };

            return employee;
        }

        public Salary mapToSalary(decimal Amount, Employee employee)
        {
            return new Salary()
            {
                Amount = Amount,
                Employee = employee,
                From = DateTime.UtcNow
            };
        }

        public JobCategory_Employee mapToJobCategory_Employee(JobCategory verifiedJobCategory, Employee employee)
        {
            return new JobCategory_Employee()
            {
                JobCategoryId = verifiedJobCategory.Id,
                Employee = employee,
            };
        }

        public EmployeeViewDTO mapToViewDTO(Employee employee, JobCategory_Employee jobCategory_Employee, 
            List<Salary> salaries, List<Employee> subordinates, City city)
        {
            employee.Address.City = city;

            return new EmployeeViewDTO()
            {
                FirstName = employee.FirstName,
                MiddleName = employee.MiddleName,
                LastName = employee.LastName,
                Address = employee.Address,
                AddressId = employee.AddressId,
                Gender = employee.Gender,
                BirthDate = employee.BirthDate,
                Country = employee.Country,
                CountryId = employee.CountryId,
                Email = employee.Email,
                JoinedDate = employee.JoinedDate,
                ExitedDay = employee.ExitedDay,
                PhoneNumber = employee.PhoneNumber,
                Superior = employee.Superior,
                SuperiorId = employee.SuperiorId,
                Id = employee.Id,
                JobCategory = jobCategory_Employee.JobCategory,
                JobCategoryId = jobCategory_Employee.JobCategoryId,
                Salaries = salaries,
                Subordinates = subordinates
            };
        }

    }
}
