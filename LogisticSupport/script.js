
window.onload = function() {

  require(["data.js"], function(data) {
    const areas = data.areas;

    const logisticSupportListTable = document.getElementById("logistic-support-list-table");

    const formSelectAvailableArea  = document.getElementById("form-logistic-support-available-area");

    let areaNum = 0;
    areas.forEach(function(area) {
      const newArea = document.createElement('div');
      newArea.className = "row";

      let itemNum = 1;
      area.forEach(function(item) {
        item.number = areaNum + '-' + itemNum;

        logisticSupportListTable.innerHTML += renderTemplate(
          document.getElementById("template-logistic-support-table-item").innerHTML,
          item
        );

        item.time = timeStrToNum(item.time);

        OperList.push(new OperData(item));

        itemNum++;
      });

      const newSelectOption = document.createElement('option');
      newSelectOption.innerHTML = areaNum;
      if(areaNum === (areas.length - 1)) { newSelectOption.setAttribute('selected', ''); }

      formSelectAvailableArea.appendChild(newSelectOption);

      areaNum++;
    });
  });

  document.getElementById('form-logistic-support-recommend-button').addEventListener("click", function(){

    const resourceWeight = {
      "manpower" : document.getElementById("form-logistic-support-resource-manpower").value,
      "ammo"     : document.getElementById("form-logistic-support-resource-ammo").value,
      "food"     : document.getElementById("form-logistic-support-resource-food").value,
      "part"     : document.getElementById("form-logistic-support-resource-part").value
    }
    const repeatTime = document.getElementById("form-logistic-support-delay");

    const result = recommendLogisticSupport(resourceWeight, repeatTime);


    let logisticSupportResultListTable = document.getElementById("logistic-support-result-list-table");

    $(logisticSupportResultListTable).children('tr').remove();

    result[0].dataList.forEach(function(dataItem) {
      dataItem.time = timeNumToStr(dataItem.time);
      
      logisticSupportResultListTable.innerHTML += renderTemplate(
        document.getElementById("template-logistic-support-result-table-item").innerHTML,
        dataItem
      );
    });

    layer_popup($('#logistic-support-result'));
  });
}


function layer_popup(target){
  var target = $(target);        //레이어의 id를 $el 변수에 저장
  var isDim = target.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

  isDim ? $('.dim-layer').fadeIn() : target.fadeIn();

  var targetWidth = ~~(target.outerWidth()),
      targetHeight = ~~(target.outerHeight()),
      docWidth = $(document).width(),
      docHeight = $(document).height();

  // 화면의 중앙에 레이어를 띄운다.
  if (targetHeight < docHeight || targetWidth < docWidth) {
    target.css({
      marginTop: -targetHeight /2,
      marginLeft: -targetWidth/2
    })
  }
  else {
    target.css({top: 0, left: 0});
  }

  target.find('button.pop-closeBtn').click(function(){
    isDim ? $('.dim-layer').fadeOut() : target.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
    return false;
  });

  $('.layer .dimBg').click(function(){
    $('.dim-layer').fadeOut();
    return false;
  });
}
