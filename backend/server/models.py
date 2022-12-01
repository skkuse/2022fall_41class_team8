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
    skeleton = models.TextField()
    testcase1 = models.TextField()
    testcase2 = models.TextField()

    def __str__(self) : 
        return f"{self.chapter} {self.title}"

class user_log(models.Model):
    # log_id = models.AutoField(primary_key=True)
    # user_id = models.ForeignKey(user,on_delete=models.CASCADE)
    ProblemInfo = models.ForeignKey(problem,on_delete=models.CASCADE, primary_key=True)
    auto_saved = models.TextField(default="A")
    save1 = models.TextField(default="1")
    save2 = models.TextField(default="2")
    save3 = models.TextField(default="3")
    status = models.TextField(default="Not solved")

    
    def __int__(self) :
        return f"{self.ProblemInfo.id}"
