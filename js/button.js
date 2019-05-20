function adder() {
  var totalResult = document.getElementById('totalResult');
  var num1 = Number(document.getElementById('num1').value);
  var num2 = Number(document.getElementById('num2').value);
  totalResult.textContent = num1 + num2;
}
