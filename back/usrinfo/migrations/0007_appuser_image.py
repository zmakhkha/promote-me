# Generated by Django 4.2.14 on 2024-08-03 07:39

from django.db import migrations, models
import usrinfo.validators


class Migration(migrations.Migration):

    dependencies = [
        ('usrinfo', '0006_rename_genre_appuser_gender_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='image',
            field=models.ImageField(default='images/default.png', upload_to='images', validators=[usrinfo.validators.max_size_validator]),
        ),
    ]
