cashwithdrawl() {
    let cashwithdraw = document.querySelector(".cashwithdrawl");
    let withdrawdata = ` <h3>Cash Withdrawl</h3>
     <div class="form-group">
     <input type="number" id="withdrawinput"  class="form-control" placeholder="Enter Amount to Withdrawl" />
     <div id="cashMessage"></div>
     <button class="btn btn-primary btn-block" id="withdrawbutton">Withdrawl</button>
     </div>
     <table class="table table-bordered"> <td>
     <button class="btn btn-success btn-block" id="inqbackmenu">
       Back to Menu
     </button>
     <td>
       <button class="btn btn-danger btn-block" id="inqlogout">
       Logout
     </button>
   </td></table>
    `;
    cashwithdraw.innerHTML = withdrawdata;
    let withdrawbutton = document.querySelector("#withdrawbutton");
    withdrawbutton.addEventListener("click", () => {
      let withdrawinput = document.querySelector("#withdrawinput");
      if (withdrawinput.value < 0 || withdrawinput.value == 0) {
        let depositMessage = document.querySelector("#cashMessage");
        let message = "Enter a Valid Amount";
        depositMessage.innerHTML = message;
        setTimeout(() => {
          message.innerHTML = "";
        }, 3000);
      } else {
        let mywithdrawscreen = new Promise((resolve, reject) => {
          if (withdrawinput.value % 500 == 0) {
            resolve("Successful");
          } else {
            reject("Invalid Amount! Amount Must be Multiple of 500");
          }
        });
        mywithdrawscreen
          .then((data) => {
            if (
              this.getBalance() >= 500 &&
              this.getBalance() >= withdrawinput.value
            ) {
              let withdrawApi = fetch(
                `http://atm.alshumaal.com/api/users/withdrawBalance?pin=${user.getPin()}&amount=${
                  withdrawinput.value
                }`
              );
              withdrawApi
                .then((data) => {
                  let cashMessage = document.querySelector("#cashMessage");
                  let message =
                    "Successfulyy Withdrawn Rs " + withdrawinput.value;
                  cashMessage.innerHTML = message;
                  return data.json();
                })
                .then((response) => {
                  this.balance = data.data.currentBalance;
                  console.log(response);
                });
            } else {
              let message = document.querySelector("#cashMessage");
              message.innerHTML = "Amount is Insufficient";
            }
          })
          .catch((err) => {
            let cashMessage = document.querySelector("#cashMessage");
            let message = err;
            cashMessage.innerHTML = message;
          });
      }
    });
    let inqbackmenu = document.querySelector("#inqbackmenu");
    inqbackmenu.addEventListener("click", () => {
      let withdrawback = document.querySelector(".cashwithdrawl");
      withdrawback.innerHTML = "";
      this.showMenu();
    });
    let inqlogout = document.querySelector("#inqlogout");
    inqlogout.addEventListener("click", () => {
      let logout = document.querySelector(".cashwithdrawl");
      logout.innerHTML = "";
      this.content();
    });
  }