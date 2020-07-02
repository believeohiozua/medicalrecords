from rest_framework import generics, permissions,  pagination ,serializers, views, status
from rest_framework.response import Response
from knox.models import AuthToken
from .models import Register
from .serializers import RegisterSerializer, UserSerializer, SignUpSerializer,  LoginSerializer
from django.contrib.auth.models import User, Group




def countTerminal(field):
  '''
  A function to count all terminal illnesses for Metric values
  '''
  total = Register.objects.filter(terminal_illness=field)
  return total.count()

def countVirial(field):
  '''
  A function to count all virial dieseases for Metric values
  '''
  total = Register.objects.filter(virial_dieseases=field)
  return total.count() 

def countCommon(field):
  '''
  A function to count all Common Illnesses for Metric values
  '''
  total = Register.objects.filter(Common_Illness=field)
  return total.count()

# Save all metric values to a Dictionary
metrics= {
'Cancer':countTerminal('Cancer'),
'Azemia':countTerminal('Azemia'),
'Parkinson':countTerminal('Parkinson'),
'Diabetis':countTerminal('Diabetis'),
'Arthritis':countTerminal('Arthritis'),
'Others':countTerminal('Others'),

'Corona':countVirial('Corona'),
'Ebola':countVirial('Ebola'),
'HIV':countVirial('HIV'),
'SmallPox':countVirial('SmallPox'),
'Influenza':countVirial('Influenza'),
'Others':countVirial('Others'),

'Malaria':countCommon('Malaria'),
'Fever':countCommon('Fever'),
'Diarrhea':countCommon('Diarrhea'),
'Common_Cough':countCommon('Common_Cough'),
'Cold':countCommon('Cold'),
'Food_poisoning':countCommon('Food_poisoning'),
'Others':countCommon('Others'),
}

# Pagination and vital serializable context values for Frontend Usage
class RegisterPageNumberPagination(pagination.PageNumberPagination):
  page_size = 8
  page_size_query_param = 'size'
  max_page_size = 20

  def get_paginated_response(self, data):        
    authenticated = False
    staff = False
    user = self.request.user
    if user.is_authenticated:
        authenticated = True    
    if user.is_authenticated:
        userlink = self.request.user.register.pk
    else:
      userlink = None

    context = {
       'staff': self.request.user.groups.filter(name='Medical practitioners').exists(),
        'active_user': str(self.request.user),
        'userlink':userlink ,
        'next': self.get_next_link(),
        'previous': self.get_previous_link(),
        'count': self.page.paginator.count,
        'authenticated': authenticated,
        'results': data, 
        'metircval':metrics,      
        "search_query": 
        Register.objects.values(
        'pk',
        'owner',                        
        'terminal_illness',
        'virial_dieseases',
        'Common_Illness').distinct(),     
            }

    return Response(context)
 
class RegisterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Register.objects.all()
    serializer_class    = RegisterSerializer
    lookup_field        = 'pk'
    permission_classes =  ( permissions.IsAuthenticatedOrReadOnly,)


class RegisterListView(generics.ListCreateAPIView):
    queryset            = Register.objects.all()
    serializer_class    =  RegisterSerializer
    permission_classes =  ( permissions.IsAuthenticatedOrReadOnly,)
    pagination_class    =  RegisterPageNumberPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# AUTHENTICATION VIEW CLASS
class SignupAPI(generics.GenericAPIView):
  '''
  General user signup class
  '''
  serializer_class = SignUpSerializer
  def post(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)    
      user = serializer.save()
      get_user_data = UserSerializer(user, context=self.get_serializer_context()).data 
      # Create profile from Signup Data     
      profile, created=Register.objects.get_or_create(     
            user=user,            
            email=get_user_data.get('email'),       
            terminal_illness=" ",
            virial_dieseases=" ",
            Common_Illness=" "           
            )  
      profile.save()
      return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,      
        "token": AuthToken.objects.create(user)[1]
      })


class StaffSignupAPI(generics.GenericAPIView):
  '''
  Medical Practitioners signup class
  '''
  serializer_class = SignUpSerializer
  def post(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)    
      user = serializer.save()
      get_user_data = UserSerializer(user, context=self.get_serializer_context()).data
       # Create profile from Signup Data            
      profile, created=Register.objects.get_or_create(     
            user=user,            
            email=get_user_data.get('email'),          
            terminal_illness=" ",
            virial_dieseases=" ",
            Common_Illness=" "           
            )  
      profile.save() 
      # Add user to  Medical practitioners Group
      make_staff= User.objects.get(username=user)
      users_group = Group.objects.get(name="Medical practitioners")
      users_group.user_set.add(make_staff)     
      return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,      
        "token": AuthToken.objects.create(user)[1]
      })


# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    _, token = AuthToken.objects.create(user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })

# Get User API
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user