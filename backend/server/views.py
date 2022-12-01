from django.shortcuts import render
from rest_framework import generics
from django.http import JsonResponse

from .models import user, problem, user_log
from . import serializers
from. import code_explanation, contents_recommend, copydetect, efficiency, readable
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
        # print("AAA",problem_id)
        user_log.objects.get_or_create(ProblemInfo = problem(problem_id))
        return self.retrieve(request, *args, **kwargs)


def scoring(request, ProblemId):
    data = {}
    file_name = f'{ProblemId}.py'
    with open(file_name, 'w') as f:
        f.write(user_log.objects.get(ProblemInfo_id=ProblemId).auto_saved)
    #data['plagiarism']=copydetect.copyrate()
    # data['efficiency']={}
    # data['efficiency']['count of lines']=efficiency.count_line(file_name)
    # data['efficiency']['halstead']=efficiency.halstead(file_name)
    # data['efficiency']['control_flow']=efficiency.control_flow(file_name)
    # data['efficiency']['data_flow']=efficiency.data_flow(file_name)
    # data['readability']=readable.readability(file_name)
       
    data['explanation'] = code_explanation.get_explanation(file_name)
    search_query = 'python' + problem.objects.get(id=ProblemId).title
    data['recommendation'] = contents_recommend.GetRecommendation(search_query)
    print(data)
    return JsonResponse(data)
