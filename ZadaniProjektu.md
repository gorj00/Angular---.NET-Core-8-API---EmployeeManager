# Zadání
Cílem je vytvořit jednoduchou aplikaci pro evidenci a správu zaměstnanců.

## Architektura
Řešení se bude skládát z 2 částí, front-end a back-end.

### Doménové modely
Gender (enum)
	Male
	Female
	Unspecified

Address (class)
	Id (int)
	Street (string)
	ZipCode (string)
	CityId (int) - asociace do entity City
	CountryId (int) - asociace do entity Country 
	
City (class)
	Id (int)
	Name (string)
	CountryId (int) - asociace do entity Country

Country (class)
	Id (int)
	Name (string)

JobCategory (class)
	Id (int)
	Title (string)
	
Salary (class)
	Id (int)
	Amount (decimal)
	From (Date)
	To (Date - nullable) - pokud je null, znamená aktuální plat

Employee (class):
- Id (int)
- FirstName (string)
-	MiddleName (string)
-	LastName (string)
-	BirthDate (date)
-	Gender (Gender)
-	AddressId (int) - asociace do entity Address
-	CountryId (int) - asociace do entity Country
-	JobCategories (List<int>) - asociace do entity JobCategory, vazba 1xN (v modelu, ne nutně v DB)
-	Email (string)
-	PhoneNumber (string)
-	JoinedDate (date)
-	ExitedDate (date)
-	SalaryIds (List<decimal>) - asociace do entity Salary
-	SuperiorId (int) - asociace do entity Employee
-	SubordinateIds (List<int>) - asociace do entity Employee, vazba 1xN (v modelu, ne nutně v DB)


### Front-end (EmployeeManager.ClientApp):
- Aplikace umožňuje:
	= Zobrazení přehled zaměstnanců
	= Zobrazení detailu konkrétního zaměstnance
	= Editace zaměstnance
	= Smazání zaměstnance
- Aplikace neukládá data lokálně, ale komunikuje s back-endem prostřednictvím REST API
- Aplikaci realizovat jako SPA s využitím technologií Angular 15+, TypeScript
- Zcela nezávislá na back-end (technologicky) kromě způsobu komunikace (HTTP/S a REST API)
- Výstupem bude optimalizovaná sada staticky hostovatelných souborů (HTML/CSS/JS)

### Back-end (EmployeeManager.WebAPI)
- Slouží k validaci ukládaných dat, persistenci a poskytování dat o zaměstnancích
- WebAPI vytvořené v ASP.NET8
- Publikace specifikace API prostřednictvím OpenApi specifikace (Swagger)
- Persistence dat do DB (konfigurovatelné, postačuje SQLite)
- Persistence s využitím Entity Framework Core
- Výstupem bude funkční projekt v ASP.NET 8 včetně podpory pro kontejnerizaci (Docker)


Očekávané části řešení
======================
- V zadání mohou (ale nutně nemusí) být záměrně vytvořeny nejasnosti, případně nelogičnosti. Součástí řešení by (v případě, že je zadání opravdu obsahuje) mohlo být upozornění na jejich existenci a návrh na změnu.
- Zdrojové kódy aplikace EmployeeManager.ClientApp
- Zdrojové kódy aplikace EmployeeManager.WebAPI
- Zdrojové kódy jsou spravované v GIT repozitáři
- Nasazené a zprovozněné řešení
	= Ideálně v Microsoft Azure
	= EmployeeManager.WebAPI v kontejneru (Docker), nebo Azure App Service
	= EmployeeManager.ClientApp hostované staticky v kontejneru (Docker) nebo Static website hosting v Azure Storage
	= Pokud budou obě části nasazeny v kontejneru, musí existovat separátní kontejner pro každou aplikaci zvlášť
