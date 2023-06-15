using System;
using System.Linq;
using System.Text.RegularExpressions;

public static class Utils
{
    public static bool ValidarCPF(string cpf)
    {
        cpf = Regex.Replace(cpf, @"\D", "");

        if (cpf.Length != 11 || Regex.IsMatch(cpf, @"^(\d)\1+$"))
        {
            return false;
        }

        int[] multiplicadoresDigito1 = Enumerable.Range(10, 2).ToArray();
        int[] multiplicadoresDigito2 = Enumerable.Range(11, 2).ToArray();

        int soma = cpf
            .Take(9)
            .Select((digit, index) => int.Parse(digit.ToString()) * multiplicadoresDigito1[index])
            .Sum();

        int digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        soma = cpf
            .Take(10)
            .Select((digit, index) => int.Parse(digit.ToString()) * multiplicadoresDigito2[index])
            .Sum();

        int digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        return int.Parse(cpf[9].ToString()) == digito1 && int.Parse(cpf[10].ToString()) == digito2;
    }

    public static bool ValidarCNPJ(string cnpj)
    {
        cnpj = Regex.Replace(cnpj, @"\D", "");

        if (cnpj.Length != 14 || Regex.IsMatch(cnpj, @"^(\d)\1+$"))
        {
            return false;
        }

        int[] multiplicadoresDigito1 = Enumerable.Range(5, 8).ToArray();
        int[] multiplicadoresDigito2 = Enumerable.Range(6, 9).ToArray();

        int soma = cnpj
            .Take(12)
            .Select((digit, index) => int.Parse(digit.ToString()) * multiplicadoresDigito1[index])
            .Sum();

        int digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        soma = cnpj
            .Take(13)
            .Select((digit, index) => int.Parse(digit.ToString()) * multiplicadoresDigito2[index])
            .Sum();

        int digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        return int.Parse(cnpj[12].ToString()) == digito1 && int.Parse(cnpj[13].ToString()) == digito2;
    }

    public static bool ValidarEmail(string email)
    {
        return Regex.IsMatch(email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$");
    }

    public static string PontuarCPF(string cpf)
    {
        cpf = Regex.Replace(cpf, @"\D", "");

        if (cpf.Length != 11)
        {
            return cpf;
        }

        return $"{cpf.Substring(0, 3)}.{cpf.Substring(3, 3)}.{cpf.Substring(6, 3)}-{cpf.Substring(9)}";
    }

    public static string PontuarCNPJ(string cnpj)
    {
        cnpj = Regex.Replace(cnpj, @"\D", "");

        if (cnpj.Length != 14)
        {
            return cnpj;
        }

        return $"{cnpj.Substring(0, 2)}.{cnpj.Substring(2, 3)}.{cnpj.Substring(5, 3)}/{cnpj.Substring(8, 4)}-{cnpj.Substring(12)}";
    }

    public static bool IsInteger(string str)
    {
        return int.TryParse(str, out _);
    }

    public static bool IsDecimal(string str)
    {
        return decimal.TryParse(str, out _);
    }

    public static string Slugify(string str)
    {
        str = str.ToLower();
        str = Regex.Replace(str, @"[^a-z0-9]+", "-");
        str = str.Trim('-');
        str = Regex.Replace(str, @"-+", "-");
        return str;
    }

    public static string RemoverAcentos(string str)
    {
        string[] comAcento = { "á", "à", "ã", "â", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "õ", "ô", "ö", "ú", "ù", "û", "ü", "ç" };
        string[] semAcento = { "a", "a", "a", "a", "a", "e", "e", "e", "e", "i", "i", "i", "i", "o", "o", "o", "o", "o", "u", "u", "u", "u", "c" };

        for (int i = 0; i < comAcento.Length; i++)
        {
            str = str.Replace(comAcento[i], semAcento[i]);
        }

        return str;
    }

    public static bool StringContem(string str, string substr)
    {
        str = str.ToLower();
        substr = substr.ToLower();
        return str.Contains(substr);
    }

    public static string GerarCodigoAleatorio(int tamanho)
    {
        string caracteres = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random random = new Random();
        return new string(Enumerable.Repeat(caracteres, tamanho)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }

    public static string LimitarString(string str, int limite)
    {
        if (str.Length > limite)
        {
            return str.Substring(0, limite) + "...";
        }
        return str;
    }

    public static string FormatarData(string data, string formatoOrigem, string formatoDestino)
    {
        if (DateTime.TryParseExact(data, formatoOrigem, null, System.Globalization.DateTimeStyles.None, out DateTime dataObj))
        {
            return dataObj.ToString(formatoDestino);
        }
        return null;
    }

    public static string GerarHashSenha(string senha)
    {
        string salt = "gerar_uma_string_aleatoria_aqui"; // Substitua por uma string aleatória e única
        return BCrypt.Net.BCrypt.HashPassword(senha + salt);
    }

    public static bool StringComecaCom(string str, string substr)
    {
        return str.StartsWith(substr);
    }

    public static string CamelCaseParaSnakeCase(string str)
    {
        str = Regex.Replace(str, @"(\p{Ll})(\p{Lu})", "$1_$2");
        return str.ToLower();
    }
}
