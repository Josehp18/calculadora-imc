function calcularIMC() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const resultado = document.getElementById('resultado');

  if (!peso || !altura || peso <= 0 || altura <= 0) {
    resultado.textContent = 'Por favor, ingresa valores válidos.';
    resultado.style.color = 'red';
    return;
  }

  const imc = peso / (altura * altura);
  let mensaje = '';

  if (imc < 18.5) {
    mensaje = 'Bajo peso';
    resultado.style.color = '#fbc02d';
  } else if (imc >= 18.5 && imc < 25) {
    mensaje = 'Peso normal';
    resultado.style.color = '#4caf50';
  } else if (imc >= 25 && imc < 30) {
    mensaje = 'Sobrepeso';
    resultado.style.color = '#ff9800';
  } else {
    mensaje = 'Obesidad';
    resultado.style.color = '#f44336';
  }

  resultado.textContent = `Tu IMC es ${imc.toFixed(2)} - ${mensaje}`;
  actualizarGrafica(imc);

  let historial = JSON.parse(localStorage.getItem('historialIMC')) || [];
  historial.push({ imc: imc.toFixed(2), fecha: new Date().toLocaleString() });
  localStorage.setItem('historialIMC', JSON.stringify(historial));
}

const ctx = document.getElementById('grafica').getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'IMC',
      data: [],
      borderColor: '#00796b',
      backgroundColor: '#b2dfdb',
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function actualizarGrafica(imc) {
  const fecha = new Date().toLocaleTimeString();
  chart.data.labels.push(fecha);
  chart.data.datasets[0].data.push(imc);
  chart.update();
}

window.onload = () => {
  let historial = JSON.parse(localStorage.getItem('historialIMC')) || [];
  historial.forEach(entry => {
    chart.data.labels.push(entry.fecha);
    chart.data.datasets[0].data.push(parseFloat(entry.imc));
  });
  chart.update();
};
