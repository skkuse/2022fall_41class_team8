from rest_framework import serializers
from .models import user, problem, user_log

class ProblemListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'chapter',
            'title',
        )
        model = problem

class ProblemDetailSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'chapter',
            'title',
            'contents',
            'restrict',
            'skeleton',
            'testcase1',
            'testcase2'
        )
        model = problem

class LogDetailSerializer(serializers.ModelSerializer):
    ProblemInfo = ProblemDetailSerializer(required=True, read_only=False)
    class Meta:
        model = user_log
        fields = (
            'auto_saved',
            'save1',
            'save2',
            'save3',
            'status',
            'ProblemInfo'
        )