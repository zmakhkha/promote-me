# Generated by Django 4.2.14 on 2024-08-05 23:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usrinfo', '0012_rename_date_of_birth_appuser_dateofbirth'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appuser',
            name='interests',
        ),
    ]
