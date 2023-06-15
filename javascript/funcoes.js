  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2;
  }

  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(.)\1+$/.test(cnpj)) {
      return false;
    }
    let sum = 0;
    let weight = 2;
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    sum = 0;
    weight = 2;
    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cnpj.charAt(12)) === digit1 && parseInt(cnpj.charAt(13)) === digit2;
  }

  function pontuarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) {
      return cpf; // Retorna o CPF original sem pontuação
    }
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  function pontuarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) {
      return cnpj; // Retorna o CNPJ original sem pontuação
    }
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  function isInteger(str) {
    return /^\d+$/.test(str);
  }

  function slugify(str) {
    return str.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function removerAcentos(str) {
    str = str.toLowerCase();
    str = str.replace(/[áàãâä]/g, 'a');
    str = str.replace(/[éèêë]/g, 'e');
    str = str.replace(/[íìîï]/g, 'i');
    str = str.replace(/[óòõôö]/g, 'o');
    str = str.replace(/[úùûü]/g, 'u');
    str = str.replace(/[ç]/g, 'c');
    return str;
  }

  function stringContem(str, substr) {
    str = str.toLowerCase();
    substr = substr.toLowerCase();
    return str.includes(substr);
  }

  function gerarCodigoAleatorio(tamanho) {
    const caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo = '';
    for (let i = 0; i < tamanho; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  }

  function limitarString(str, limite) {
    if (str.length > limite) {
      str = str.substring(0, limite) + '...';
    }
    return str;
  }

  function formatarData(data, formatoOrigem, formatoDestino) {
    const dataObj = new Date(data);
    if (!isNaN(dataObj.getTime())) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const dataFormatada = dataObj.toLocaleDateString('en-US', options).replace(/\//g, '-');
      const partes = dataFormatada.split('-');
      const ano = partes[0];
      const mes = partes[1];
      const dia = partes[2];
      return formatoDestino.replace('Y', ano).replace('m', mes).replace('d', dia);
    }
    return false;
  }

  function gerarHashSenha(senha) {
    const salt = 'gerar_uma_string_aleatoria_aqui'; // Substitua por uma string aleatória e única
    return btoa(senha + salt);
  }

  function stringComecaCom(str, substr) {
    return str.startsWith(substr);
  }

  function camelCaseParaSnakeCase(str) {
    str = str.replace(/([A-Z])/g, '_$1');
    return str.toLowerCase().replace(/^_/, '');
  }

