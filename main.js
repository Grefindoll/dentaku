
//ここに自分で書いていくよ。頑張る

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// 電卓の状態を管理する変数
let currentNumber = '0';    // 現在表示されている数字（文字列で管理）
let firstNumber = null;     // 計算の最初に保存される数値
let operator = null;        // 演算子（+、-、×、÷）
let newNumber = false;  //new    falseなら、今の数字を続けて入力するという意味。trueなら、演算子を押した直後。
let currentExpression = '';  //new  どんな計算をしているか文字で覚える


//現在の数字をディスプレイに表示
function updateDisplay() {
  if (newNumber) {
    display.value =  currentExpression;
  } else {
    display.value = currentExpression + currentNumber;
  }

}





//ここから関数書いていく

function clear() {
  // 電卓のすべての状態をリセット
  currentNumber = '0';
  firstNumber = null;
  operator = null;
  newNumber = false; //new 追加した。
  currentExpression = '';
  updateDisplay();

}


function calculateResult(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    default: return b;
  }
}

// 小数点以下の不要なゼロを削除
function formatNumber(num) {
  return num.toString().replace(/(\..*?[1-9])0+$/, '$1').replace(/\.$/, '');
}



//＝イコールが入力されたときに、計算して答えを出す
function calculate() {
  if (operator && firstNumber !== null) {
    const result = calculateResult(
      firstNumber, 
      parseFloat(currentNumber), 
      operator
    );

    if  (isNaN(result)) {
      currentNumber = 'Error';
    } else {
      currentNumber = formatNumber(result);
    }
    display.value = currentNumber;

    operator = null;
    firstNumber = null;
    newNumber = true;
    currentExpression = '';
  }
}



// '+', '-', '×', '÷'が入力された時
function setOperator(operatorSymbol) {
  if (currentNumber === 'Error') return;
  //演算子が連続して入力されたら、後に入力された演算子を上書き
  if (operator && newNumber) {
    currentExpression = currentExpression.replace(/[\+\-\×\÷]\s*$/, '');
    operator = operatorSymbol
    currentExpression += `${operatorSymbol} `;
    updateDisplay();
    return;
  }

  if (firstNumber === null) {
    firstNumber = parseFloat(currentNumber);
  } else if (operator) {
    //もし演算子が入力されたなら
    firstNumber = calculateResult(
      firstNumber, 
      parseFloat(currentNumber), 
      operator
    )

  }

  currentExpression = `${currentExpression}${currentNumber} ${operatorSymbol} `;

  //次に使用する演算子を保存
  operator = operatorSymbol;
  newNumber = true; //new

  // 次の数字入力を待つために表示を更新
  updateDisplay();
}



//数字や小数点が押された時
function inputNumber(number) {
  if (currentNumber === 'Error') clear();

  if (newNumber) {
    // 新しい数値の入力開始時
    if (number === '.') {
      currentNumber = '0.'; // 小数点を入力する場合
    } else {
      currentNumber = number; // 数字を入力する場合
    }
    newNumber = false;
  } else {
    // 既存の数値に追加する場合
    if (number === '.') {
      if (!currentNumber.includes('.')) {
        currentNumber += '.'; // 小数点が含まれていない場合のみ追加
      }
    } else if (number === '00') {
      // 00ボタンの処理
      if (currentNumber !== '0') {
        currentNumber += '00'; // 先頭が0でない場合のみ00を追加
      }
    } else {
      // 数字を追加
      if (currentNumber === '0') {
        currentNumber = number; // 先頭が0の場合は上書き
      } else {
        currentNumber += number; // それ以外は追加
      }
    }
  }

  updateDisplay();
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
  });
});

