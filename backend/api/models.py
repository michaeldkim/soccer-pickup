from django.db import models
from django.contrib.auth.models import User, BaseUserManager, AbstractBaseUser
from django.utils import timezone
from datetime import date, time 

class LeagueUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, gender, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            gender=gender,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_superuser(self, email, first_name, last_name, gender, password=None):
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            gender=gender,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    
class LeagueUser(AbstractBaseUser):
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    gender = models.CharField(max_length=1, choices=(('M', 'Male'), ('F', 'Female'), ('O', 'Other')))
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = LeagueUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'gender']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Team(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

class League(models.Model):
    DAY_OF_THE_WEEK = [
        ('MO', 'Monday'),
        ('TU', 'Tuesday'),
        ('WE', 'Wednesday'),
        ('TH', 'Thursday'),
        ('FR', 'Friday'),
        ('SA', 'Saturday'),
        ('SU', 'Sunday'),
    ]

    title = models.CharField(max_length=100)
    content = models.TextField()
    max_teams = models.IntegerField(default=8)
    location = models.CharField(max_length=100, default="TBD")
    game_day = models.CharField(
        max_length=2,
        choices=DAY_OF_THE_WEEK,
        default='MO'
    )
    game_time = models.TimeField(default=time(18,00))
    league_start_date = models.DateField(default=date.today)
    author = models.ForeignKey(LeagueUser, on_delete=models.CASCADE, related_name="leagues")
    teams = models.ManyToManyField(Team, related_name="leagues", blank=True)

    def __str__(self):
        return self.title