# Generated by Django 4.1.3 on 2022-12-01 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0012_alter_user_log_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_log',
            name='auto_saved',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='user_log',
            name='save1',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='user_log',
            name='save2',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='user_log',
            name='save3',
            field=models.TextField(default=''),
        ),
    ]
