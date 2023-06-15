  function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    return parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2;
  }

  function validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    let soma = 0;
    let multiplicador = 5;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 2 ? 9 : multiplicador - 1;
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    multiplicador = 6;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 2 ? 9 : multiplicador - 1;
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    return parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2;
  }

  function validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function pontuarCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return cpf;
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  function pontuarCNPJ(cnpj: string): string {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) {
      return cnpj;
    }

    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  function isInteger(str: string): boolean {
    return /^\d+$/.test(str);
  }

  function isDecimal(str: string): boolean {
    return /^\d+\.\d+$/.test(str);
  }

  function slugify(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function removerAcentos(str: string): string {
    return str
      .toLowerCase()
      .replace(/[áàãâä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòõôö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/ç/g, 'c');
  }

  function stringContem(str: string, substr: string): boolean {
    str = str.toLowerCase();
    substr = substr.toLowerCase();
    return str.includes(substr);
  }

  function gerarCodigoAleatorio(tamanho: number): string {
    const caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo = '';
    for (let i = 0; i < tamanho; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  }

  function limitarString(str: string, limite: number): string {
    if (str.length > limite) {
      return str.substring(0, limite) + '...';
    }
    return str;
  }

  function formatarData(data: string, formatoOrigem: string, formatoDestino: string): string {
    const dataObj = new Date(data);
    if (!isNaN(dataObj.getTime())) {
      return dataObj.toLocaleDateString(formatoDestino);
    }
    return '';
  }

  function stringComecaCom(str: string, substr: string): boolean {
    return str.startsWith(substr);
  }

  function camelCaseParaSnakeCase(str: string): string {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  }