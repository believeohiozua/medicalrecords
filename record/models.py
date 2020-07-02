from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.template.defaultfilters import slugify
from io import BytesIO
import os
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
import base64
from django.core.files.base import ContentFile

 

Gender_CHOICE = [        
    ('Male', 'Male'),
    ('Female', 'Female'),
]

terminal_CHOICE= [         
    ('Cancer', 'Cancer'),
    ('Azemia', 'Azemia'),
    ('Parkinson', 'Parkinson'),
     ('Diabetis', 'Diabetis'),
     ('Arthritis', 'Arthritis'),
     ('Others', 'Others'),
]

virial_CHOICE= [       
    ('Corona', 'Corona'),
    ('Ebola', 'Ebola'),
     ('HIV', 'HIV'),
    ('Small Pox', 'SmallPox'),
     ('Influenza', 'Influenza'),
    ('Others', 'Others'),
]

Common_CHOICE= [       
    ('Malaria', 'Malaria'),
    ('Fever', 'Fever'),
    ('Diarrhea', 'Diarrhea'),
    ('Common Cough', 'Common_Cough'),
    ('Cold', 'Cold'),
    ('Food poisoning', 'Food_poisoning'),
     ('Others', 'Others'),
]


class Register(models.Model):   
    user            =   models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True,null=True)
    owner           =   models.CharField(max_length=200, blank=True, null=True)     
    first_name      =   models.CharField(max_length=200, blank=True, null=True)    
    last_name       =   models.CharField(max_length=200, blank=True, null=True)
    email           =   models.EmailField(blank=True, null=True)
    address         =   models.TextField(blank=True, null=True)
    gender          =   models.CharField(max_length=10,choices=Gender_CHOICE,help_text='Gender',blank=True, null=True)
    bloodgroup      =   models.CharField(max_length=10, blank=True, null=True) 
    genotype        =   models.CharField(max_length=10, blank=True, null=True) 
    date_of_birth   =   models.DateField(blank=True, null=True)    
    phone_number    =   models.CharField(max_length=20, blank=True, null=True)    
    image           =   models.TextField(blank=True, null=True)   
    image_img       =   models.ImageField(upload_to='image', blank=True,null=True)   
    created_at      =   models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at      =   models.DateTimeField(auto_now=True, blank=True, null=True)
    terminal_illness =  models.CharField(max_length=10,choices=terminal_CHOICE, default='', blank=True, null=True)
    virial_dieseases =  models.CharField(max_length=10,choices=virial_CHOICE, default='', blank=True, null=True)
    Common_Illness =  models.CharField(max_length=10,choices=Common_CHOICE, default='', blank=True, null=True)

    class Meta: 
        ordering = ["-created_at", "-updated_at"]        
       
    def __str__(self):
        return str(self.user.username)   
       
    #save username as Owner for easy search 
    def save(self, *args, **kwargs):          
        if self.user:
            self.owner = str(self.user)
      
        # convert base64 to png and save to database
        if self.image:
            format, imgstr = str(self.image).split(';base64,') 
            ext = format.split('/')[-1]
            self.image_img = ContentFile(base64.b64decode(imgstr),
             name=str(self.first_name)+str(self.id)+'_image.' + ext)
        super(Register, self).save(*args, **kwargs)


       
