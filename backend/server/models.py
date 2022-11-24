from __future__ import unicode_literals
from django.db import models

# Create your models here.

class user(models.Model):
    user_id = models.CharField(max_length=20, primary_key=True)
    pw = models.CharField(max_length=200)

    def __str__(self):
        return self.user_id

class problem(models.Model):
    chapter = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    contents = models.TextField()
    restrict = models.TextField()
    testcase1 = models.CharField(max_length=200)
    testcase2 = models.CharField(max_length=200)

    def __str__(self) : 
        return f"{self.chapter} {self.title}"

class user_log(models.Model):
    # log_id = models.AutoField(primary_key=True)
    # user_id = models.ForeignKey(user,on_delete=models.CASCADE)
    ProblemInfo = models.ForeignKey(problem,on_delete=models.CASCADE, primary_key=True)
    auto_saved = models.TextField()
    save1 = models.TextField()
    save2 = models.TextField()
    save3 = models.TextField()
    status = models.CharField(max_length=1)
    
    def __str__(self) :
        return f"{self.ProblemInfo}"
