from django.conf import settings
from datetime import datetime, timedelta, date

def app_decorator(request):

    startweek, endweek = get_weekdate(datetime.now().date().strftime("%Y-%m-%d"))
    return { 'token': '', 'main_site_url': settings.MAIN_SITE_URL, 'start_week': startweek, 'end_week': endweek }


def get_weekdate(day):
    dt = datetime.strptime(day, '%Y-%m-%d')
    start = dt - timedelta(days=dt.weekday())
    end = start + timedelta(days=6)
    return start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")