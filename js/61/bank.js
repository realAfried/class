'use strict';

function createAccount(balance) {
    return{
        balance,
        performTransaction(deposit){
            console.log(`before depsoit: ${this.balance}`);
            this.balance += deposit;
            console.log(`after depsoit: ${this.balance}`);
        }
    };
}

const acount1 = createAccount(100);

acount1.performTransaction(50);
acount1.performTransaction(25);

const acount2 = createAccount(85);
acount2.performTransaction(57);

function transaction(deposit){
    console.log(`before depsoit: ${this.balance}`);
    this.balance += deposit;
    console.log(`after depsoit: ${this.balance}`);
}

function createAccount2(balance) {
    return{
        balance,
        performTransaction: transaction
        }
};

const acount3 = createAccount2(100);

acount3.performTransaction(50);
acount3.performTransaction(25);


transaction.apply(acount3, [100]);
transaction.call(acount3, 100);

acount3.performTransaction(10);

const depositFiftyInSavings = transaction.bind(acount3, 50);
depositFiftyInSavings();
depositFiftyInSavings();