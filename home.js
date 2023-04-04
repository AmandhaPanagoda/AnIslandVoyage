const observer= new IntersectionObserver(entries=> {
   entries.forEach(entry =>{
    if(entry.isIntersecting){
        document.querySelectorAll(".attractions").classList.add("fadeInBottom");
        document.querySelectorAll(".adventure").classList.add("fadeInBottom");
        document.querySelectorAll(".life").classList.add("fadeInBottom");
    }  
   })
})

observer.observe(document.querySelector("content-pages"))