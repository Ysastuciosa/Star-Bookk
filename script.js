const btnEnviar = document.getElementById('btnEnviar');
const textoDesabafo = document.getElementById('textoDesabafo');
const listaDesabafos = document.getElementById('listaDesabafos');
    function carregarDesabafos(){ const desabafos = JSON.parse(localStorage.getItem('desabafos')) || [];

    listaDesabafos.innerHTML = '';
        desabafos.forEach(function(texto) { const div = document.createElement('div'); 
        div.classList.add('desabafo');
        div.textContent = texto; 
        listaDesabafos.appendChild(div); });
    } 
    
    function salvarDesabafo(){ const texto = textoDesabafo.value;
        if(texto.trim() === '') return; 
        const desabafos = JSON.parse(localStorage.getItem('desabafos')) || [];
        desabafos.push(texto);
        localStorage.setItem('desabafos', JSON.stringify(desabafos));
        textoDesabafo.value = '';
        carregarDesabafos();
} 
    btnEnviar.addEventListener('click', salvarDesabafo); 