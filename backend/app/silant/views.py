from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *


@api_view(['POST'])
def authorization(request):
    user_obj = User.objects.get(login=request.data['login'])
    if user_obj.password == request.data['password']:
        user_serializer = UserSerializers(user_obj, many=False)
        return (Response({
            'data': user_serializer.data}))
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def machine_id(request):
    machine_obj = Machine.objects.filter(machine_id=request.data['machine_id'])
    machine_serializer = MachineSerializers(machine_obj, many=True)
    return(Response({
        'data': machine_serializer.data}))


@api_view(['GET', 'POST'])
def machine(request):
    if request.method == 'GET':
        user_obj = User.objects.get(token=request.headers['Authorization'])
        if user_obj.status == 'Client':
            machine_obj = Machine.objects.filter(client=user_obj.client).all()
            machine_serializer = MachineSerializers(machine_obj, many=True)
        elif user_obj.status == 'ServiceCompany':
            machine_obj = Machine.objects.filter(service_company=user_obj.service_company).all()
            machine_serializer = MachineSerializers(machine_obj, many=True)
        elif user_obj.status == 'Manager':
            machine_obj = Machine.objects.all()
            machine_serializer = MachineSerializers(machine_obj, many=True)
        return(Response({
            'data': machine_serializer.data}))
    elif request.method == 'POST':
        machine_obj = Machine.objects.get(machine_id=request.data['id'])
        if request.data['machine_id']:
            setattr(machine_obj,  'machine_id', request.data['machine_id'])
        if request.data['technic_model']:
            setattr(machine_obj, 'technic_model', Technic(request.data['technic_model']))
        if request.data['engines_model']:
            setattr(machine_obj, 'engines_model', Engine(request.data['engines_model']))
        if request.data['engines_id']:
            setattr(machine_obj, 'engines_id', request.data['engines_id'])
        if request.data['transmission_model']:
            setattr(machine_obj, 'transmission_model', Transmission(request.data['transmission_model']))
        if request.data['transmission_id']:
            setattr(machine_obj, 'transmission_id', request.data['transmission_id'])
        if request.data['leading_axle_model']:
            setattr(machine_obj, 'leading_axle_model', LeadingAxle(request.data['leading_axle_model']))
        if request.data['leading_axle_id']:
            setattr(machine_obj, 'leading_axle_id', request.data['leading_axle_id'])
        if request.data['controller_bridge_model']:
            setattr(machine_obj, 'controller_bridge_model', ControlledBridge(request.data['controller_bridge_model']))
        if request.data['controller_bridge_id']:
            setattr(machine_obj, 'controller_bridge_id', request.data['controller_bridge_id'])
        if request.data['supply_contract']:
            setattr(machine_obj, 'supply_contract', request.data['supply_contract'])
        if request.data['shipping_date']:
            front_date = request.data['shipping_date']
            setattr(machine_obj, 'shipping_date', front_date[:10])
        if request.data['consignee']:
            setattr(machine_obj, 'consignee', request.data['consignee'])
        if request.data['delivery_address']:
            setattr(machine_obj, 'delivery_address', request.data['delivery_address'])
        if request.data['equipment']:
            setattr(machine_obj, 'equipment', request.data['equipment'])
        if request.data['client']:
            setattr(machine_obj, 'client', Client(request.data['client']))
        if request.data['service_company']:
            setattr(machine_obj, 'service_company', ServiceCompany(request.data['service_company']))
        machine_obj.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def create_machine(request):
    user_obj = User.objects.get(token=request.headers['Authorization'])
    if user_obj.status == 'Manager':
        machine_obj = Machine()
        machine_obj.machine_id = request.data['machine_id']
        machine_obj.technic_model = Technic(request.data['technic_model'])
        machine_obj.engines_model = Engine(request.data['engines_model'])
        machine_obj.engines_id = request.data['engines_id']
        machine_obj.transmission_model = Transmission(request.data['transmission_model'])
        machine_obj.transmission_id = request.data['transmission_id']
        machine_obj.leading_axle_model = LeadingAxle(request.data['leading_axle_model'])
        machine_obj.leading_axle_id = request.data['leading_axle_id']
        machine_obj.controller_bridge_model = ControlledBridge(request.data['controller_bridge_model'])
        machine_obj.controller_bridge_id = request.data['controller_bridge_id']
        machine_obj.supply_contract = request.data['supply_contract']
        front_date = request.data['shipping_date']
        machine_obj.shipping_date = front_date[:10]
        machine_obj.consignee = request.data['consignee']
        machine_obj.delivery_address = request.data['delivery_address']
        machine_obj.equipment = request.data['equipment']
        machine_obj.client = Client(request.data['client'])
        machine_obj.service_company = ServiceCompany(request.data['service_company'])
        machine_obj.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def machine_list(request):
    user_obj = User.objects.get(token=request.headers['Authorization'])
    if user_obj.status == 'Client':
        machine_obj = Machine.objects.filter(client=user_obj.client).all()
        machine_serializer = MachineListSerializers(machine_obj, many=True)
    elif user_obj.status == 'ServiceCompany':
        machine_obj = Machine.objects.filter(service_company=user_obj.service_company).all()
        machine_serializer = MachineListSerializers(machine_obj, many=True)
    elif user_obj.status == 'Manager':
        machine_obj = Machine.objects.all()
        machine_serializer = MachineListSerializers(machine_obj, many=True)
    return(Response({
        'data': machine_serializer.data}))


@api_view(['POST'])
def delete_machine(request):
    user_obj = User.objects.get(token=request.headers['Authorization'])
    if user_obj.status == 'Manager':
        machine_obj = Machine.objects.get(machine_id=request.data['id'])
        machine_obj.delete()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def service(request):
    if request.method == 'GET':
        user_obj = User.objects.get(token=request.headers['Authorization'])
        if user_obj.status == 'Manager' or user_obj.status == 'Client':
            service_obj = Service.objects.all()
            service_serializer = ServiceSerializers(service_obj, many=True)
        elif user_obj.status == 'ServiceCompany':
            service_obj = Service.objects.filter(service_company=user_obj.service_company).all()
            service_serializer = ServiceSerializers(service_obj, many=True)
        return(Response({
            'data': service_serializer.data}))
    elif request.method == 'POST':
        service_obj = Service.objects.get(order_number=request.data['id'])
        if request.data['machine_id']:
            setattr(service_obj,  'machine_id', Machine(request.data['machine_id']))
        if request.data['service_view']:
            setattr(service_obj, 'service_view', ServiceView(request.data['service_view']))
        if request.data['service_date']:
            service_date = request.data['service_date']
            setattr(service_obj, 'service_date', service_date[:10])
        if request.data['development']:
            setattr(service_obj, 'development', request.data['development'])
        if request.data['order_number']:
            setattr(service_obj, 'order_number', request.data['order_number'])
        if request.data['order_date']:
            order_date = request.data['order_date']
            setattr(service_obj, 'order_date', order_date[:10])
        if request.data['service_company']:
            setattr(service_obj, 'service_company', ServiceCompany(request.data['service_company']))
        service_obj.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def create_service(request):
    service_obj = Service()
    service_obj.machine_id = Machine(request.data['machine_id'])
    service_obj.service_view = ServiceView(request.data['service_view'])
    service_date = request.data['service_date']
    service_obj.service_date = service_date[:10]
    service_obj.development = request.data['development']
    service_obj.order_number = request.data['order_number']
    order_date = request.data['order_date']
    service_obj.order_date = order_date[:10]
    service_obj.service_company = ServiceCompany(request.data['service_company'])
    service_obj.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def delete_service(request):
    machine_obj = Service.objects.get(order_number=request.data['id'])
    machine_obj.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def complaint(request):
    if request.method == 'GET':
        user_obj = User.objects.get(token=request.headers['Authorization'])
        if user_obj.status == 'Manager' or user_obj.status == 'Client':
            complaint_obj = Complaint.objects.all()
            complaint_serializer = ComplaintSerializers(complaint_obj, many=True)
        elif user_obj.status == 'ServiceCompany':
            complaint_obj = Complaint.objects.filter(service_company=user_obj.service_company).all()
            complaint_serializer = ComplaintSerializers(complaint_obj, many=True)
        return(Response({
            'data': complaint_serializer.data}))
    elif request.method == 'POST':
        complaint_obj = Complaint.objects.get(id=request.data['id'])
        if request.data['machine_id']:
            setattr(complaint_obj, 'machine_id', Machine(request.data['machine_id']))
        if request.data['refusal_date']:
            refusal_date = request.data['refusal_date']
            setattr(complaint_obj, 'refusal_date', refusal_date[:10])
        if request.data['development']:
            setattr(complaint_obj, 'development', request.data['development'])
        if request.data['failure_node']:
            setattr(complaint_obj, 'failure_node', FailureNode(request.data['failure_node']))
        if request.data['description_node']:
            setattr(complaint_obj, 'description_node', request.data['description_node'])
        if request.data['recovery_method']:
            setattr(complaint_obj, 'recovery_method', RecoveryMethod(request.data['recovery_method']))
        if request.data['spare_parts']:
            setattr(complaint_obj, 'spare_parts', request.data['spare_parts'])
        if request.data['recovery_date']:
            recovery_date = request.data['recovery_date']
            setattr(complaint_obj, 'recovery_date', recovery_date[:10])
        if request.data['service_company']:
            setattr(complaint_obj, 'service_company', ServiceCompany(request.data['service_company']))
        complaint_obj.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def create_complaint(request):
    complaint_obj = Complaint()
    complaint_obj.machine_id = Machine(request.data['machine_id'])
    refusal_date = request.data['refusal_date']
    complaint_obj.refusal_date = refusal_date[:10]
    complaint_obj.development = request.data['development']
    complaint_obj.failure_node = FailureNode(request.data['failure_node'])
    complaint_obj.description_node = request.data['description_node']
    complaint_obj.recovery_method = RecoveryMethod(request.data['recovery_method'])
    complaint_obj.spare_parts = request.data['spare_parts']
    recovery_date = request.data['recovery_date']
    complaint_obj.recovery_date = recovery_date[:10]
    complaint_obj.service_company = ServiceCompany(request.data['service_company'])
    complaint_obj.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def delete_complaint(request):
    complaint_obj = Complaint.objects.get(id=request.data['id'])
    complaint_obj.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def machine_category(request):
    if request.method == 'GET':
        technics = Technic.objects.all()
        engines = Engine.objects.all()
        transmissions = Transmission.objects.all()
        leading_axle = LeadingAxle.objects.all()
        controlled_bridge = ControlledBridge.objects.all()
        clients = Client.objects.all()
        service_company = ServiceCompany.objects.all()
        technics_serializer = TechnicsSerializers(technics, many=True)
        engines_serializer = EnginesSerializers(engines, many=True)
        transmissions_serializer = TransmissionsSerializers(transmissions, many=True)
        leading_axle_serializer = LeadingAxleSerializers(leading_axle, many=True)
        controlled_bridge_serializer = ControlledBridgeSerializers(controlled_bridge, many=True)
        clients_serializers = ClientsSerializers(clients, many=True)
        service_company_serializer = ServiceCompanySerializers(service_company, many=True)
        return(Response({
            'technics': technics_serializer.data,
            'engines': engines_serializer.data,
            'transmissions': transmissions_serializer.data,
            'leadingAxle': leading_axle_serializer.data,
            'controlledBridge': controlled_bridge_serializer.data,
            'clients': clients_serializers.data,
            'serviceCompany': service_company_serializer.data,}))
    elif request.method == 'POST':
        if request.data['model'] == 'technics':
            obj = Technic.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'engines':
            obj = Engine.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'transmissions':
            obj = Transmission.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'leadingAxle':
            obj = LeadingAxle.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'controlledBridge':
            obj = ControlledBridge.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'clients':
            obj = Client.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'serviceCompany':
            obj = ServiceCompany.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'serviceView':
            obj = ServiceView.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'failureNode':
            obj = FailureNode.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        elif request.data['model'] == 'recoveryMethod':
            obj = RecoveryMethod.objects.get(name=request.data['name'])
            setattr(obj, 'description', request.data['text'])
            obj.save()
        return Response(status=status.HTTP_200_OK)



@api_view(['GET'])
def service_category(request):
        service_company = ServiceCompany.objects.all()
        service_view = ServiceView.objects.all()
        service_company_serializer = ServiceCompanySerializers(service_company, many=True)
        service_view_serializer = ServiceViewSerializers(service_view, many=True)
        return(Response({
            'serviceCompany': service_company_serializer.data,
            'serviceView': service_view_serializer.data,}))


@api_view(['GET'])
def complaint_category(request):
        failure_node = FailureNode.objects.all()
        recovery_method = RecoveryMethod.objects.all()
        service_company = ServiceCompany.objects.all()
        failure_node_serializer = FailureNodeSerializers(failure_node, many=True)
        recovery_method_serializer = RecoveryMethodSerializers(recovery_method, many=True)
        service_company_serializer = ServiceCompanySerializers(service_company, many=True)
        return(Response({
            'failureNode': failure_node_serializer.data,
            'recoveryMethod': recovery_method_serializer.data,
            'serviceCompany': service_company_serializer.data}
        ))


@api_view(['POST'])
def create_category(request):
    if request.data['model'] == 'technics':
        obj = Technic()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'engines':
        obj = Engine()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'transmissions':
        obj = Transmission()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'leadingAxle':
        obj = LeadingAxle()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'controlledBridge':
        obj = ControlledBridge()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'clients':
        obj = Client()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'serviceCompany':
        obj = ServiceCompany()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'serviceView':
        obj = ServiceView()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'failureNode':
        obj = FailureNode()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    elif request.data['model'] == 'recoveryMethod':
        obj = RecoveryMethod()
        obj.name = request.data['name']
        obj.description = request.data['description']
        obj.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def delete_category(request):
    if request.data['model'] == 'technics':
        obj = Technic.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'engines':
        obj = Engine.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'transmissions':
        obj = Transmission.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'leadingAxle':
        obj = LeadingAxle.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'controlledBridge':
        obj = ControlledBridge.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'clients':
        obj = Client.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'serviceCompany':
        obj = ServiceCompany.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'serviceView':
        obj = ServiceView.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'failureNode':
        obj = FailureNode.objects.get(name=request.data['name'])
        obj.delete()
    elif request.data['model'] == 'recoveryMethod':
        obj = RecoveryMethod.objects.get(name=request.data['name'])
        obj.delete()
    return Response(status=status.HTTP_200_OK)
