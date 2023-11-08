const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOL_VALUE = {
    A : 5,
    B : 4,
    C : 3,
    D : 2,
}

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter the anount you want to deposit : ");
        const numberDepositAMount = parseFloat(depositAmount);

        if (isNaN(numberDepositAMount) || numberDepositAMount <= 0) {
            console.log("invalid deposit amount, please try again")
        }else{
            return numberDepositAMount;
        }
    }
}

const getlines = () =>{
    while(true){
        const lines = prompt("Enter the no of line you want to bet on (1-3): ");
        const getlinesnumber = parseFloat(lines);

        if(isNaN(getlinesnumber) || getlinesnumber <= 0 || getlinesnumber > 3){
            console.log("please enter from the provided number of lines");
        }else{
            return getlinesnumber;
        }
    }
}

const getBet = (balance , lines) =>{
    while(true){
        const bet = prompt("Enter the bet per line : ");
        const numBet = parseFloat(bet);

        if(isNaN(numBet) || numBet <= 0 || numBet > balance / lines){
            console.log("invalid bet");
        }else{
            return numBet;
        }
    }
}

const spin = () =>{
    const sybmols = [];

    for( const [symbol , value] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0 ; i < value ; i++){
            sybmols.push(symbol);
        }
    }

    const reels = [];
    for(let i = 0 ; i < COLS ; i++){
        reels.push([]);
        const reelSymbols = [...sybmols];
        for(let j = 0 ; j <ROWS ; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex , 1);
        }
    }

    return reels;
}

const transpose= (reels) =>{
    const rows = [];

    for(let i = 0 ; i < ROWS ; i++){
        rows.push([]);
        for(let j = 0 ; j <COLS ; j++ ){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printROws = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for(const [i , symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length -1 ){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows , bet , lines) =>{
    let winnings = 0;

    for(let row = 0 ; row < rows ; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOL_VALUE[symbols[0]];
        }
    }


    return winnings;
}

const game = () =>{
    let balance = deposit();

    while(true){
        console.log("you have a balance of :" + balance)
        const lines = getlines();
        const bet = getBet(balance , lines);
        const reels = spin();
        const trans = transpose(reels);
        printROws(trans);
        const winnings = getWinnings(trans , bet , lines);
        balance += winnings;
        console.log(`you won ${winnings}`)

        if(balance <= 0){
            console.log("you ran out of money!!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)")
        if(playAgain != "y")break;
    }
};

game();