var gvHandler = {
  saveStage : function(gameview) {
    var jsonData = {
      'ro': [],
      'bg': ''
    };
    for (i in gameview.role) {
      jsonData.ro.push({
        'name' : gameview.role[i].stateData.skeletonData.code,
        'skin' : gameview.role[i].stateData.skeletonData.skin,
        'x' : gameview.role[i].x,
        'y' : gameview.role[i].y,
        'scale' : gameview.role[i].scale.x,
        'animation' : gameview.role[i].animation
      });
    }
    jsonData.bg = gameview.background.filename;
    var jsonString = JSON.stringify(jsonData);
    var shareUrl = location.protocol+'//'+location.host+location.pathname + '#' + encodeURIComponent(jsonString);
    alert(shareUrl);
  },

  savePng : function(gameview) {
    if (confirm("이미지는 하단에 출력됩니다. 아래 그림을 클릭 후 이미지를 마우스 오른쪽 버튼으로 클릭해 저장할 수 있습니다. 모바일은 이미지를 길게 눌러주세요.")) {
      var renderTexture = new PIXI.RenderTexture(gameview.renderer, 1920, 1080);
      renderTexture.render(gameview.stage);
      var canvas = renderTexture.getCanvas();
      $('#saveImage').attr('src', canvas.toDataURL('image/png')).show();
    }
  }
};

game.setGameviewHandler(gvHandler);
