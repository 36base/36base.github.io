var expTable=[0,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2800,3100,3400,4200,4600,5000,5400,5800,6300,6700,7200,7700,8200,8800,9300,9900,10500,11100,11800,12500,13100,13900,14600,15400,16100,16900,17700,18600,19500,20400,21300,22300,23300,24300,25300,26300,27400,28500,29600,30800,32000,33200,34400,45100,46800,48600,50400,52200,54000,55900,57900,59800,61800,63900,66000,68100,70300,72600,74800,77100,79500,81900,84300,112600,116100,119500,123100,126700,130400,134100,137900,141800,145700];

	$(document).ready(function(){

		$('.submit').click(function(){
			$('.resultArea').hide();
			var currentLevel = Number( $('input[name=currentLevel]').val() );
			var currentExp = Number( $('input[name=currentExp]').val() );
			var targetLevel = Number( $('input[name=targetLevel]').val() );

			if ( targetLevel > 100 ) {
				alert('100 이하의 레벨을 입력해주세요.');
				return false;
			}
			var totalexp = 0;
			for(i=currentLevel;i<targetLevel;i++) {
				totalexp+=expTable[i];
			}
			totalexp-=currentExp;

			var requiredDisc = Math.ceil(totalexp/3000);
			$(".resultArea").html("남은 경험치 : "+totalexp+"<br>필요한 보고서 개수 : "+requiredDisc+"개");

			$('.resultArea').show();
			return false;
		});
	});