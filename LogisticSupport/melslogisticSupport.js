function V(n,val){return {name:n,value:val};}
function 인력(value){return V("인력",value);}
function 탄약(value){return V("탄약",value);}
function 식량(value){return V("식량",value);}
function 부품(value){return V("부품",value);}
function 인형(value){return V("인형",value);}
function 수복(value){return V("수복",value);}
function 제조(value){return V("제조",value);}
function 장비(value){return V("장비",value);}
function 토큰(value){return V("토큰",value);}
function 인탄식부(v1,v2,v3,v4){return [인력(v1),탄약(v2),식량(v3),부품(v4)];}
function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}

//---------------------
//옵션
var isAddCoListToReList = false;
var SortOptionList = ["n배_합산","n승방식_합산"];
var SortOption = SortOptionList[0];


//---------------------

class OperData
{//군수지원 정보
	constructor(name,reList,coList,time,parent)
	{//군수지원 이름, 얻는 자원 목록, 얻는 계약 목록, 걸리는 시간(분)
		this.name = name;
		this.reList = reList;
		this.coList = coList;
		this.time = time;
		this.parent = parent;//원본
		if(isAddCoListToReList)
			this.coListSet();
	}


	coListSet()
	{//얻는 계약 정리
		var suc = 0.24;
		if(this.coList.length == 1)
			this.reList.push(V(this.coList[0],suc + (1-suc)*0.5));
		else if(this.coList.length == 2)
		{
			this.reList.push(V(this.coList[0],0.5));
			this.reList.push(V(this.coList[1],0.5));
		}
	}
	/* 계약 얻는양 계산법은 순전히 예상치임
	확률이 어떻게 되는지전혀 모르기에
	두칸중 한칸을 반반의 확률로 가져온다 라고 가정하고 계산


	계약이 하나만 있으면
	성공시	계약1 50%  빈칸 50%
	대성공시	계약1 100%
	대성공 확률이 n% 일 경우
	(1-n)%확률로성공시	계약1 (1-n)*50%  빈칸 50%
	n%확률로   대성공시	계약1 n%
	 => 계약1은 n + (1-n)*50 % 의 확률로 얻어올 것으로 생각


	계약이 두개다 있으면
	성공해도 계약1 50%  계약2 50%
	대성공도 계약1 50%  계약2 50%
	 => 계약1 50%  계약2 50%  의 확률로 얻어올 것으로 생각

	 이렇게 1회당 얻어올 예상치를 소숫점 단위로 계산하여
	 자원 목록에 추가하여 군수지원에서 계약도 얻는 양을 비슷하게 계산 가능하리라 봄

	 군수지원 계산기에서 계약들을 계산하지 않으려면
	isAddCoListToReList 값을 false로 할것
	*/

	str()
	{
		var str = this.name+"[";
		for(var i=0;i<this.reList.length;i++)
		{
			str += this.reList[i].name+":"+this.reList[i].value+"     ";
		}
		str += "]";
		return str;
	}
}

function repeat(val,time)
{//군수지원을 몇분 단위로 체크해서 돌려보낼것인가를 계산하기 위한 함수
	return new OperData(
		val.name,
		val.reList,
		[],
		Math.ceil(val.time / time)*time,
		val);
}/*
	군수지원이 걸리는 시간을 그 time 단위에 맞춰서 올림함
	30분 단위일땐
	30=>30 ,31=>60  이 되는것처럼
*/

class SumData
{//군수지원 4개를 합친 값
	constructor(d1,d2,d3,d4)
	{
		this.name = d1.name+" "+d2.name+" "+d3.name+" "+d4.name;
		this.reMap = new Map();
		this.dataList = [d1,d2,d3,d4];
		for(var i=0;i<this.dataList.length;i++)
		{
			this.addReList(this.dataList[i].reList,this.dataList[i].time);
		}
		this.SortValue = 0;
		/*
		name : 6-1 7-1 8-1 10-3 이런식으로 표시됨
		dataList : 군수지원 4개를 담아놓은 배열
		reMap : 얻는 자원을 정리해서 계산하기 위한 해쉬맵
		*/
	}

	addReList(list,time)
	{//자원을 1시간당 몇을 얻는지 확인하고 더함
		for(var i = 0; i < list.length;i++)
		{
			var tmp = this.reMap.get(list[i].name);
			if(tmp == undefined)tmp = 0;
			this.reMap.set(list[i].name,list[i].value * (60 / time) + tmp);
		}
	}

	overCondition(list)
	{//list = 필요충족조건 자원량, 조건을 넘는가를 확인
		for(var i = 0; i < list.length;i++)
		{
			var tmp = this.reMap.get(list[i].name);
			if(tmp == undefined)
				tmp = 0;
			if(tmp < (list[i].value))
				return false;
		}
		return true;
	}

	GetSortValue()
	{//정렬용 기준값 계산법
		if(this.SortValue == 0)
		{
			if(SortOption == "n배_합산")
			{
				this.SortValue =
					(this.reMap.get(multiple[0].name) * multiple[0].value)+
					(this.reMap.get(multiple[1].name) * multiple[1].value)+
					(this.reMap.get(multiple[2].name) * multiple[2].value)+
					(this.reMap.get(multiple[3].name)*3*multiple[3].value);//부품
			}
			else if(SortOption == "n승방식_합산")
			{
				this.SortValue = (
			Math.pow(this.reMap.get(multiple[0].name)/100  +10,multiple[0].value)+
			Math.pow(this.reMap.get(multiple[1].name)/100  +10,multiple[1].value)+
			Math.pow(this.reMap.get(multiple[2].name)/100  +10,multiple[2].value)+
			Math.pow(this.reMap.get(multiple[3].name)*3/100+10,multiple[3].value));
			}
		}
		return	this.SortValue;
	}

	log()
	{
		var str = "";
		for(var i=0;i<this.dataList.length;i++)str+=this.dataList[i].name+" ";
		str += "\tGetSortValue="+Math.round(this.GetSortValue())+";  ";
		var iterator1 = this.reMap.entries();
		for(var iter = iterator1.next();iter.done == false;iter = iterator1.next())
			str += "["+iter.value[0]+":"+precisionRound(iter.value[1],2)+"]   ";
		return str;
	}
}

function _Time(h,m){	return h*60+m;}

var OperList = [
new OperData("0-1",	인탄식부(0,145,145,0),			["제조",	"수복"]	,_Time(0 ,50)),
new OperData("0-2",	인탄식부(550,0,0,350),			["인형"]			,_Time(3 ,0 )),
new OperData("0-3",	인탄식부(900,900,900,250),		["장비",	"수복"]	,_Time(12,0 )),
new OperData("0-4",	인탄식부(0,1200,800,750),		["토큰"]			,_Time(24,0 )),
new OperData("1-1",	인탄식부(10,30,15,0),			[]				,_Time(0 ,15)),
new OperData("1-2",	인탄식부(0,40,60,0),			[]				,_Time(0 ,30)),
new OperData("1-3",	인탄식부(30,0,30,10),			["수복"]			,_Time(1 ,0 )),
new OperData("1-4",	인탄식부(160,160,0,0),			["인형"]			,_Time(2 ,0 )),
new OperData("2-1",	인탄식부(100,0,0,30),			[]				,_Time(0 ,40)),
new OperData("2-2",	인탄식부(60,200,80,0),			["수복"]			,_Time(1 ,30)),
new OperData("2-3",	인탄식부(10,10,10,230),		["제조",	"수복"]	,_Time(4 ,0 )),
new OperData("2-4",	인탄식부(0,250,600,60),		["인형"]			,_Time(6 ,0 )),
new OperData("3-1",	인탄식부(50,0,75,0),			[]				,_Time(0 ,20)),
new OperData("3-2",	인탄식부(0,120,70,30),			[]				,_Time(0 ,45)),
new OperData("3-3",	인탄식부(0,300,0,0),			["제조",	"수복"]	,_Time(1 ,30)),
new OperData("3-4",	인탄식부(0,0,300,300),			["인형",	"장비"]	,_Time(5 ,0 )),
new OperData("4-1",	인탄식부(0,185,185,0),			["장비"]			,_Time(1 ,0 )),
new OperData("4-2",	인탄식부(0,0,0,210),			["제조"]			,_Time(2 ,0 )),
new OperData("4-3",	인탄식부(800,550,0,0),			["인형",	"수복"]	,_Time(6 ,0 )),
new OperData("4-4",	인탄식부(400,400,400,150),		["제조"]			,_Time(8 ,0 )),
new OperData("5-1",	인탄식부(0,0,100,45),			[]				,_Time(0 ,30)),
new OperData("5-2",	인탄식부(0,600,300,0),			["수복"]			,_Time(2 ,30)),
new OperData("5-3",	인탄식부(800,400,400,0),		["장비"]			,_Time(4 ,0 )),
new OperData("5-4",	인탄식부(100,0,0,700),			["인형"]			,_Time(7 ,0 )),
new OperData("6-1",	인탄식부(300,300,0,100),		[]				,_Time(2 ,0 )),
new OperData("6-2",	인탄식부(0,200,550,100),		["제조",	"수복"]	,_Time(3 ,0 )),
new OperData("6-3",	인탄식부(0,0,200,500),			["장비"]			,_Time(5 ,0 )),
new OperData("6-4",	인탄식부(800,800,800,0),		["토큰"]			,_Time(12,0 )),
new OperData("7-1",	인탄식부(650,0,650,0),			[]				,_Time(2 ,30)),
new OperData("7-2",	인탄식부(0,650,0,300),			["인형",	"수복"]	,_Time(4 ,0 )),
new OperData("7-3",	인탄식부(900,600,600,0),		["장비"]			,_Time(5 ,30)),
new OperData("7-4",	인탄식부(250,250,250,600),		["제조"]			,_Time(8 ,0 )),
new OperData("8-1",	인탄식부(150,150,150,0),		["장비"]			,_Time(1 ,0 )),
new OperData("8-2",	인탄식부(0,0,0,450),			["수복"]			,_Time(3 ,0 )),
new OperData("8-3",	인탄식부(400,800,800,0),		["제조",	"수복"]	,_Time(6 ,0 )),
new OperData("8-4",	인탄식부(1500,400,400,100),	["인형"]			,_Time(9 ,0 )),
new OperData("9-1",	인탄식부(0,0,100,50),			[]				,_Time(0 ,30)),
new OperData("9-2",	인탄식부(180,0,180,100),		["제조"]			,_Time(1 ,30)),
new OperData("9-3",	인탄식부(750,750,0,0),			["인형"]			,_Time(4 ,30)),
new OperData("9-4",	인탄식부(500,900,900,0),		["장비"]			,_Time(7 ,0 )),
new OperData("10-1",인탄식부(140,200,0,0),			[]				,_Time(0 ,40)),
new OperData("10-2",인탄식부(0,240,180,0),			["인형",	"제조"]	,_Time(1 ,40)),
new OperData("10-3",인탄식부(0,480,480,300),		["제조",	"수복"]	,_Time(5 ,20)),
new OperData("10-4",인탄식부(660,660,660,330),		["장비"]			,_Time(10,0 ))
];
/*
인형 : 인형제조계약
장비 : 장비제조계약
제조 : 쾌속제조계약
수복 : 쾌속수복계약
토큰 : 구매토큰
*/
var list = [];
var tmpindex=[3,2,1,0];
var multiple=인탄식부(0,7,10,1);
var valueNeedto=인탄식부(0,500,500,100);
var indexInt = 0;
var indexMax = OperList.length*(OperList.length-1)*(OperList.length-2)*(OperList.length-3);
var succesePer = 0.6;
var repeatTime = 30;
var _break = false;

var logic = function()
{
	result = [];
	tmpindex=[3,2,1,0];
	indexInt = 0;
	while(true)
	{
		if(_break)break;
		indexInt++;
		tmpindex[0]++;
		if(tmpindex[0]==OperList.length){tmpindex[1]++;														tmpindex[0]=tmpindex[1]+1;}
		if(tmpindex[0]==OperList.length){tmpindex[2]++;							  tmpindex[1]=tmpindex[2]+1;tmpindex[0]=tmpindex[1]+1;}
		if(tmpindex[0]==OperList.length){tmpindex[3]++;	tmpindex[2]=tmpindex[3]+1;tmpindex[1]=tmpindex[2]+1;tmpindex[0]=tmpindex[1]+1;}
		if(tmpindex[0]==OperList.length)break;
		//인덱스 증가

		if(	tmpindex[0] == tmpindex[1] || tmpindex[0] == tmpindex[2] ||
			tmpindex[0] == tmpindex[3] || tmpindex[1] == tmpindex[2] ||
			tmpindex[1] == tmpindex[3] || tmpindex[2] == tmpindex[3])
			continue;//같은 군수지원 2개 중복계산 되는거 방지

		var index=[];
		for(var i=0;i<4;i++)index[i] = tmpindex[i];

		if(indexInt % 5000 == 0)//진행도 확인용
			console.log(index[3]);//콘솔창에서 돌리면 0 1 2 3 4 5 6 7 8 9 10 12 막 이런거 나옴 걱정 ㄴㄴ


		var sum4 = new SumData(
			repeat(OperList[index[0]],repeatTime),
			repeat(OperList[index[1]],repeatTime),
			repeat(OperList[index[2]],repeatTime),
			repeat(OperList[index[3]],repeatTime));//합쳐놓고
		if(sum4. overCondition(valueNeedto) == true)//조건보다 높은가
		{
			result[result.length] = sum4;//끝에 넣고
			if(result.length < 2)continue;
			for(var i=result.length-1;i>0;i--)//버블소트 하고
			{
				if(result[i].GetSortValue() > result[i-1].GetSortValue())
				{
					var swap = result[i];
					result[i] = result[i-1];
					result[i-1] = swap;
				}
			}
			if(result.length>10)//11개부터 제일 작은 1개 다시 자름
				result.pop();
		}
	}

	for(var i=0;i<result.length;i++)
	{
		var tmpVar = result[i];
		console.log(tmpVar.log());
	}
}

repeatTime = 60;
multiple=인탄식부(5,5,5,5);
valueNeedto=[인력(400), 탄약(200),식량(200),부품(100),인형(0),수복(0),제조(0),장비(0),토큰(0)];
logic();
