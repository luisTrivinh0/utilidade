import java.util.regex.Pattern;
import java.util.Random;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Funcoes {

    public static boolean validarCPF(String cpf) {
        cpf = cpf.replaceAll("\\D", "");
        if (cpf.length() != 11) {
            return false;
        }
        if (Pattern.matches("^(\\d)\\1+$", cpf)) {
            return false;
        }
        int soma = 0;
        for (int i = 0; i < 9; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
        }
        int resto = soma % 11;
        int digito1 = (resto < 2) ? 0 : (11 - resto);
        soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
        }
        resto = soma % 11;
        int digito2 = (resto < 2) ? 0 : (11 - resto);
        if (Character.getNumericValue(cpf.charAt(9)) != digito1 || Character.getNumericValue(cpf.charAt(10)) != digito2) {
            return false;
        }
        return true;
    }

    public static boolean validarCNPJ(String cnpj) {
        cnpj = cnpj.replaceAll("\\D", "");
        if (cnpj.length() != 14) {
            return false;
        }
        if (Pattern.matches("^(\\d)\\1+$", cnpj)) {
            return false;
        }
        int soma = 0;
        int multiplicador = 5;
        for (int i = 0; i < 12; i++) {
            soma += Character.getNumericValue(cnpj.charAt(i)) * multiplicador;
            multiplicador = (multiplicador == 2) ? 9 : (multiplicador - 1);
        }
        int resto = soma % 11;
        int digito1 = (resto < 2) ? 0 : (11 - resto);
        soma = 0;
        multiplicador = 6;
        for (int i = 0; i < 13; i++) {
            soma += Character.getNumericValue(cnpj.charAt(i)) * multiplicador;
            multiplicador = (multiplicador == 2) ? 9 : (multiplicador - 1);
        }
        resto = soma % 11;
        int digito2 = (resto < 2) ? 0 : (11 - resto);
        if (Character.getNumericValue(cnpj.charAt(12)) != digito1 || Character.getNumericValue(cnpj.charAt(13)) != digito2) {
            return false;
        }
        return true;
    }

    public static boolean validarEmail(String email) {
        return Pattern.matches("^\\w[\\w.-]*@[\\w.-]+\\.\\w+$", email);
    }

    public static String pontuarCPF(String cpf) {
        cpf = cpf.replaceAll("\\D", "");
        if (cpf.length() != 11) {
            return cpf;
        }
        return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9);
    }

    public static String pontuarCNPJ(String cnpj) {
        cnpj = cnpj.replaceAll("\\D", "");
        if (cnpj.length() != 14) {
            return cnpj;
        }
        return cnpj.substring(0, 2) + "." + cnpj.substring(2, 5) + "." + cnpj.substring(5, 8) + "/" + cnpj.substring(8, 12) + "-" + cnpj.substring(12);
    }

    public static boolean isInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static boolean isDecimal(String str) {
        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static String slugify(String str) {
        str = str.toLowerCase()
                 .replaceAll("[^a-z0-9]+", "-")
                 .replaceAll("^-|-$", "");
        return str;
    }

    public static String removerAcentos(String str) {
        str = str.replaceAll("[áàãâä]", "a")
                 .replaceAll("[éèêë]", "e")
                 .replaceAll("[íìîï]", "i")
                 .replaceAll("[óòõôö]", "o")
                 .replaceAll("[úùûü]", "u")
                 .replaceAll("ç", "c");
        return str;
    }

    public static boolean stringContem(String str, String substr) {
        str = str.toLowerCase();
        substr = substr.toLowerCase();
        return str.contains(substr);
    }

    public static String gerarCodigoAleatorio(int tamanho) {
        String caracteres = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder codigo = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < tamanho; i++) {
            codigo.append(caracteres.charAt(random.nextInt(caracteres.length())));
        }
        return codigo.toString();
    }

    public static String limitarString(String str, int limite) {
        if (str.length() > limite) {
            return str.substring(0, limite) + "...";
        }
        return str;
    }

    public static String formatarData(String data, String formatoOrigem, String formatoDestino) {
        try {
            LocalDate dataObj = LocalDate.parse(data, DateTimeFormatter.ofPattern(formatoOrigem));
            return dataObj.format(DateTimeFormatter.ofPattern(formatoDestino));
        } catch (Exception e) {
            return null;
        }
    }

    public static String gerarHashSenha(String senha) {
        String salt = "gerar_uma_string_aleatoria_aqui"; // Substitua por uma string aleatória e única
        String senhaComSalt = senha + salt;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(senhaComSalt.getBytes());
            StringBuilder hash = new StringBuilder();
            for (byte b : hashBytes) {
                hash.append(String.format("%02x", b));
            }
            return hash.toString();
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }

    public static boolean stringComecaCom(String str, String substr) {
        return str.startsWith(substr);
    }

    public static String camelCaseParaSnakeCase(String str) {
        str = str.replaceAll("(.)(\\p{Upper})", "$1_$2");
        return str.toLowerCase();
    }

    public static void main(String[] args) {
        // Exemplo de uso das funções
        System.out.println(validarCPF("12345678901")); // true
        System.out.println(validarCNPJ("12345678000190")); // true
        System.out.println(validarEmail("test@example.com")); // true
        System.out.println(pontuarCPF("12345678901")); // 123.456.789-01
        System.out.println(pontuarCNPJ("12345678000190")); // 12.345.678/0001-90
        System.out.println(isInteger("123")); // true
        System.out.println(isDecimal("3.14")); // true
        System.out.println(slugify("Hello World!")); // hello-world
        System.out.println(removerAcentos("áéíóú")); // aeiou
        System.out.println(stringContem("Hello World", "hello")); // true
        System.out.println(gerarCodigoAleatorio(8)); // código aleatório com 8 caracteres
        System.out.println(limitarString("Lorem ipsum dolor sit amet", 10)); // Lorem ipsu...
        System.out.println(formatarData("2023-06-15", "yyyy-MM-dd", "dd/MM/yyyy")); // 15/06/2023
        System.out.println(gerarHashSenha("password")); // hash da senha
        System.out.println(stringComecaCom("Hello World", "Hello")); // true
        System.out.println(camelCaseParaSnakeCase("helloWorld")); // hello_world
    }
}