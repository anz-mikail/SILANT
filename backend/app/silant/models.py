from django.db import models
import random
import string


M = 'Manager'
C = 'Client'
S = 'ServiceCompany'
STATUS_CHOICES = (
    (M, 'Manager'),
    (C, 'Client'),
    (S, 'ServiceCompany')
)
Token = ''.join([random.choice(string.ascii_lowercase + string.digits + string.ascii_uppercase) for i in range(30)])


class Technic(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.TextField(default='None')

    def __str__(self):
        return self.name


class Engine(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.TextField(default='None')

    def __str__(self):
        return self.name


class Transmission(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.TextField(default='None')

    def __str__(self):
        return self.name


class LeadingAxle(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.TextField(default='None')

    def __str__(self):
        return self.name


class ControlledBridge(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.TextField(default='None')

    def __str__(self):
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.TextField(default='None')

    def __str__(self):
        return self.name


class ServiceCompany(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.TextField(default='None')

    def __str__(self):
        return self.name


class Machine(models.Model):
    machine_id = models.CharField(max_length=40, unique=True)
    technic_model = models.ForeignKey(Technic, on_delete=models.CASCADE)
    engines_model = models.ForeignKey(Engine, on_delete=models.CASCADE)
    engines_id = models.CharField(max_length=40, default='None')
    transmission_model = models.ForeignKey(Transmission, on_delete=models.CASCADE)
    transmission_id = models.CharField(max_length=40, default='None')
    leading_axle_model = models.ForeignKey(LeadingAxle, on_delete=models.CASCADE)
    leading_axle_id = models.CharField(max_length=40, default='None')
    controller_bridge_model = models.ForeignKey(ControlledBridge, on_delete=models.CASCADE)
    controller_bridge_id = models.CharField(max_length=40, default='None')
    supply_contract = models.CharField(max_length=40, unique=False)
    shipping_date = models.DateField(auto_now_add=False)
    consignee = models.CharField(max_length=40, default='None')
    delivery_address = models.CharField(max_length=40, default='None')
    equipment = models.CharField(max_length=80, default='None')
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)

    def __str__(self):
        return self.machine_id


class ServiceView(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.CharField(max_length=40, default='None')

    def __str__(self):
        return self.name


class Service(models.Model):
    machine_id = models.ForeignKey(Machine, on_delete=models.CASCADE)
    service_view = models.ForeignKey(ServiceView, on_delete=models.CASCADE)
    service_date = models.DateField(auto_now_add=False)
    development = models.IntegerField(default=0)
    order_number = models.CharField(max_length=40, default='None', unique=True)
    order_date = models.DateField(auto_now_add=False)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)

    def __str__(self):
        return self.order_number


class FailureNode(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.CharField(max_length=40, default='None')

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):
    name = models.CharField(max_length=40, default='None', unique=True)
    description = models.CharField(max_length=40, default='None')

    def __str__(self):
        return self.name


class Complaint(models.Model):
    machine_id = models.ForeignKey(Machine, on_delete=models.CASCADE)
    refusal_date = models.DateField()
    development = models.IntegerField(default=0)
    failure_node = models.ForeignKey(FailureNode, on_delete=models.CASCADE)
    description_node = models.TextField(default='None')
    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE)
    spare_parts = models.CharField(max_length=60, default='None')
    recovery_date = models.DateField()
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)


class User(models.Model):
    login = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)
    token = models.CharField(max_length=40, unique=True, default=Token)

    def __str__(self):
        return self.login


