# Generated by Django 4.1.3 on 2022-12-01 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0017_alter_user_log_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_log',
            name='status',
            field=models.TextField(default='Not solved'),
        ),
    ]
