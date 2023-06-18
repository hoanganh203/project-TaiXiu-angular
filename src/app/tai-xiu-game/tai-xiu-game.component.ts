import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tai-xiu-game',
  templateUrl: './tai-xiu-game.component.html',
  styleUrls: ['./tai-xiu-game.component.scss']
})
export class TaiXiuGameComponent {
  tongGiaTri: number = 0;
  status: boolean = false;
  isStatus: boolean = false;
  count: number = 10;
  statusTai: boolean = false;
  statusXiu: boolean = false;
  money: number = 100000000
  moneyTai: number = 0;
  moneyXiu: number = 0;
  history: any[] = []
  batImage = 'https://res.cloudinary.com/doa7mkkpq/image/upload/v1687006023/ECMA/fgsdxl7iqqg96ianjjbh.png';
  isBat1 = false;
  isDragging = false;
  initialX!: number;
  initialY!: number;
  xPos = 0;
  yPos = 0;

  rows: any[] = [
    [{ imageUrl: 'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995851/ECMA/gychkymlvmv1pimaemuf.jpg', value: null }, { imageUrl: 'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995859/ECMA/qoezv7n1zmcfsztuq8jw.jpg', value: null }, { imageUrl: 'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995863/ECMA/vghin6m5xeloh9txnxdq.jpg', value: null }],
  ];
  diceImages = [
    'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995851/ECMA/gychkymlvmv1pimaemuf.jpg',
    'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995859/ECMA/qoezv7n1zmcfsztuq8jw.jpg',
    'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995863/ECMA/vghin6m5xeloh9txnxdq.jpg',
    'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995926/ECMA/brnr89humx1zlitdn9eg.jpg',
    'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995933/ECMA/jrwj6zq1pdqfb2oo1ker.jpg',
    'https://res.cloudinary.com/doa7mkkpq/image/upload/v1686995938/ECMA/aqjhjidd0ud4gz3snosw.jpg'
  ];

  constructor() {
    const countdown = setInterval(() => {
      if (this.count !== 0) {
        this.count--;
        if (this.count === 0) {
          clearInterval(countdown);
          for (let i = 0; i < this.rows.length; i++) {
            this.tongGiaTri = 0;
            this.status = false;
            this.isStatus = false
            for (let j = 0; j < this.rows[i].length; j++) {
              const randomIndex = Math.floor(Math.random() * this.diceImages.length);
              setTimeout(() => {
                this.rows[i][j].imageUrl = this.diceImages[randomIndex];
                this.rows[i][j].value = randomIndex + 1;
                this.tongGiaTri += this.rows[i][j].value;
              }, 100);
            }
          }
        }
      }
    }, 1000);
  }

  formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
  }

  open() {
    this.history.push(this.tongGiaTri)
    console.log(this.history);
    if (this.count === 0) {
      const batElement = document.querySelector('.bat') as HTMLElement;
      this.isStatus = true
      this.status = true
      batElement.style.transform = `translate3d(${150}px, ${-120}px, 0)`
      this.count = 5
      console.log(this.status, this.isStatus)
      const countdown = setInterval(() => {
        this.count--;
        if (this.count === 0) {
          clearInterval(countdown);
          this.status = false;
          this.count = 10;
          this.tongGiaTri = 0;
          this.status = false;
          this.isStatus = false
          batElement.style.transform = `translate3d(${0}px, ${0}px, 0)`;
          console.log(this.status, this.isStatus)
          const countdown1 = setInterval(() => {
            this.count--;
            if (this.count === 0) {
              clearInterval(countdown1);
              for (let i = 0; i < this.rows.length; i++) {
                this.status = false;
                this.isStatus = false
                console.log(this.status, this.isStatus)

                for (let j = 0; j < this.rows[i].length; j++) {
                  const randomIndex = Math.floor(Math.random() * this.diceImages.length);
                  setTimeout(() => {
                    this.rows[i][j].imageUrl = this.diceImages[randomIndex];
                    this.rows[i][j].value = randomIndex + 1;
                    this.tongGiaTri += this.rows[i][j].value;
                  }, 100);
                }
              }
            }
          }, 1000)
        }
      }, 1000);
      console.log(this.count);
      if (this.tongGiaTri > 10) {
        if (this.moneyTai !== 0) {
          this.money = this.money + (this.moneyTai * 2)
          Swal.fire({
            position: 'top-right',
            icon: 'success',
            title: 'Win Tài',
            background: "#fff",
            showConfirmButton: false,
            timer: 500
          })
        }
        else {
          this.money - this.moneyTai
          Swal.fire({
            position: 'top-right',
            icon: 'error',
            title: 'lose tài',
            background: "#fff",
            showConfirmButton: false,
            timer: 500
          })

        }
      }

      if (this.tongGiaTri <= 10) {
        if (this.moneyXiu !== 0) {
          this.money = this.money + (this.moneyXiu * 2)
          Swal.fire({
            position: 'top-right',
            icon: 'success',
            title: 'Win Xỉu',
            background: "#fff",

            showConfirmButton: false,
            timer: 500
          })

        }
        else {
          this.money - this.moneyXiu
          Swal.fire({
            position: 'top-right',
            icon: 'error',
            title: 'lose Xỉu',
            background: "#fff",
            showConfirmButton: false,
            timer: 500
          })
        }
      }
      this.statusXiu = false;
      this.statusTai = false;
      this.moneyTai = 0;
      this.moneyXiu = 0;

    }

  }

  onTai() {
    this.statusXiu = false;
    this.statusTai = !this.statusTai;
  }

  onXiu() {
    this.statusTai = false;
    this.statusXiu = !this.statusXiu
  }

  onhandelsTai(event: any) {
    this.money = this.money - event.target.value
    this.moneyTai = event.target.value;
  }
  onhandelsXiu(event: any) {
    this.money = this.money - event.target.value
    this.moneyXiu = event.target.value;
    console.log(this.moneyTai)
  }

  alltai() {
    this.moneyTai = this.money
    this.money = 0
    this.statusTai = true

  }
  allXiu() {
    this.moneyXiu = this.money
    this.money = 0
    this.statusXiu = true

  }

  button() {
    this.statusTai = true
  }


  handleMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.initialX = event.clientX - this.xPos;
    this.initialY = event.clientY - this.yPos;
  }

  handleMouseMove(event: MouseEvent) {
    if (this.count === 0) {
      if (this.isDragging) {
        event.preventDefault();
        this.xPos = event.clientX - this.initialX;
        this.yPos = event.clientY - this.initialY;
        const batElement = document.querySelector('.bat') as HTMLElement;
        batElement.style.transform = `translate3d(${this.xPos}px, ${this.yPos}px, 0)`;

        if (this.xPos > 180 || this.yPos > 120 || this.xPos < -180 || this.yPos < -150) {
          this.history.push(this.tongGiaTri)
          this.status = true
          this.isStatus = true
          console.log(this.status, this.isStatus)

          if (this.count === 0) {
            this.count = 5
            const countdown = setInterval(() => {
              this.count--;
              if (this.count === 0) {
                clearInterval(countdown);
                this.count = 10;
                this.tongGiaTri = 0;
                this.isStatus = false
                this.status = false;
                console.log(this.status, this.isStatus)

                batElement.style.transform = `translate3d(${0}px, ${0}px, 0)`;
                const countdown1 = setInterval(() => {
                  this.count--;
                  if (this.count === 0) {
                    clearInterval(countdown1);
                    for (let i = 0; i < this.rows.length; i++) {
                      this.status = false;
                      this.isStatus = false
                      console.log(this.status, this.isStatus)

                      for (let j = 0; j < this.rows[i].length; j++) {
                        const randomIndex = Math.floor(Math.random() * this.diceImages.length);
                        setTimeout(() => {
                          this.rows[i][j].imageUrl = this.diceImages[randomIndex];
                          this.rows[i][j].value = randomIndex + 1;
                          this.tongGiaTri += this.rows[i][j].value;
                        }, 100);
                      }
                    }
                  }
                }, 1000)
              }
            }, 1000);
            console.log(this.count);
            if (this.tongGiaTri > 10) {
              if (this.moneyTai !== 0) {
                this.money = this.money + (this.moneyTai * 2)
                Swal.fire({
                  position: 'top-right',
                  icon: 'success',
                  title: 'Win Tài',
                  background: "#fff",
                  showConfirmButton: false,
                  timer: 500
                })
              }
              else {
                this.money - this.moneyTai
                Swal.fire({
                  position: 'top-right',
                  icon: 'error',
                  title: 'lose tài',
                  background: "#fff",

                  showConfirmButton: false,
                  timer: 500
                })

              }
            }

            if (this.tongGiaTri <= 10) {
              if (this.moneyXiu !== 0) {
                this.money = this.money + (this.moneyXiu * 2)
                Swal.fire({
                  position: 'top-right',
                  icon: 'success',
                  title: 'Win Xỉu',
                  background: "#fff",

                  showConfirmButton: false,
                  timer: 500
                })

              }
              else {
                this.money - this.moneyXiu
                Swal.fire({
                  position: 'top-right',
                  icon: 'error',
                  title: 'lose Xỉu',
                  background: "#fff",

                  showConfirmButton: false,
                  timer: 500
                })
              }
            }
            this.statusXiu = false;
            this.statusTai = false;
            this.moneyTai = 0;
            this.moneyXiu = 0;

          }
        }
      }
    }
  }

  handleMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }

}
