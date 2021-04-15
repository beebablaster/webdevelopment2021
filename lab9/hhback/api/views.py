from django.http.response import JsonResponse

from .models import Vacancy, Company


def vacancy_list(request):
    # SELECT * FROM core_product;
    vacancies = Vacancy.objects.all()
    vacancies_json = [vacancy.to_json() for vacancy in vacancies]
    return JsonResponse(vacancies_json, safe=False)


def vacancy_detail(request, vacancy_id):
    try:
        vacancy = Vacancy.objects.get(id=vacancy_id)
    except Vacancy.DoesNotExist as e:
        return JsonResponse({'message': str(e)}, status=400)

    return JsonResponse(vacancy.to_json())

def vacancy_top_ten(request):
    vacancies = Vacancy.objects.order_by('-salary')
    if len(vacancies) > 10:
        vacancies = vacancies[:10]
    vacancies_json = [vacancy.to_json() for vacancy in vacancies]
    return JsonResponse(vacancies_json, safe=False)

def company_list(request):
    companies = Company.objects.all()
    companies_json = [company.to_json() for company in companies]
    return JsonResponse(companies_json, safe=False)

def company_detail(request, company_id):
    try:
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist as e:
        return JsonResponse({'message': str(e)}, status=400)
    return JsonResponse(company.to_json())

def company_vacancies_list(request, company_id):
    try:
        company = Company.objects.get(id=company_id)
        vacancies = Vacancy.objects.all()
        vacancy_list = [vacancy.to_json for vacancy in vacancies if vacancy.company_id == company_id]
    except Company.DoesNotExist as e:
        return JsonResponse({'message': str(e)}, status=400)
    return JsonResponse(vacancy_list, safe=False)
