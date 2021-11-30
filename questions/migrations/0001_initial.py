# Generated by Django 3.2.5 on 2021-11-24 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('consultants', models.ManyToManyField(related_name='name', to='accounts.Consultant')),
                ('name', models.ManyToManyField(to='accounts.Consultant')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expertise', models.IntegerField(blank=True, choices=[(1, 'Level 1'), (2, 'Level 2'), (3, 'Level 3')], null=True, verbose_name='expertise')),
                ('question', models.CharField(max_length=10000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('categories', models.ManyToManyField(to='questions.Category')),
                ('consultants', models.ManyToManyField(to='accounts.Consultant')),
            ],
        ),
    ]
