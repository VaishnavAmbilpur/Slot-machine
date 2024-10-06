// Deposit some money 
// determine the number of lines
// collect bet money
// spin the slot machine 
// check if the user won 
// give the user their winning 
// play again until money completes 


// function deposit(){

// }
const prompt = require("prompt-sync")();
 
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8
}
const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
     D: 2
}


   const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter a Deposite amount ");
    const dnp = parseFloat(depositAmount);

    if(isNaN(dnp) || dnp <= 0 ){
      console.log("Invalid Deposite Amount, try again");
    }
    else{
      return dnp;
    }
  }
 };
 const getNumberLine = () =>{
  while(true){
    const nl = prompt("Enter the number of lines (1-3) ");
    const nol = parseFloat(nl);

    if(isNaN(nol) || nol <= 0 || nol>3){
      console.log("Invalid number of lines, try again");
    }
    else{
      return nol;
    }
  }
 };
 const getBet = (balance,lines) =>{
  while(true){
    const bet = prompt("Enter the Bet per line");
    const numberb = parseFloat(bet);

    if(isNaN(bet) || bet <= 0 || bet>(balance/lines)){
      console.log("Invalid Bet , Try again");
    }
    else{
      return numberb;
    }
  }
 };
 const spin = () =>{
       const symbols = [];
     for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
          for(let i=0;i<count ; i++ ){
            symbols.push(symbol);
          }
     }
     

     const reels = [];
     for(let i=0;i<COLS;i++){
      reels.push([]);
      const reelsSymbols = [...symbols];
      for(let j=0;j<ROWS;j++){{
         const randow = Math.floor(Math.random() * reelsSymbols.length);
         const selectedSymbol = reelsSymbols[randow];
         reels[i].push(selectedSymbol);
         reelsSymbols.splice(randow,1);
      }
      }
     }

     return reels;

 };
 
 const transpose = (reels) =>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
      rows.push([]);
      for(j=0;j<COLS;j++){
        rows[i].push(reels[j][i]);
      }
    }
    return rows;
 };

const printRows = (rows) => {
  for(const row of rows){
    let rowString = "";
    for(const [i,symbol] of row.entries()){
       rowString += symbol;
        if(i != rows.length -1){
          rowString += " | "
        }
    }
    console.log(rowString);
  }
};

const getWinning = (rows,bet,lines) => {
  let winnings =0;

  for(let row =0; row<lines ; row++){
    const symbols = rows[row];
    let allsame = true;
    for(const symbol of symbols){
      if(symbol != symbols[0]){
        allsame = false;
        break;
      }
    }
     if(allsame){
       winnings += bet * SYMBOLS_VALUES[symbols[0]];
     }
  }
  return winnings;
}
const game = () =>{
  let balance = deposit();
while(true){
  console.log("You have A balance of $" + balance);
  const lines = getNumberLine(); 
  const Bet = getBet(balance,lines);
  balance -= Bet*lines;
  const reels = spin();
  const rows = transpose(reels);
  printRows(rows);
 const win = getWinning(rows,Bet,lines);
 balance += win;
 console.log("YOU won, $"+ win.toString());

 if(balance <=0){
  console.log("you ran out of money ");
  break;
 }
 const playagain = prompt("Do you want to play again (y/n)? ");
 if(playagain != "y"){ break;}
}
};

game();
 

 