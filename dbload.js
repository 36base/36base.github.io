$(document).ready(function(){
  $.ajax({
    type:"GET",
    url:"dolldb.json",
    success:function(json){
      var listLen = json.length;
      var contentStr = "";
      for(var i=0; i<listLen; i++){
        console.log(json[i].name);
        console.log(json[i].skilldetail);
      }
    }
  })
});