# Generated by Django 4.1.3 on 2022-11-25 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_remove_user_log_problem_id_user_log_probleminfo'),
    ]

    operations = [
        migrations.AddField(
            model_name='problem',
            name='skeleton',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]