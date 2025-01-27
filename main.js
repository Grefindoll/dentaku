
//ここに自分で書いていくよ。頑張る

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// 電卓の状態を管理する変数
let currentNumber = '0';    // 現在表示されている数字（文字列で管理）
let firstNumber = null;     // 計算の最初に保存される数値
let operator = null;        // 演算子（+、-、×、÷）

//現在の数字をディスプレイに表示
function updateDisplay() {
  display.value = currentNumber;
}





//ここから関数書いていく

function clear() {
  // 電卓のすべての状態をリセット
  currentNumber = '0';
  firstNumber = null;
  operator = null;
}


function calculateResult(a, b, op) {
  // 各演算子に応じて計算を実行
  switch (op) {
    case '+': return a + b; // 足し算
    case '-': return a - b; // 引き算
    case '×': return a * b; // 掛け算
    case '÷': return a / b; // 割り算
    default: return b;      // 演算子が無効の場合、現在の数字をそのまま返す
  }
}


function calculate() {
  //計算して答えを出す
  if (operator && currentNumber !== '') {
    currentNumber = String(calculateResult(firstNumber, parseFloat(currentNumber), operator));

    operator = null;
    firstNumber = null;
  }
}




function setOperator(operatorSymbol) {
  //演算子処理
  if (firstNumber === null) {
    firstNumber = parseFloat(currentNumber);
  } else if (operator) {
    //もし演算子が入力されたなら
    firstNumber = calculateResult(firstNumber, parseFloat(currentNumber), operator)
  }
  //次に使用する演算子を保存
  operator = operatorSymbol;
  //次の数字入力を待つために表示をリセット
  currentNumber = '';
}



function inputNumber(number) {
  //小数点が押された時
  if (number === '.' && currentNumber.includes('.')){
    return;
  }
  //最初に00ボタンが押された時
  if (currentNumber === '0' && number === '00') {
    return;
  }
  //先頭が0 で数字が押された時
  if(currentNumber === '0' && number !== '.') {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
}









//以下が全ての関数を駆使して実装される機能

//ボタンを押した時の挙動
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    if (buttonText === 'C') {
      clear();  

    } else if (buttonText === '=') {
      calculate();  

    } else if ( ['+', '-', '×', '÷'].includes(buttonText) ) {
      setOperator(buttonText);  

    } else  {//数字や小数点が押された時
      inputNumber(buttonText);  
    }

    updateDisplay();
  });
});

