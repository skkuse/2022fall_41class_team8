from django.shortcuts import render
from rest_framework import generics

from .models import user, problem, user_log
from . import serializers
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
        print("AAA",problem_id)
        user_log.objects.get_or_create(ProblemInfo = problem(problem_id))
        return self.retrieve(request, *args, **kwargs)
