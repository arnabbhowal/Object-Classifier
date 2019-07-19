

let mobilenet=ml5.imageClassifier('MobileNet',()=>console.log('model ready'));



function makePrediction(imgFiles){

    let imgs=document.getElementsByTagName('body')[0].getElementsByTagName('img');
    for(let i=0;i<imgs.length;i++){
      document.getElementsByTagName('body')[0].removeChild(imgs[i]);
    }
    let paras=document.getElementsByTagName('body')[0].getElementsByTagName('p');
    for(let i=0;i<paras.length;i++){
      document.getElementsByTagName('body')[0].removeChild(paras[i]);
    }
    for(let i=0;i<imgFiles.length;i++){
      let img=new Image(400);
      img.onload = function(){
  var imageWidth = this.offsetWidth,
      imageHeight = this.offsetHeight,
      vpWidth = document.documentElement.clientWidth,
      vpHeight = document.documentElement.clientHeight;

  this.style.position = 'absolute'
  this.style.left = (vpWidth - imageWidth)/2 + 'px';
  this.style.top = (vpHeight - imageHeight)/2 +
                   window.pageYOffset + 'px';
}
      let reader = new FileReader();
      reader.onload = function(){
        img.src = reader.result;
        mobilenet.predict(img,classified);
        document.getElementsByTagName('body')[0].appendChild(img);
      }
      reader.readAsDataURL(imgFiles[i]);
    }
}

function classified(error,prediction){
  if(error){
    console.log(error);
  }
  else{
    let results = document.createElement('p');
    for(let i=2;i<prediction.length;i++){
      let guess = document.createTextNode(('This is: ')+prediction[0].className+': '+prediction[0].probability);
      // results.appendChild(document.createElement('br'));
      results.appendChild(guess);
    }
    results.appendChild(document.createElement('br'));
    // results.appendChild(document.createElement('span style="text-align: right;"'));
    // imp
    // document.getElementsByTagName('body')[0].appendChild(results);
    // results.appendChild(document.createElement('span'));
    //document.getElementsByTagName('body')[0].appendChild(results);
    document.getElementsByTagName('body')[0].appendChild(results);
  }
}
