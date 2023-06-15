import re
import random
from datetime import datetime

def validar_cpf(cpf):
    cpf = re.sub(r'\D', '', cpf)
    if len(cpf) != 11:
        return False
    if re.match(r'^(\d)\1+$', cpf):
        return False
    soma = 0
    for i in range(9):
        soma += int(cpf[i]) * (10 - i)
    resto = soma % 11
    digito1 = 0 if resto < 2 else 11 - resto
    soma = 0
    for i in range(10):
        soma += int(cpf[i]) * (11 - i)
    resto = soma % 11
    digito2 = 0 if resto < 2 else 11 - resto
    if int(cpf[9]) != digito1 or int(cpf[10]) != digito2:
        return False
    return True

def validar_cnpj(cnpj):
    cnpj = re.sub(r'\D', '', cnpj)
    if len(cnpj) != 14:
        return False
    if re.match(r'^(\d)\1+$', cnpj):
        return False
    soma = 0
    multiplicador = 5
    for i in range(12):
        soma += int(cnpj[i]) * multiplicador
        multiplicador = 9 if multiplicador == 2 else multiplicador - 1
    resto = soma % 11
    digito1 = 0 if resto < 2 else 11 - resto
    soma = 0
    multiplicador = 6
    for i in range(13):
        soma += int(cnpj[i]) * multiplicador
        multiplicador = 9 if multiplicador == 2 else multiplicador - 1
    resto = soma % 11
    digito2 = 0 if resto < 2 else 11 - resto
    if int(cnpj[12]) != digito1 or int(cnpj[13]) != digito2:
        return False
    return True

def validar_email(email):
    return re.match(r'^[\w.-]+@[\w.-]+\.\w+$', email) is not None

def pontuar_cpf(cpf):
    cpf = re.sub(r'\D', '', cpf)
    if len(cpf) != 11:
        return cpf
    return f'{cpf[:3]}.{cpf[3:6]}.{cpf[6:9]}-{cpf[9:]}'

def pontuar_cnpj(cnpj):
    cnpj = re.sub(r'\D', '', cnpj)
    if len(cnpj) != 14:
        return cnpj
    return f'{cnpj[:2]}.{cnpj[2:5]}.{cnpj[5:8]}/{cnpj[8:12]}-{cnpj[12:]}'

def is_integer(value):
    try:
        int(value)
        return True
    except ValueError:
        return False

def is_decimal(value):
    try:
        float(value)
        return '.' in str(value)
    except ValueError:
        return False

def slugify(string):
    string = string.lower()
    string = re.sub(r'[^a-z0-9]+', '-', string)
    string = string.strip('-')
    string = re.sub(r'-+', '-', string)
    return string

def remover_acentos(string):
    string = string.lower()
    string = string.replace('á', 'a').replace('à', 'a').replace('ã', 'a').replace('â', 'a').replace('ä', 'a')
    string = string.replace('é', 'e').replace('è', 'e').replace('ê', 'e').replace('ë', 'e')
    string = string.replace('í', 'i').replace('ì', 'i').replace('î', 'i').replace('ï', 'i')
    string = string.replace('ó', 'o').replace('ò', 'o').replace('õ', 'o').replace('ô', 'o').replace('ö', 'o')
    string = string.replace('ú', 'u').replace('ù', 'u').replace('û', 'u').replace('ü', 'u')
    string = string.replace('ç', 'c')
    return string

def string_contem(string, substr):
    string = string.lower()
    substr = substr.lower()
    return substr in string

def gerar_codigo_aleatorio(tamanho):
    caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    codigo = ''
    for _ in range(tamanho):
        codigo += random.choice(caracteres)
    return codigo

def limitar_string(string, limite):
    if len(string) > limite:
        return string[:limite] + '...'
    return string

def formatar_data(data, formato_origem, formato_destino):
    try:
        data_obj = datetime.strptime(data, formato_origem)
        return data_obj.strftime(formato_destino)
    except ValueError:
        return False

def gerar_hash_senha(senha):
    salt = 'gerar_uma_string_aleatoria_aqui' # Substitua por uma string aleatória e única
    return hashlib.sha256((senha + salt).encode()).hexdigest()

def string_comeca_com(string, substr):
    return string.startswith(substr)

def camel_case_para_snake_case(string):
    string = re.sub(r'(?<!^)(?=[A-Z])', '_', string)
    return string.lower()