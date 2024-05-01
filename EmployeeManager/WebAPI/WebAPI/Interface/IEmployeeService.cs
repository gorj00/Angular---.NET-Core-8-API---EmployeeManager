using WebAPI.Dto;
using WebAPI.Model;

namespace WebAPI.Interface
{
    public interface IEmployeeService
    {
        Employee mapCreateDto(EmployeeCreateDTO employeeDTO, Country verifiedCountry, City verifiedCity, Employee verifiedSuperior, JobCategory verifiedJobCategory);
        Salary mapToSalary(decimal Amount, Employee employee);
        JobCategory_Employee mapToJobCategory_Employee(JobCategory verifiedJobCategory, Employee employee);
        EmployeeViewDTO mapToViewDTO(Employee employee, JobCategory_Employee jobCategory_Employee, List<Salary> salaries, List<Employee> subordinates, City city);
    }
}
