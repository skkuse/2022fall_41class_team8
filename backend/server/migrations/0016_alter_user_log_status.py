# Generated by Django 4.1.3 on 2022-12-01 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0015_alter_user_log_auto_saved_alter_user_log_save1_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_log',
            name='status',
            field=models.CharField(default='0', max_length=1),
        ),
    ]
