class SLIDER {
  constructor(set) {
    if (set.el[0] == '.' || set.el[0] == '#') {
      this.el = document.querySelector(set.el);
    } else {
      this.el = document.getElementById(set.el);
    }
    // elementlar
    this.sliderLine = this.el.querySelector('.slider__inner');
    this.slides = [...this.sliderLine.children];
    this.next = this.el.querySelector('.slider__next');
    this.prev = this.el.querySelector('.slider__prev');
    this.slider = document.querySelector('.slider');

    // config
    this.dir = set.direction.toUpperCase() == 'X' ? 'X' : 'Y';
    this.time = set.time || 1000;
    this.autoplay = set.autoplay;
    this.interval = this.time < set.interval ? set.interval : this.time + 3000;

    // sizing
    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;
    this.moveSize = this.dir == 'X' ? this.width : this.height;

    this.active = 0;

    this.sliderLine.style = `
      position:relative;
      height: ${this.height}px;
      overflow: hidden;
    `;

    this.slides.forEach((item, i) => {
      item.style = `
        position: absolute;
        width: ${this.width}px;
        height: ${this.height}px;
      `;

      if (i != this.active) {
        item.style.transform = `translate${this.dir}(${this.moveSize}px)`;
      }

      if (i == this.slides.length - 1) {
        item.style.transform = `translate${this.dir}(${-this.moveSize}px)`;
      }
    });

    this.next.addEventListener('click', () => this.move(this.next));
    this.prev.addEventListener('click', () => this.move(this.prev));

    if(this.autoplay) {
     let set = setInterval(() => {
        this.move(this.next)
      }, this.interval);      
      this.slider.addEventListener('mouseenter', () => {
        clearInterval(set)
      })
      this.slider.addEventListener('mouseleave', () => {        
        set = setInterval(() => {
          this.move(this.next)
        }, this.interval);
      })
    }
  }
  
  move(btn) {
    this.next.disabled = true;
    this.prev.disabled = true;

    setTimeout(()=> {
      this.next.disabled = false;
      this.prev.disabled = false;
    }, this.time);

    let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize;

    this.slides.forEach((sl, i) => {
      sl.style.transition = '0ms';

      if (i != this.active) {
        sl.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`;
      }
    });

    this.slides[this.active].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
    this.slides[this.active].style.transition = this.time + 'ms';

    if (btn == this.next) {
      this.active++;
      if (this.active > this.slides.length - 1) {
        this.active = 0;
      }
    } else if (btn == this.prev) {
      this.active--;
      if (this.active < 0) {
        this.active = this.slides.length - 1;
      }
    }

    this.slides[this.active].style.transform = `translate${this.dir}(0px)`;
    this.slides[this.active].style.transition = this.time + 'ms';
  }
}

const slider1 = new SLIDER({
  el: 'slider1',
  direction: 'x',
  time: 1000,
  autoplay: true,
  interval: 4000,
});
