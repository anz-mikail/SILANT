from rest_framework import serializers
from .models import *


class TechnicsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Technic
        fields = ('id', 'name', 'description')


class EnginesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Engine
        fields = ('id', 'name', 'description')


class TransmissionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Transmission
        fields = ('id', 'name', 'description')


class LeadingAxleSerializers(serializers.ModelSerializer):
    class Meta:
        model = LeadingAxle
        fields = ('id', 'name', 'description')


class ControlledBridgeSerializers(serializers.ModelSerializer):
    class Meta:
        model = ControlledBridge
        fields = ('id', 'name', 'description')


class ClientsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'name', 'description')


class ServiceCompanySerializers(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = ('id', 'name', 'description')


class MachineSerializers(serializers.ModelSerializer):
    technic_model = TechnicsSerializers()
    engines_model = EnginesSerializers()
    transmission_model = TransmissionsSerializers()
    leading_axle_model = LeadingAxleSerializers()
    controller_bridge_model = ControlledBridgeSerializers()
    client = ClientsSerializers()
    service_company = ServiceCompanySerializers()

    class Meta:
        model = Machine
        fields = ('id', 'machine_id', 'technic_model', 'engines_model', 'engines_id', 'transmission_model',
                  'transmission_id', 'leading_axle_model', 'leading_axle_id', 'controller_bridge_model',
                  'controller_bridge_id', 'supply_contract', 'shipping_date', 'consignee',
                  'delivery_address', 'equipment', 'client', 'service_company')


class MachineListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ('id', 'machine_id', 'client', 'service_company')


class ServiceViewSerializers(serializers.ModelSerializer):
    class Meta:
        model = ServiceView
        fields = ('id', 'name', 'description')


class ServiceSerializers(serializers.ModelSerializer):
    machine_id = MachineSerializers()
    service_view = ServiceViewSerializers()
    service_company = ServiceCompanySerializers()

    class Meta:
        model = Service
        fields = ('id','machine_id', 'service_view', 'service_date', 'development', 'order_number',
                  'order_date', 'service_company')


class FailureNodeSerializers(serializers.ModelSerializer):
    class Meta:
        model = FailureNode
        fields = ('id', 'name', 'description')


class RecoveryMethodSerializers(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = ('id', 'name', 'description')


class ComplaintSerializers(serializers.ModelSerializer):
    machine_id = MachineSerializers()
    failure_node = FailureNodeSerializers()
    recovery_method = RecoveryMethodSerializers()
    service_company = ServiceCompanySerializers()

    class Meta:
        model = Complaint
        fields = ('id', 'machine_id', 'refusal_date', 'development', 'failure_node', 'description_node',
                  'recovery_method', 'spare_parts', 'recovery_date', 'service_company')


class UserSerializers(serializers.ModelSerializer):
    service_company = ServiceCompanySerializers()
    client = ClientsSerializers()

    class Meta:
        model = User
        fields = ('id', 'login', 'password', 'token', 'status', 'service_company', 'client')