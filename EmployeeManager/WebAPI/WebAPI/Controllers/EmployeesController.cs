using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Dto;
using WebAPI.Interface;
using WebAPI.Model;
using WebAPI.Service;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly WebAPIContext _context;
        private readonly IEmployeeService _employeeService;
        private readonly IUnitOfWork _unitOfWork;


        public EmployeesController(WebAPIContext context, IEmployeeService employeeService, IUnitOfWork unitOfWork)
        {
            _context = context;
            _employeeService = employeeService;
            _unitOfWork = unitOfWork;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeViewDTO>>> GetEmployee()
        {
            List<Employee> employees =  await _unitOfWork.employees.GetAll(null, null, new List<string> { "Address", "Superior", "Country" });
            List<EmployeeViewDTO> employeeViews = new List<EmployeeViewDTO>();

            foreach (Employee employee in employees)
            {
                var city = await _unitOfWork.cities.Get(q => q.Id == employee.Address.CityId);
                var jobCategory_Employee = await _unitOfWork.jobCategoriesEmployees.Get(q => q.EmployeeId == employee.Id, new List<string> { "JobCategory" });
                var salaries = await _unitOfWork.salaries.GetAll(q => q.EmployeeId == employee.Id);
                var subordinates = await _unitOfWork.employees.GetAll(q => q.SuperiorId == employee.Id);

                EmployeeViewDTO employeeViewDTO = _employeeService.mapToViewDTO(employee, jobCategory_Employee, salaries, subordinates, city);

                employeeViews.Add(employeeViewDTO);

            }
            return employeeViews;

        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<IActionResult> CreateHotel([FromBody] EmployeeCreateDTO employeeDTO)
        {
            AddressCreateDTO addressCreateDTO = employeeDTO.AddressCreateDTO;

            var verifiedCountry = await _unitOfWork.countries.Get(q => q.Id == addressCreateDTO.CountryId);
            var verifiedCity = await _unitOfWork.cities.Get(q => q.Id == addressCreateDTO.CityId);
            var verifiedSuperior = await _unitOfWork.employees.Get(q => q.Id == employeeDTO.SuperiorId);
            var verifiedJobCategory = await _unitOfWork.jobCategories.Get(q => q.Id == employeeDTO.JobCategoryId);

            Employee employee = _employeeService.mapCreateDto(employeeDTO, verifiedCountry, verifiedCity, verifiedSuperior, verifiedJobCategory);
            Salary salary = _employeeService.mapToSalary(employeeDTO.Salary, employee);
            JobCategory_Employee jobCategory_Employee = _employeeService.mapToJobCategory_Employee(verifiedJobCategory, employee);

            await _unitOfWork.employees.Insert(employee);
            await _unitOfWork.salaries.Insert(salary);
            await _unitOfWork.jobCategoriesEmployees.Insert(jobCategory_Employee);
            
            if (verifiedSuperior != null) {
                employee.Superior = verifiedSuperior;
            }
            await _unitOfWork.Save();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _unitOfWork.employees.Get(q => q.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            var salaries = await _unitOfWork.salaries.GetAll(q => q.EmployeeId == employee.Id);
            var jobCategoriesEmployees = await _unitOfWork.jobCategoriesEmployees.GetAll(q => q.EmployeeId == employee.Id);
            _unitOfWork.salaries.DeleteRange(salaries);
            _unitOfWork.jobCategoriesEmployees.DeleteRange(jobCategoriesEmployees);
            await _unitOfWork.addresses.Delete(employee.AddressId);

            var subordinates = await _unitOfWork.employees.GetAll(q => q.SuperiorId == employee.Id);

            // If stated as superior in other employees, nullify this reference
            foreach (var sub in subordinates)
            {
                sub.SuperiorId = null;
                _unitOfWork.employees.Update(sub);
            }

            await _unitOfWork.employees.Delete(employee.Id);

            await _unitOfWork.Save();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.Id == id);
        }
    }
}
