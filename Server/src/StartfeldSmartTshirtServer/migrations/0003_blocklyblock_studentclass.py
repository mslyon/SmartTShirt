# Generated by Django 2.0.4 on 2018-11-15 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StartfeldSmartTshirtServer', '0002_blocklyblock_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='blocklyblock',
            name='studentclass',
            field=models.CharField(default='NULL', max_length=200),
        ),
    ]
