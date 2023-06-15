<?php

    function validarCPF($cpf) {
        // Remove caracteres não numéricos
        $cpf = preg_replace('/\D/', '', $cpf);

        // Verifica se o CPF tem 11 dígitos
        if (strlen($cpf) !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        if (preg_match('/^(\d)\1+$/', $cpf)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        $soma = 0;
        for ($i = 0; $i < 9; $i++) {
            $soma += ($cpf[$i] * (10 - $i));
        }
        $resto = $soma % 11;
        $digito1 = ($resto < 2) ? 0 : (11 - $resto);

        // Calcula o segundo dígito verificador
        $soma = 0;
        for ($i = 0; $i < 10; $i++) {
            $soma += ($cpf[$i] * (11 - $i));
        }
        $resto = $soma % 11;
        $digito2 = ($resto < 2) ? 0 : (11 - $resto);

        // Verifica se os dígitos verificadores estão corretos
        if ($cpf[9] != $digito1 || $cpf[10] != $digito2) {
            return false;
        }

        return true;
    }

    function validarCNPJ($cnpj) {
        // Remove caracteres não numéricos
        $cnpj = preg_replace('/\D/', '', $cnpj);

        // Verifica se o CNPJ tem 14 dígitos
        if (strlen($cnpj) !== 14) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        if (preg_match('/^(\d)\1+$/', $cnpj)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        $soma = 0;
        $multiplicador = 5;
        for ($i = 0; $i < 12; $i++) {
            $soma += ($cnpj[$i] * $multiplicador);
            $multiplicador = ($multiplicador == 2) ? 9 : ($multiplicador - 1);
        }
        $resto = $soma % 11;
        $digito1 = ($resto < 2) ? 0 : (11 - $resto);

        // Calcula o segundo dígito verificador
        $soma = 0;
        $multiplicador = 6;
        for ($i = 0; $i < 13; $i++) {
            $soma += ($cnpj[$i] * $multiplicador);
            $multiplicador = ($multiplicador == 2) ? 9 : ($multiplicador - 1);
        }
        $resto = $soma % 11;
        $digito2 = ($resto < 2) ? 0 : (11 - $resto);

        // Verifica se os dígitos verificadores estão corretos
        if ($cnpj[12] != $digito1 || $cnpj[13] != $digito2) {
            return false;
        }

        return true;
    }

    function validarEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }


    function pontuarCPF($cpf) {
        // Remove caracteres não numéricos
        $cpf = preg_replace('/\D/', '', $cpf);

        // Verifica se o CPF tem 11 dígitos
        if (strlen($cpf) !== 11) {
            return $cpf; // Retorna o CPF original sem pontuação
        }

        // Insere a pontuação no CPF (formato: xxx.xxx.xxx-xx)
        return substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9);
    }

    function pontuarCNPJ($cnpj) {
        // Remove caracteres não numéricos
        $cnpj = preg_replace('/\D/', '', $cnpj);

        // Verifica se o CNPJ tem 14 dígitos
        if (strlen($cnpj) !== 14) {
            return $cnpj; // Retorna o CNPJ original sem pontuação
        }

        // Insere a pontuação no CNPJ (formato: xx.xxx.xxx/xxxx-xx)
        return substr($cnpj, 0, 2) . '.' . substr($cnpj, 2, 3) . '.' . substr($cnpj, 5, 3) . '/' . substr($cnpj, 8, 4) . '-' . substr($cnpj, 12);
    }

    function isInteger($str) {
        return ctype_digit(strval($str));
    }

    function isDecimal($str) {
        return is_numeric($str) && strpos($str, '.') !== false;
    }

    function slugify($str) {
        $str = mb_strtolower($str, 'UTF-8');
        $str = preg_replace('/[^a-z0-9]+/', '-', $str);
        $str = trim($str, '-');
        $str = preg_replace('/-+/', '-', $str);
        return $str;
    }

    function removerAcentos($str) {
        $str = mb_strtolower($str, 'UTF-8');
        $str = str_replace(
            ['á', 'à', 'ã', 'â', 'ä', 'é', 'è', 'ê', 'ë', 'í', 'ì', 'î', 'ï', 'ó', 'ò', 'õ', 'ô', 'ö', 'ú', 'ù', 'û', 'ü', 'ç'],
            ['a', 'a', 'a', 'a', 'a', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'c'],
            $str
        );
        return $str;
    }

    function stringContem($str, $substr) {
        $str = mb_strtolower($str, 'UTF-8');
        $substr = mb_strtolower($substr, 'UTF-8');
        return strpos($str, $substr) !== false;
    }

    function gerarCodigoAleatorio($tamanho) {
        $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $codigo = '';
        $caracteres_length = strlen($caracteres);
        for ($i = 0; $i < $tamanho; $i++) {
            $codigo .= $caracteres[rand(0, $caracteres_length - 1)];
        }
        return $codigo;
    }

    function limitarString($str, $limite) {
        if (mb_strlen($str, 'UTF-8') > $limite) {
            $str = mb_substr($str, 0, $limite, 'UTF-8') . '...';
        }
        return $str;
    }

    function formatarData($data, $formatoOrigem, $formatoDestino) {
        $dataObj = DateTime::createFromFormat($formatoOrigem, $data);
        if ($dataObj) {
            return $dataObj->format($formatoDestino);
        }
        return false;
    }

    function gerarHashSenha($senha) {
        $salt = 'gerar_uma_string_aleatoria_aqui'; // Substitua por uma string aleatória e única
        return password_hash($senha . $salt, PASSWORD_DEFAULT);
    }

    function stringComecaCom($str, $substr) {
        return strncmp($str, $substr, strlen($substr)) === 0;
    }

    function camelCaseParaSnakeCase($str) {
        $str = preg_replace('/([A-Z])/', '_$1', $str);
        return strtolower(ltrim($str, '_'));
    }
