# Generated by Django 3.2.5 on 2021-11-24 14:54

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Consultant',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='accounts.customuser')),
                ('expertise', models.IntegerField(blank=True, choices=[(1, 'Level 1'), (2, 'Level 2')], null=True, verbose_name='expertise')),
                ('description', models.CharField(blank=True, max_length=1500, verbose_name='description')),
                ('tags', models.CharField(blank=True, help_text='Add a comma separated list of tags associated with the consultant.', max_length=1500, verbose_name='tags')),
                ('profile_pic', models.ImageField(blank=True, upload_to='media_cdn/uploads')),
                ('calendly_id', models.CharField(blank=True, max_length=255, null=True, verbose_name='calendly id')),
            ],
            options={
                'abstract': False,
            },
            bases=('accounts.customuser',),
        ),
    ]