from django.db import models
from django.contrib.auth.models import User, BaseUserManager, AbstractBaseUser

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
    
    def create_superuser(self, email,first_name, last_name, gender, password=None):
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

class League(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    max_teams = models.IntegerField(default=8)
    author = models.ForeignKey(LeagueUser, on_delete=models.CASCADE, related_name="leagues")

    def __str__(self):
        return self.title