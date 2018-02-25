var imagepath = "images/dolls/";
var isdamage = false;
var currentnumber;
var drop = "";
var currentskinindex = 0;
var isskin = false;

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

          for (var s=0; s<json[i].skins.length; s++) {
            btnstr = '<a class="btn btn-secondary" id="skin' + (s+1) + '" onclick="toggleSkin(' + (s+1) + ')">' + json[i].skins[s] + '</a>\n';
            $(".skintoggle").append(btnstr);
          }

          if(json[i].voice=="" || json[i].voice=="/"){
            document.getElementById("voicename").innerHTML = "보이스 없음";
          } else {
            document.getElementById("voicename").innerHTML = json[i].voice;
          }

          for (var t=0; t<json[i].drop.length; t++) {
            drop = drop + json[i].drop[t] + ", "
          }
          drop = drop.slice(0, -2);
          document.getElementById("drop").innerHTML = drop;

          document.getElementById("hpvalue").innerHTML = json[i].stats.hp;
          document.getElementById("dodgevalue").innerHTML = json[i].stats.dodge;
          document.getElementById("hitvalue").innerHTML = json[i].stats.hit;
          document.getElementById("powvalue").innerHTML = json[i].stats.pow;
          document.getElementById("ratevalue").innerHTML = json[i].stats.rate;
          document.getElementById("speedvalue").innerHTML = json[i].stats.speed;
          document.getElementById("armorvalue").innerHTML = json[i].stats.armor;
          document.getElementById("critvalue").innerHTML = json[i].stats.crit+"%";

          if(json[i].buildTime==0) {
            document.getElementById("buildtime").innerHTML = "제작 불가";
          } else {
            buildtime = new Date(json[i].buildTime * 1000).toISOString().substr(11, 8);
            document.getElementById("buildtime").innerHTML = buildtime;
          }

          imagepath = imagepath + number + ".png";
          document.getElementById("dollimage").src = imagepath;
        }
      }
    }
  })
};

function damageToggle(){
  imagepath = "images/dolls/";
  if (currentskinindex==0){
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
  else {
    if (isdamage==true) {
      isdamage=false;
      imagepath = imagepath + currentnumber + "_" + currentskinindex + ".png";
      document.getElementById("dollimage").src = imagepath;
    }
    else if (isdamage==false) {
      isdamage=true;
      imagepath = imagepath + currentnumber + "_" + currentskinindex + "_D.png";
      document.getElementById("dollimage").src = imagepath;
    }
  }
}

function toOriginal() {
  if (isskin) {
    imagepath = "images/dolls/";
    isskin = false;
    currentskinindex=0;
    imagepath = imagepath + currentnumber + ".png";
    document.getElementById("dollimage").src = imagepath;
  }
  else {
    return
  }
}

function toggleSkin(skinidex) {
  isskin = true;
  imagepath = "images/dolls/";
  currentskinindex = skinidex;
  imagepath = imagepath + currentnumber + "_" + skinidex + ".png";
  document.getElementById("dollimage").src = imagepath;
}