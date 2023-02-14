class customers {
    constructor() {
        this.url = "http://atm.alshumaal.com/";
    }
    setData(userName, accNo, pin, balance) {
        this.pin = pin;
        this.accNo = accNo;
        this.userName = userName;
        this.balance = balance;
    }
    menu() { }
    getPin() {
        return this.pin;
    }
    getAccNo() {
        return this.accNo;
    }
    getName() {
        return this.userName;
    }
    recieveMoney(amount) {
        this.balance = this.balance + Number(amount)
    }
    deductAmount(amount) {
        this.balance = this.balance - Number(amount)
    }
    getBalance() {
        return this.balance;
    }

    checkAccNo(acc) {
        if (this.accNo == acc) {
            return true;
        } else {
            return false;
        }
    }
    withdrawBalance(amount) {
        this.balance = this.balance - Number(amount);

    }
    addBalance(amount) {
        this.balance = this.balance + Number(amount);
    }
    async login(pin) {
        try {
            let loginApi = await fetch(`${this.url}api/users/login`, {
                method: 'post',
                body: JSON.stringify({
                    pin: pin,
                })
            })
            if (loginApi.status == 200) {
                // if(!loginApi.ok){
                //     throw Error(loginApi.statusText)
                // }
                return loginApi.json();
            } else {
                return loginApi.json();
            }
            return loginApi;

        } catch (error) {
            return error;
        }
    }
    //remove deposit
    removeDeposit() {
        let depositContainer = document.querySelector('#depositContainer');
        depositContainer.innerHTML = '';
        this.showMenu();
    }
    //deposit Balance
    depositBalance() {
        let depositContainer = document.querySelector('#depositContainer');
        let depositContent = `<div class="depositMoney">
        <h1>Deposit Money</h1>
        <input type="text" class="depositaccnum" placeholder="Enter Your Account Number">
        <input type="text" class="depositInput" placeholder="Enter Your Amount">
        <div class="depositmsg"></div>
        <div class="depositbtn">
            <button class="deposit-btn depositdone">Deposit</button>
            <button class="deposit-btn depositcancel">Cancel</button>
        </div>
        </div>`
        depositContainer.innerHTML = depositContent;
        let depositDone = document.querySelector('.depositdone')
        let depositCancel = document.querySelector('.depositcancel')
        depositDone.addEventListener('click', () => {
            let depositaccnum = document.querySelector(".depositaccnum")
            let depositamount = document.querySelector('.depositInput');
            let errmsg = document.querySelector('.depositmsg');

            //------------------------------------------------------------------------

            if (depositaccnum.value == this.getAccNo() && parseFloat(Number(depositamount.value)) > 0) {
                // errmsg.innerHTML = "Deposit SuccessFull"
                this.addBalance(depositamount.value)
                errmsg.innerHTML = 'Amount Deposit SuccessFull'
                setTimeout(() => {
                    errmsg.innerHTML = ""
                    this.removeDeposit();
                }, 2000)

            } else {
                if (parseFloat(depositamount.value) < 0) {
                    errmsg.innerHTML = "Enter Correct Amount"
                    setTimeout(() => {
                        errmsg.innerHTML = ""
                    }, 2000)
                } else {
                    errmsg.innerHTML = "Account Number is Invalid"
                    setTimeout(() => {
                        errmsg.innerHTML = ""
                    }, 2000)
                }
            }

        })
        depositCancel.addEventListener('click', () => {
            this.removeDeposit();
        })
    }
    //Remove inquiry Section
    removeInq() {
        let balance = document.querySelector('#inquiryContainer');
        balance.innerHTML = '';
        this.showMenu();
    }
    //Balance Inquiry Section
    balanceInquiry() {
        let balance = document.querySelector('#inquiryContainer');
        let balanceContent = `
        <div class="bal-Inquiry">
            <table>
                <h1>Your Balance</h1>
                <tr>
                    <td>Your Current Balance </td>
                    <td class="total_balance"></td>
                </tr>
            </table>
            <div class="inq_back_btn">
                <button class="btn backButton">Back</button>
            </div>
        </div>`
        balance.innerHTML = balanceContent;
        let backButton2 = document.querySelector('.backButton');
        let total_balance = document.querySelector('.total_balance').innerHTML = this.getBalance();
        backButton2.addEventListener('click', () => {
            this.removeInq();
        })
    }
    //Remove withdraw Balance
    removeCashWithdrawScreen() {
        let withdrawContainer = document.querySelector('#cashWithdrawContainer')
        withdrawContainer.innerHTML = '';
        this.showMenu();
    }
    // Withdraw Balance
    balanceWithdraw() {
        let withdrawContainer = document.querySelector('#cashWithdrawContainer')
        let withdrawContent = `
        <div class="withdraw">
        <h2>Cash Withdrawal</h2>
        <div class="form-group-one">
            <input class="cashWithdrawInput" type="number" class="form-control" placeholder="Enter Amount">
            <label id="cashMessage"></label>
        </div>
        <div class="form-group">
            <button id="amountWithdraw" class="btn1 ">Withdraw Amount</button>
            <button id="cancelwithdraw" class="btn1">Cancel</button>
        </div>
    </div>`
        withdrawContainer.innerHTML = withdrawContent;
        let withdraw = document.querySelector('#amountWithdraw');
        withdraw.addEventListener('click', () => {
            let withdrawInput = document.querySelector('.cashWithdrawInput');
            if (withdrawInput.value % 500 != 0) {
                let cashMessage = document.querySelector("#cashMessage");
                let message = "Amount will be multiples of 500";
                cashMessage.innerHTML = message;
                setTimeout(() => {
                    cashMessage.innerHTML = "";
                }, 2000);
            }


            else {
                if (this.getBalance() >= 500 && this.getBalance() >= withdrawInput.value && withdrawInput.value > 0) {
                    this.withdrawBalance(withdrawInput.value);
                    // using Database

                    let fetchwithdraw = fetch(`http://atm.alshumaal.com/api/users/withdrawBalance?pin=${user.getPin()}&amount=${withdrawInput.value}`);
                    fetchwithdraw.then((data) => {
                            let cashMessage = document.querySelector("#cashMessage");
                            let message = "Successfulyy Withdrawn";
                            cashMessage.innerHTML = message;
                            return data.json();

                    }).then((response) => {
                        response.data.currentBalance;
                        console.log(response);
                        // this.balance = data.data.currentBalance
                    })


                    // setTimeout(() => {
                    //     this.removeCashWithdrawScreen();
                    //     this.showMenu();
                    // }, 2000);
                } else {
                    let cashMessage = document.querySelector("#cashMessage");
                    let message = "Amount is Insufficient";
                    cashMessage.innerHTML = message;
                }
            }
        });
        let cancelwithdraw = document.querySelector('#cancelwithdraw');
        cancelwithdraw.addEventListener('click', () => {
            this.removeCashWithdrawScreen();
            this.showMenu();
        })
    }
    //Remove account Information Screen
    removeInfoScreen() {
        let infoScreen = document.querySelector('#accInfoConatiner');
        infoScreen.innerHTML = ``
    }
    //This for amounttransfer
    transfermoney() {
        let transferamount = document.querySelector('#transferMoneyContainer');
        let transferContent = ` <div class="transfer">
         <h1>Transfer Money</h1>
         <input type="text" placeholder="Enter Your Account Number" class="transferAccountNumber">
         <input type="text" placeholder="Enter Amount" class="transferamount">
             <p class="transfermsg"></p>
         <div class="buttonTransfer">
             <button class="transferMoney btn3">Transfer</button>
             <button class="CancelTransfer btn3">Cancel</button>
         </div>
     </div>`
        transferamount.innerHTML = transferContent;
        let doTransfer = document.querySelector('.transferMoney');
        doTransfer.addEventListener('click', () => {
            let transferAccNo = document.querySelector('.transferAccountNumber').value;
            let transferAmount = document.querySelector('.transferamount').value;
            //Try Promises
            let checkAcc = new Promise((resolve, reject) => {
                if (user1.checkAccNo(transferAccNo)) {
                    resolve()
                } else {
                    reject('Account not Found')
                }
            });
            checkAcc.then((value) => {
                if (transferAmount > 0 && transferAmount <= 500000) {
                    if (this.getBalance() > 0 && this.getBalance() >= transferAmount) {
                        user.deductAmount(transferAmount)
                        // user1.recieveAmount(transferAmount)
                        let tranferErrorMsg = document.querySelector('.transfermsg');
                        tranferErrorMsg.innerHTML = 'Amount Transfered Successfully';
                        tranferErrorMsg.style.color = "green";
                        setTimeout(() => {
                            tranferErrorMsg.innerHTML = "";
                            // this.showMenu();
                            this.removeTransferMoney();
                        }, 2000);
                    } else {
                        let tranferErrorMsg = document.querySelector(".transfermsg");
                        let message = `Amount is not sufficient`;
                        tranferErrorMsg.innerHTML = message;
                        tranferErrorMsg.style.color = "red";
                        setTimeout(() => {
                            tranferErrorMsg.innerHTML = "";
                            document.querySelector('.transferAccountNumber').value = ``
                        }, 2000);
                    }
                } else {
                    let tranferErrorMsg = document.querySelector(".transfermsg");
                    let message = `Amount is invalid`;
                    tranferErrorMsg.innerHTML = message;
                    tranferErrorMsg.style.color = "red";
                    setTimeout(() => {
                        tranferErrorMsg.innerHTML = "";
                    }, 2000);
                }
            }).catch((error) => {
                let tranferErrorMsg = document.querySelector('.transfermsg');
                tranferErrorMsg.innerHTML = 'Check your Amount and Account Number Again!';
                tranferErrorMsg.style.color = "red";
                setTimeout(() => {
                    tranferErrorMsg.innerHTML = "";
                }, 2000);
            })

            //without using promises
            // let checkAcc = user1.checkAccNo(transferAccNo);
            // if (checkAcc) {
            //     if (transferAmount > 0 && transferAmount <= 500000) {
            //         if (this.getBalance() > 0 && this.getBalance() >= transferAmount) {
            //             user.deductAmount(transferAmount)
            //             // user1.recieveAmount(transferAmount)
            //             let tranferErrorMsg = document.querySelector('.transfermsg');
            //             tranferErrorMsg.innerHTML = 'Amount Transfered Successfully';
            //             tranferErrorMsg.style.color = "green";
            //             setTimeout(() => {
            //                 tranferErrorMsg.innerHTML = "";
            //             }, 2000);
            //         } else {
            //             let tranferErrorMsg = document.querySelector(".transfermsg");
            //             let message = `Amount is not sufficient`;
            //             tranferErrorMsg.innerHTML = message;
            //             tranferErrorMsg.style.color = "red";
            //             setTimeout(() => {
            //                 tranferErrorMsg.innerHTML = "";
            //                 document.querySelector('.transferAccountNumber').value = ``
            //             }, 2000);
            //         }
            //     } else {
            //         let tranferErrorMsg = document.querySelector(".transfermsg");
            //         let message = `Amount is invalid`;
            //         tranferErrorMsg.innerHTML = message;
            //         tranferErrorMsg.style.color = "red";
            //         setTimeout(() => {
            //             tranferErrorMsg.innerHTML = "";
            //         }, 2000);
            //     }

            // } else {
            //     let tranferErrorMsg = document.querySelector('.transfermsg');
            //     tranferErrorMsg.innerHTML = 'Your Account is Not Found';
            //     tranferErrorMsg.style.color = "red";
            //     setTimeout(() => {
            //         tranferErrorMsg.innerHTML = "";
            //     }, 2000);
            // }
        });
        let cancelTransfer = document.querySelector('.CancelTransfer');
        cancelTransfer.addEventListener('click', () => {
            this.removeTransferMoney();
        })
    }
    //RemoveTransferMoney
    removeTransferMoney() {
        let removeTransferamount = document.querySelector('#transferMoneyContainer')
        removeTransferamount.innerHTML = ``;
        this.showMenu();
    }
    //Account Information Section
    accountInformation() {
        let infoScreen = document.querySelector('#accInfoConatiner')
        let infoContent = `<div class="accInfo">
      <h2>Account Information</h2>
      <table class="table table-bordered">
          <tr>
              <th>Name :</th>
              <td id="userName"></td>
          </tr>
          <tr>
              <th>Account No :</th>
              <td id="userAccNo"></td>
          </tr>
          <tr>
              <th>Pin :</th>
              <td id="userPin"></td>
          </tr>
          <tr>
              <th>Balance :</th>
              <td id="userBalance"></td>
          </tr>
      </table>
      <div class="accinfobtnCon">
          <button class="accInfoBtn btn-success" id="goMenu">Back</button>
          <button class=" accInfoBtn btn-danger" id="logout2">Logout</button>
      </div>
  </div>`
        infoScreen.innerHTML = infoContent;
        document.querySelector('#userName').innerHTML = this.getName();
        document.querySelector('#userAccNo').innerHTML = this.getAccNo();
        document.querySelector('#userPin').innerHTML = this.getPin();
        document.querySelector('#userBalance').innerHTML = this.getBalance();

        let backinfo = document.querySelector('#goMenu')
        let logout2 = document.querySelector('#logout2')
        logout2.addEventListener('click', () => {
            user.logout();
            user.removeInfoScreen();
        })
        backinfo.addEventListener('click', () => {
            user.showMenu();
            user.removeInfoScreen();
        })
    }
    //This is for Logout
    logout() {
        this.removeMenu();
        let loginScreen = document.querySelector('#loginScreen');
        loginScreen.style.display = 'flex';
        document.querySelector('#input_field').value = '';
    }
    //Main Menu Screen Section
    removeMenu() {
        let mainmenu = document.querySelector('#menu');
        mainmenu.innerHTML = "";
    }
    //removeMenu
    showMenu() {
        let mainMenu = document.querySelector('#menu');
        let menuContent = `
        <div class="menu">
            <div class="heading_menu">
                <h2 class='maaainText'>Main Menu</h2>
                <button id="accInfo" class="btn">Account Info</button>
            </div>
            <div class="menu_options">
                <button id="withdraw" class="btn" id='withdraw' >Cash Withdraw</button>
                <button class="btn" id='balanceInq'>Balance Inquiry</button>
                <button class="btn" id='transfer' >Transfer Money</button>
                <button class="btn" id='deposite'>Deposite Money</button>
            </div>
            <div class="logout_btn">
                <button id="logout" class="btn btn-danger btn-block mt-3">Logout</button>
            </div>
        </div>`
        mainMenu.innerHTML = menuContent;
        let accInfo = document.querySelector('#accInfo');
        let withdraw = document.querySelector('#withdraw');
        let balanceInq = document.querySelector('#balanceInq');
        let transfer = document.querySelector('#transfer');
        let deposite = document.querySelector('#deposite');
        let logout = document.querySelector('#logout');
        //PerForm Action 
        accInfo.addEventListener('click', () => {
            this.removeMenu();
            this.accountInformation();
        });
        balanceInq.addEventListener('click', () => {
            this.balanceInquiry();
            this.removeMenu();
        })
        withdraw.addEventListener('click', () => {
            this.balanceWithdraw();
            this.removeMenu();
        })
        deposite.addEventListener('click', () => {
            this.depositBalance();
            this.removeMenu();

        })
        transfer.addEventListener('click', () => {
            this.transfermoney();
            this.removeMenu();
        })
        logout.addEventListener('click', () => {
            user.logout();
        })

    }

}
// let pin = 1234;
// let accNo = 123456789;
// let userName = 'Sajjad Karim';
// let balance = 10000;
let user = new customers();
let user1 = new customers(123, 987654321, 'Ali', 0)

let login = document.querySelector('.log_btn');
let clearBtn = document.querySelector('.clear_btn');
let pass = document.querySelector('#input_field');
//Check input pin is correct or wrong
login.addEventListener('click', () => {
    let userlogin = user.login(pass.value);
    userlogin.then((response) => {
        if (response.data == 'Invalid Pin') {
            let errorMessage = document.querySelector('.msg');
            errorMessage.innerHTML = 'Invalid Pin';
            errorMessage.style.color = 'red';
            setTimeout(() => {
                errorMessage.innerHTML = '';
            }, 2000)
            // let loginScreen = document.querySelector('#loginScreen')
            // loginScreen.style.display = 'none';
            // user.showMenu();
            // let input_field = document.querySelector('.input_field');
            // input_field.value = '';


        } else {
            let loginScreen = document.querySelector('#loginScreen');
            loginScreen.style.display = 'none';
            console.log(response);
            user.setData(
                response.data.username,
                response.data.cardNumber,
                response.data.atmPin,
                Number(response.data.currentBalance),
            );
            user.showMenu();
            // let errorMessage = document.querySelector('.msg');
            // errorMessage.innerHTML = "Incorrect Pin"
            // errorMessage.style.color = 'red';
            // setTimeout(() => {
            //     errorMessage.innerHTML = '';
            //     input_field.value = '';
            // }, 1500)
        }
    });
});
clearBtn.addEventListener('click', () => {
    document.querySelector('#input_field').value = '';
})
