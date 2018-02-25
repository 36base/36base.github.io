var imagepath = "images/dolls/";
var isdamage = false;
var currentnumber;

if(window.location.hash) {
  var hash = window.location.hash.substring(1);
  loadData(hash);
} else {
  var warn = '잘못된 접근입니다.'
  alert(warn);
}

function loadData(number){
  $.ajax({
    type:"GET",
    url:"../dolldb.json",
    success:function(json){
      var listLen = json.length;
      currentnumber = number;
      for(var i=0; i<listLen; i++){
        if (json[i].number == number) {
          document.getElementById("dollname").innerHTML = json[i].name;
          imagepath = imagepath + number + ".png";
          document.getElementById("dollimage").src = imagepath;
        }
      }
    }
  })
};

function damageToggle(){
  imagepath = "images/dolls/";
  if (isdamage==true) {
    isdamage=false;
    imagepath = imagepath + currentnumber + "_1.png"
    document.getElementById("dollimage").src = imagepath;
  }
  else if (isdamage==false) {
    isdamage=true;
    imagepath = imagepath + currentnumber + ".png"
    document.getElementById("dollimage").src = imagepath;
}
}