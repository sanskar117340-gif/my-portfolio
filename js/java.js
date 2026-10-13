class ImageSlider{
    constructor(selector){
        this.slider = document.querySelector(selector);
        this.track = this.slider.querySelector(".slider-track");
        this.slides = Array.from(this.track.children);
        this.prevButton = this.slider.querySelector(".prev");
        this.nextButton = this.slider.querySelector(".next");
        this.dotsContainer = this.slider.querySelector(".slider-dots");
        this.dots=[];
        this.currentIndex=0;
        this.init();
    }

    init(){
        this.initDots();
        this.bindEvents();
    }
    initDots(){
        this.createDots();
        this.updateDots();
    }
    updateSliderPosition(){
        const offset = -this.currentIndex*this.slider.offsetWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        this.updateDots();
    }
    nextSlide(){
        this.currentIndex=(this.currentIndex+1)%this.slides.length;
        this.updateSliderPosition();
    }
    prevSlide(){
        if(this.currentIndex>0){
            this.currentIndex =(this.currentIndex-1)%this.slides.length;
        }
        else{
            this.currentIndex = this.slides.length-1;
        }
        this.updateSliderPosition();
    }
    bindEvents(){
        this.nextButton.addEventListener("click",()=>this.nextSlide());
        this.prevButton.addEventListener("click",()=>this.prevSlide());
    }
    createDots(){
        this.dotsContainer.innerHTML="";
        this.dots=[];
        this.slides.forEach((slide,index)=>{
            const dot=document.createElement("button");
            dot.type="button";
            dot.classList.add("dot");
            dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
            dot.addEventListener("click",()=>{
                this.currentIndex=index;
                this.updateSliderPosition();
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }
    updateDots(){
        this.dots.forEach((dot,index)=>{
            dot.classList.toggle("active",index===this.currentIndex);
        });
    }
}
document.addEventListener('DOMContentLoaded', ()=> new ImageSlider(".slider"));