    let thumb = document.querySelector(".cursor");
    let slider = document.querySelector(".opacitycontrol");
    thumb.onmousedown = function(event){
      let shiftX = event.clientX - thumb.getBoundingClientRect().left;
      let posY = thumb.getBoundingClientRect().top;
      thumb.style.left = +(shiftX + 150) + "px";
      thumb.style.zIndex = 1000;
      moveAt(event.pageX);

      function moveAt(pageX){
        let newLeft = pageX - shiftX - slider.getBoundingClientRect().left+150;
        if (newLeft < 150) {newLeft=150;frame.style.opacity=0;}
        if (newLeft > slider.offsetWidth-thumb.offsetWidth+150) {
          newLeft = slider.offsetWidth-thumb.offsetWidth+150;
          frame.style.opacity=1;
        }
        thumb.style.left = newLeft + "px";
        frame.style.opacity=(newLeft-150)/300;
      }
      function onMouseMove(event){
        moveAt(event.pageX);
      }
      document.addEventListener('mousemove',onMouseMove);
      document.addEventListener('mouseup',onMouseUp);
      function onMouseUp(){
        document.removeEventListener('mousemove',onMouseMove);
        document.removeEventListener('mouseup',onMouseUp);
      }
   

    };