let listaDeNumerosSorteados = [];
let numeroLimite =10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemTela(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemTela();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (numeroSecreto==chute){
        exibirTextoNaTela('h1', 'Parabéns');
        let mensagemCorreta = tentativas> 1? 'tentativas' : 'tentativa';
        let mensagenTentativa = `você descobriu o número secreto: ${numeroSecreto} com ${tentativas} ${mensagemCorreta}`;
        exibirTextoNaTela('p', mensagenTentativa);

        document.getElementById('reiniciar').removeAttribute('disabled')
    }
    else{
        if(chute>numeroSecreto){
            exibirTextoNaTela('h1', 'Você errou!');
            exibirTextoNaTela('p', `O número secreto é menor do que ${chute}`);
        }
        else{
            exibirTextoNaTela('h1', 'Você errou!');
            exibirTextoNaTela('p', `O número secreto é maior do que ${chute}`);
        }
        tentativas++
        limparCampo();
    }
   
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista==numeroLimite){
        listaDeNumerosSorteados = [];
    }

   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
   }
   else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
   }
} 

function limparCampo(){
    chute = document.querySelector('input') ;
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemTela();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}