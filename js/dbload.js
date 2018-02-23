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
      for(var i=0; i<listLen; i++){
        if (json[i].number == number) {
          document.getElementById("dollname").innerHTML = json[i].name;
        }
        else{
          console.log("Error?")
        }
      }
    }
  })
};