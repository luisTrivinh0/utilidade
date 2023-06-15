def validar_cpf(cpf)
    # Remove caracteres não numéricos
    cpf = cpf.gsub(/\D/, '')

    # Verifica se o CPF tem 11 dígitos
    return false unless cpf.length == 11

    # Verifica se todos os dígitos são iguais
    return false if cpf.chars.uniq.size == 1

    # Calcula o primeiro dígito verificador
    soma = 0
    multiplicador = 10
    9.times do |i|
      soma += cpf[i].to_i * multiplicador
      multiplicador -= 1
    end
    digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    # Calcula o segundo dígito verificador
    soma = 0
    multiplicador = 11
    10.times do |i|
      soma += cpf[i].to_i * multiplicador
      multiplicador -= 1
    end
    digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    # Verifica se os dígitos verificadores estão corretos
    cpf[9..10] == "#{digito1}#{digito2}"
  end

  def validar_cnpj(cnpj)
    # Remove caracteres não numéricos
    cnpj = cnpj.gsub(/\D/, '')

    # Verifica se o CNPJ tem 14 dígitos
    return false unless cnpj.length == 14

    # Verifica se todos os dígitos são iguais
    return false if cnpj.chars.uniq.size == 1

    # Calcula o primeiro dígito verificador
    soma = 0
    multiplicador = 5
    12.times do |i|
      soma += cnpj[i].to_i * multiplicador
      multiplicador = multiplicador == 2 ? 9 : multiplicador - 1
    end
    digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    # Calcula o segundo dígito verificador
    soma = 0
    multiplicador = 6
    13.times do |i|
      soma += cnpj[i].to_i * multiplicador
      multiplicador = multiplicador == 2 ? 9 : multiplicador - 1
    end
    digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    # Verifica se os dígitos verificadores estão corretos
    cnpj[12..13] == "#{digito1}#{digito2}"
  end

  def validar_email(email)
    email.match?(/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i)
  end

  def pontuar_cpf(cpf)
    # Remove caracteres não numéricos
    cpf = cpf.gsub(/\D/, '')

    # Verifica se o CPF tem 11 dígitos
    return cpf unless cpf.length == 11

    # Insere a pontuação no CPF (formato: xxx.xxx.xxx-xx)
    "#{cpf[0..2]}.#{cpf[3..5]}.#{cpf[6..8]}-#{cpf[9..10]}"
  end

  def pontuar_cnpj(cnpj)
    # Remove caracteres não numéricos
    cnpj = cnpj.gsub(/\D/, '')

    # Verifica se o CNPJ tem 14 dígitos
    return cnpj unless cnpj.length == 14

    # Insere a pontuação no CNPJ (formato: xx.xxx.xxx/xxxx-xx)
    "#{cnpj[0..1]}.#{cnpj[2..4]}.#{cnpj[5..7]}/#{cnpj[8..11]}-#{cnpj[12..13]}"
  end

  def is_integer(str)
    /\A\d+\z/ === str
  end

  def is_decimal(str)
    /\A\d+\.\d+\z/ === str
  end

  def slugify(str)
    str.downcase.gsub(/[^a-z0-9]+/, '-').gsub(/-+$/, '').gsub(/^-+/, '')
  end

  def remover_acentos(str)
    str.downcase.gsub(/á|à|ã|â|ä/, 'a')
               .gsub(/é|è|ê|ë/, 'e')
               .gsub(/í|ì|î|ï/, 'i')
               .gsub(/ó|ò|õ|ô|ö/, 'o')
               .gsub(/ú|ù|û|ü/, 'u')
               .gsub(/ç/, 'c')
  end

  def string_contem(str, substr)
    str.downcase.include?(substr.downcase)
  end

  def gerar_codigo_aleatorio(tamanho)
    caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    codigo = ''
    tamanho.times do
      codigo += caracteres[rand(caracteres.length)]
    end
    codigo
  end

  def limitar_string(str, limite)
    return str unless str.length > limite

    str[0..limite-1] + '...'
  end

  def formatar_data(data, formato_origem, formato_destino)
    data_obj = Date.strptime(data, formato_origem)
    data_obj.strftime(formato_destino)
  end

  def gerar_hash_senha(senha)
    salt = 'gerar_uma_string_aleatoria_aqui' # Substitua por uma string aleatória e única
    Digest::SHA256.hexdigest(senha + salt)
  end

  def string_comeca_com(str, substr)
    str.downcase.start_with?(substr.downcase)
  end

  def camel_case_para_snake_case(str)
    str.gsub(/([A-Z])/, '_\1').downcase.sub(/^_/, '')
  end
