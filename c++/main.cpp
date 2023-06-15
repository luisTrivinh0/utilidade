#include <iostream>
#include <string>
#include <regex>

using namespace std;

bool validarCPF(string cpf) {
    // Remove caracteres não numéricos
    cpf = regex_replace(cpf, regex("\\D"), "");

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length() != 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (regex_match(cpf, regex("^(\\d)\\1+$"))) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    int soma = 0;
    for (int i = 0; i < 9; i++) {
        soma += (cpf[i] - '0') * (10 - i);
    }
    int resto = soma % 11;
    int digito1 = (resto < 2) ? 0 : (11 - resto);

    // Calcula o segundo dígito verificador
    soma = 0;
    for (int i = 0; i < 10; i++) {
        soma += (cpf[i] - '0') * (11 - i);
    }
    resto = soma % 11;
    int digito2 = (resto < 2) ? 0 : (11 - resto);

    // Verifica se os dígitos verificadores estão corretos
    if ((cpf[9] - '0') != digito1 || (cpf[10] - '0') != digito2) {
        return false;
    }

    return true;
}

bool validarCNPJ(string cnpj) {
    // Remove caracteres não numéricos
    cnpj = regex_replace(cnpj, regex("\\D"), "");

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length() != 14) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (regex_match(cnpj, regex("^(\\d)\\1+$"))) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    int soma = 0;
    int multiplicador = 5;
    for (int i = 0; i < 12; i++) {
        soma += (cnpj[i] - '0') * multiplicador;
        multiplicador = (multiplicador == 2) ? 9 : (multiplicador - 1);
    }
    int resto = soma % 11;
    int digito1 = (resto < 2) ? 0 : (11 - resto);

    // Calcula o segundo dígito verificador
    soma = 0;
    multiplicador = 6;
    for (int i = 0; i < 13; i++) {
        soma += (cnpj[i] - '0') * multiplicador;
        multiplicador = (multiplicador == 2) ? 9 : (multiplicador - 1);
    }
    resto = soma % 11;
    int digito2 = (resto < 2) ? 0 : (11 - resto);

    // Verifica se os dígitos verificadores estão corretos
    if ((cnpj[12] - '0') != digito1 || (cnpj[13] - '0') != digito2) {
        return false;
    }

    return true;
}

string pontuarCPF(string cpf) {
    // Remove caracteres não numéricos
    cpf = regex_replace(cpf, regex("\\D"), "");

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length() != 11) {
        return cpf; // Retorna o CPF original sem pontuação
    }

    // Insere a pontuação no CPF (formato: xxx.xxx.xxx-xx)
    return cpf.substr(0, 3) + "." + cpf.substr(3, 3) + "." + cpf.substr(6, 3) + "-" + cpf.substr(9);
}

string pontuarCNPJ(string cnpj) {
    // Remove caracteres não numéricos
    cnpj = regex_replace(cnpj, regex("\\D"), "");

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length() != 14) {
        return cnpj; // Retorna o CNPJ original sem pontuação
    }

    // Insere a pontuação no CNPJ (formato: xx.xxx.xxx/xxxx-xx)
    return cnpj.substr(0, 2) + "." + cnpj.substr(2, 3) + "." + cnpj.substr(5, 3) + "/" + cnpj.substr(8, 4) + "-" + cnpj.substr(12);
}

bool isInteger(string str) {
    for (char c : str) {
        if (!isdigit(c)) {
            return false;
        }
    }
    return true;
}

bool isDecimal(string str) {
    bool foundDot = false;
    for (char c : str) {
        if (c == '.') {
            if (foundDot) {
                return false;
            }
            foundDot = true;
        } else if (!isdigit(c)) {
            return false;
        }
    }
    return foundDot;
}

string slugify(string str) {
    string slug;
    for (char c : str) {
        if (isalnum(c)) {
            slug += tolower(c);
        } else if (c == ' ') {
            slug += '-';
        }
    }
    return regex_replace(slug, regex("-+"), "-");
}

string removerAcentos(string str) {
    static const string accents = "ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÌÍÎÏìíîïÒÓÔÕÖØòóôõöøÙÚÛÜùúûüÝýÿÑñÇç";
    static const string noAccents = "AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOOooooooUUUUuuuuyyNnCc";

    for (int i = 0; i < accents.length(); i++) {
        str = regex_replace(str, regex(accents[i]), string(1, noAccents[i]));
    }

    return str;
}

bool stringContem(string str, string substr) {
    str = tolower(str);
    substr = tolower(substr);
    return str.find(substr) != string::npos;
}

string gerarCodigoAleatorio(int tamanho) {
    string caracteres = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string codigo;
    int caracteresLength = caracteres.length();
    for (int i = 0; i < tamanho; i++) {
        int randomIndex = rand() % caracteresLength;
        codigo += caracteres[randomIndex];
    }
    return codigo;
}

string limitarString(string str, int limite) {
    if (str.length() > limite) {
        str = str.substr(0, limite) + "...";
    }
    return str;
}

int main() {
    // Testando as funções
    string cpf = "12345678900";
    string cnpj = "12345678000190";
    string texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    string codigo = gerarCodigoAleatorio(8);

    cout << "CPF válido: " << (validarCPF(cpf) ? "Sim" : "Não") << endl;
    cout << "CNPJ válido: " << (validarCNPJ(cnpj) ? "Sim" : "Não") << endl;
    cout << "CPF formatado: " << pontuarCPF(cpf) << endl;
    cout << "CNPJ formatado: " << pontuarCNPJ(cnpj) << endl;
    cout << "É número inteiro: " << (isInteger(cpf) ? "Sim" : "Não") << endl;
    cout << "É número decimal: " << (isDecimal(cpf) ? "Sim" : "Não") << endl;
    cout << "Texto em formato slug: " << slugify(texto) << endl;
    cout << "Texto sem acentos: " << removerAcentos(texto) << endl;
    cout << "Texto contém 'ipsum': " << (stringContem(texto, "ipsum") ? "Sim" : "Não") << endl;
    cout << "Código aleatório: " << codigo << endl;
    cout << "Texto limitado: " << limitarString(texto, 10) << endl;

    return 0;
}