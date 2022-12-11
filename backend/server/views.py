from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse


from rest_framework.decorators import api_view
from .models import user, problem, user_log
from . import serializers
from . import code_explanation, contents_recommend, copydetect, efficiency, readable

import os
# Create your views here.

class ListProblem(generics.ListCreateAPIView):
    queryset = problem.objects.all()
    serializer_class = serializers.ProblemListSerializer

class DetailProblem(generics.RetrieveUpdateDestroyAPIView):
    queryset = problem.objects.all()
    serializer_class = serializers.ProblemDetailSerializer

class LoadLog(generics.RetrieveUpdateDestroyAPIView):
    queryset = user_log.objects.all()
    serializer_class = serializers.LogDetailSerializer

    def get(self, request, *args, **kwargs):
        problem_id = self.kwargs['pk']
        user_log.objects.get_or_create(ProblemInfo = problem(problem_id))
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        self.retrieve(request, *args, **kwargs)
        return self.update(request, *args, **kwargs)


def scoring(request, ProblemId):
    data = {}
    file_name = f'user{ProblemId}.py'
    with open(file_name, 'w') as f:
        f.write(user_log.objects.get(ProblemInfo_id=ProblemId).auto_saved)
    data['plagiarism']=copydetect.copyrate(file_name)
    data['efficiency']={}
    data['efficiency']['count of lines']=efficiency.count_line(file_name)
    data['efficiency']['halstead']=efficiency.halstead(file_name)
    data['efficiency']['control_flow']=efficiency.control_flow(file_name)
    data['efficiency']['data_flow']=efficiency.data_flow(file_name)
    data['readability']=readable.readability(file_name)
       
    data['explanation'] = code_explanation.get_explanation(file_name)
    search_query = 'python' + problem.objects.get(id=ProblemId).title
    data['recommendation'] = contents_recommend.GetRecommendation(search_query)
    print(data)
    return JsonResponse(data)

def executing(request, ProblemId):
    data = {}
    file_name = f'user{ProblemId}.py'
    with open(file_name, 'w') as f:
        f.write(user_log.objects.get(ProblemInfo_id=ProblemId).auto_saved)

       
    data['explanation'] = code_explanation.get_explanation(file_name)
    search_query = 'python' + problem.objects.get(id=ProblemId).title
    data['recommendation'] = contents_recommend.GetRecommendation(search_query)
    print(data)
    return JsonResponse(data)


@api_view(['GET'])
def exe_TC(request, ProblemId):
    if request.method=='GET':
        ret = {}
        if request.GET.get('input',-1)==-1:
            return HttpResponse()
        req_code = request.GET.get('code',-1)
        req_input = request.GET.get('input',-1).replace(" ","")
        req_output = request.GET.get('output',-1).replace(" ","")
        print('get req',request.GET.get('input',-1))
        
        with open('server/dummy_one.py','w') as f:
            f.write(req_code)

        stream=os.popen(f'python server/exe_one.py 1 {req_input}')
        output=stream.read()
        print(output)
        if output==req_output:
            ret['same']=1
        else: ret['same']=0

        os.remove('server/dummy_one.py')

        return JsonResponse(ret)
    return HttpResponse()





