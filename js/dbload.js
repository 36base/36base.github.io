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
    url:"../doll.json",
    success:function(json){
      var listLen = json.length;
      currentnumber = number;
      for(var i=0; i<listLen; i++){
        if (json[i].id == number) {
          document.getElementById("dollname").innerHTML = json[i].name;
          document.getElementById("illustratorname").innerHTML = json[i].illust;
          document.getElementById("voicename").innerHTML = json[i].voice;
          document.getElementById("hpvalue").innerHTML = json[i].stats.hp;
          document.getElementById("dodgevalue").innerHTML = json[i].stats.dodge;
          document.getElementById("hitvalue").innerHTML = json[i].stats.hit;
          document.getElementById("powvalue").innerHTML = json[i].stats.pow;
          document.getElementById("ratevalue").innerHTML = json[i].stats.rate;
          document.getElementById("speedvalue").innerHTML = json[i].stats.speed;
          document.getElementById("armorvalue").innerHTML = json[i].stats.armor;
          document.getElementById("critvalue").innerHTML = json[i].stats.crit;
          buildtime = new Date(json[i].buildTime * 1000).toISOString().substr(11, 8);
          document.getElementById("buildtime").innerHTML = buildtime;
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
    imagepath = imagepath + currentnumber + ".png";
    document.getElementById("dollimage").src = imagepath;
  }
  else if (isdamage==false) {
    isdamage=true;
    imagepath = imagepath + currentnumber + "_D.png";
    document.getElementById("dollimage").src = imagepath;
}
}

