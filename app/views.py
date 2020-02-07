from django.shortcuts import render
from django.views import View


class Reports(View):

    def get(self, request):
        campaign = request.GET.get('campaign', '')
        return render(request, 'reports.html', {'campaign': campaign})


class APIDoc(View):
    def get(self, request, part):
        return render(request, 'docs/' + part + '.html')