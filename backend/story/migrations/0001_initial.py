# Generated by Django 3.2.13 on 2023-03-28 05:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Story',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=55)),
                ('image', models.CharField(max_length=55)),
                ('genre', models.CharField(max_length=55)),
                ('content_en', models.TextField(max_length=2047)),
                ('content_ko', models.TextField(max_length=2047)),
                ('voice', models.CharField(max_length=55)),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='story', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
