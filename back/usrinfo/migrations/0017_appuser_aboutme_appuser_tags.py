# Generated by Django 4.2.14 on 2024-08-07 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usrinfo', '0016_alter_profileview_unique_together_appuser_score_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='aboutMe',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='appuser',
            name='tags',
            field=models.ManyToManyField(through='usrinfo.TagsPerUser', to='usrinfo.tag'),
        ),
    ]
