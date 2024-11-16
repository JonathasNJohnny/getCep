const getACep = () => {
  const myInput = document.querySelector("input").value;
  const resultElement = document.getElementById("result");

  if (!/^\d{8}$/.test(myInput)) {
    resultElement.innerHTML = `<strong>Resultado:</strong> <br> Digite um CEP válido`;
    return;
  }

  fetch(`https://viacep.com.br/ws/${myInput}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        resultElement.innerHTML = `<strong>Resultado:</strong> <br> CEP não encontrado`;
        return;
      }
      resultElement.innerHTML = `
                    <strong>Resultado:</strong> <br>
                    CEP: ${data.cep} <br>
                    Logradouro: ${data.logradouro || "Não disponível"} <br>
                    Complemento: ${data.complemento || "Não disponível"} <br>
                    Bairro: ${data.bairro || "Não disponível"} <br>
                    Localidade: ${data.localidade} <br>
                    UF: ${data.uf} <br>
                    Estado: ${data.estado || "Não disponível"} <br>
                    IBGE: ${data.ibge} <br>
                    DDD: ${data.ddd} <br>
                    SIAFI: ${data.siafi}
                `;
    })
    .catch((error) => {
      console.log(error);
      resultElement.innerHTML = `<strong>Resultado:</strong> <br> Não foi possível buscar o CEP`;
    });
};
