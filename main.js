let comidas = [];
let refeicoes = [];

onload = () => {
  const c = JSON.parse(localStorage.getItem('comidas'));
  if (c) comidas = c;
  mostraComidas();

  const r = JSON.parse(localStorage.getItem('refeicoes'));
  if (r) refeicoes = r;
  mostraRefeicoes();
};

const ativa = (comp) => {
  console.log(document.querySelectorAll('.component'))
  let listaDeTelas = document.querySelectorAll('.component');
  listaDeTelas.forEach((c) => {console.log(c);
    c.classList.add('hidden')});
    console.log('entra')
  document.querySelector('#' + comp).classList.remove('hidden');
};

// COMIDAS
const mostraComidas = () => {
  const listaComidas = document.querySelector('#listaComidas');
  listaComidas.innerHTML = '';

  comidas.forEach((c) => {
    let elemComida = document.createElement('li');
    elemComida.innerHTML = 'Comida: ' +c.comida+ '; Quantidade: '+c.qtd+ '; Carboidrato: '+c.carboidrato+ 'grs; Proteina: '+c.proteina+ 'grs; Gordura: '+c.gordura+ 'grs';
    elemComida.setAttribute('data-id', c.id);

    elemComida.onclick = () => {
      ativa('tela4');
      document.querySelector('#edit_comida').value = c.comida,
      document.querySelector('#edit_qtd').value = c.qtd,
      document.querySelector('#edit_carboidrato').value = c.carboidrato,
      document.querySelector('#edit_proteina').value = c.proteina,
      document.querySelector('#edit_gordura').value = c.gordura,
      document.querySelector('#id_comida').value = c.id
    };    
    listaComidas.appendChild(elemComida);
  });

  if (comidas.length > 0) {
    listaComidas.classList.remove('hidden');
  } else {
    listaComidas.classList.add('hidden');
  }
};

const adicionaComida = () => {  
    comidas.push({
      id: Math.random().toString().replace('0.', ''),
      comida: document.querySelector('#comida').value,
      qtd: document.querySelector('#qtd').value,
      carboidrato: document.querySelector('#carboidrato').value,
      proteina: document.querySelector('#proteina').value,
      gordura: document.querySelector('#gordura').value,
    });
    ativa('tela2');
    salvaComidas();
    mostraComidas();
};

const salvaComidas = () => {
  localStorage.setItem('comidas', JSON.stringify(comidas));
};


const editarComida = () => {
  let id = document.querySelector('#id_comida').value;
  let i = comidas.findIndex((c) => c.id == id);

  comidas[i].comida = document.querySelector('#edit_comida').value,
  comidas[i].qtd = document.querySelector('#edit_qtd').value,
  comidas[i].carboidrato = document.querySelector('#edit_carboidrato').value,
  comidas[i].proteina = document.querySelector('#edit_proteina').value,
  comidas[i].gordura = document.querySelector('#edit_gordura').value,

  ativa('tela2');
  salvaComidas();
  mostraComidas();
};

const apagarComida = () => {
  let id = document.querySelector('#id_comida').value;
  comidas = comidas.filter((c) => c.id != id);
  ativa('tela2');
  salvaComidas();
  mostraComidas();
};
//FIM COMIDAS

// Refeicoes
const mostraRefeicoes = () => {
  const listaRefeicoes = document.querySelector('#listaRefeicoes');
  listaRefeicoes.innerHTML = '';

  refeicoes.forEach((r) => {
    let elemRefeicao = document.createElement('li');
    elemRefeicao.innerHTML = 'Horario: ' +r.horario+ '; Comida: '+r.comida+ '; Quantidade: '+r.qtd+ ';';

    elemRefeicao.onclick = () => {
      ativa('tela6');
      document.querySelector('#horario_edit_refeicao').value = r.horario,
      document.querySelector('#comida_edit_refeicao').value = r.comida,
      document.querySelector('#qtd_edit_refeicao').value = r.qtd,
      document.querySelector('#id_refeicao').value = r.id
    };    
    listaRefeicoes.appendChild(elemRefeicao);
  });

  if (refeicoes.length > 0) {
    listaRefeicoes.classList.remove('hidden');
  } else {
    listaRefeicoes.classList.add('hidden');
  }
};

const adicionarRefeicao = () => {  
    refeicoes.push({
      id: Math.random().toString().replace('0.', ''),
      horario: document.querySelector('#horario').value,
      comida: document.querySelector('#comida_refeicao').value,
      qtd: document.querySelector('#qtd_refeicao').value,
    });
    ativa('tela1');
    salvaRefeicoes();
    mostraRefeicoes();
};

const salvaRefeicoes = () => {
  localStorage.setItem('refeicoes', JSON.stringify(refeicoes));
};


const editarRefeicao = () => {
  let id = document.querySelector('#id_refeicao').value;
  let i = refeicoes.findIndex((r) => r.id == id);

  refeicoes[i].horario = document.querySelector('#horario_edit_refeicao').value,
  refeicoes[i].comida = document.querySelector('#comida_edit_refeicao').value,
  refeicoes[i].qtd = document.querySelector('#qtd_edit_refeicao').value,
  ativa('tela1');
  salvaRefeicoes();
  mostraRefeicoes();
};

const apagarRefeicao = () => {
  let id = document.querySelector('#id_refeicao').value;
  refeicoes = refeicoes.filter((r) => r.id != id);
  ativa('tela1');
  salvaRefeicoes();
  mostraRefeicoes();
};
//FIM COMIDAS



navigator.serviceWorker.register('./fitapp-sw.js');