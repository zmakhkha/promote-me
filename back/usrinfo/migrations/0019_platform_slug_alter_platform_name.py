# Generated by Django 4.2.14 on 2024-08-09 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usrinfo', '0018_platform_remove_appuser_instausername_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='platform',
            name='slug',
            field=models.CharField(blank=True, max_length=65),
        ),
        migrations.AlterField(
            model_name='platform',
            name='name',
            field=models.CharField(blank=True, max_length=65),
        ),
    ]
