from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListProblem.as_view()),
    path('<str:pk>/', views.LoadLog.as_view()),
    path('<str:ProblemId>/scoring', views.scoring)
]