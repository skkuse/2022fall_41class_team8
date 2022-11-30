# Generated by Django 4.1.3 on 2022-11-24 05:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0006_alter_user_log_problem_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_log',
            name='problem_id',
        ),
        migrations.AddField(
            model_name='user_log',
            name='ProblemInfo',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='server.problem'),
            preserve_default=False,
        ),
    ]