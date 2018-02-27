
let OperList = [];

function timeStrToNum(timeStr) {
  let res = timeStr.split(":");
  return parseInt(res[0])*60+parseInt(res[1]);
}
function timeNumToStr(timeNum) {
  let hourStr = Math.floor(timeNum/60).toString();
  if(hourStr.length == 1) hourStr = "0" + hourStr;

  let minStr = (timeNum%60).toString();
  if(minStr.length == 1) minStr = minStr + "0";
  
  return hourStr + ":" + minStr;
}

class OperData
{
	constructor(data)
	{//군수지원 이름, 얻는 자원 목록, 얻는 계약 목록, 걸리는 시간(분)
		this.number   = data.number;
    this.title    = data.title;
		this.resource = data.resource;
		this.reward   = data.reward;

		this.time     = data.time;
		//if(isAddCoListToReList)
		//	this.coListSet();
	}
}

class SumData
{
	constructor(d1,d2,d3,d4)
	{
		this.name = d1.number + " " + d2.number + " " + d3.number + " " + d4.number;
		this.resourcePerTime = {
      "manpower" : 0,
      "ammo" : 0,
      "food" : 0,
      "part" : 0
    }
		this.dataList  = [d1,d2,d3,d4];
		this.SortValue = 0

    for(let i = 0; i< this.dataList.length; i++) {
      this.resourcePerTime.manpower += this.dataList[i].resource.manpower * (60 / this.dataList[i].time);
      this.resourcePerTime.ammo     += this.dataList[i].resource.ammo * (60 / this.dataList[i].time);
      this.resourcePerTime.food     += this.dataList[i].resource.food * (60 / this.dataList[i].time);
      this.resourcePerTime.part     += this.dataList[i].resource.part * (60 / this.dataList[i].time);
    }
	}

	getSortValue(weight)
	{
		if(this.SortValue == 0)
		{
			this.SortValue =
				(this.resourcePerTime.manpower * weight.manpower)+
				(this.resourcePerTime.ammo * weight.ammo)+
				(this.resourcePerTime.food * weight.food)+
				(this.resourcePerTime.part * weight.part);
		}
		return this.SortValue;
	}
}

function repeat(val,time)
{
  if(time>0) {
    val.time = Math.ceil(val.time / time)*time;
  }
	return new OperData(val);
}

function recommendLogisticSupport(resourceWeight, repeatTime) {
	var result = [];
	tmpindex=[3,2,1,0];
	indexInt = 0;
	while(true)
	{
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

		var sumData = new SumData(
			repeat(OperList[index[0]],repeatTime),
			repeat(OperList[index[1]],repeatTime),
			repeat(OperList[index[2]],repeatTime),
			repeat(OperList[index[3]],repeatTime));

		result.push(sumData);
		if(result.length < 2)continue;
		for(var i=result.length-1;i>0;i--)//버블소트 하고
		{
			if(result[i].getSortValue(resourceWeight) > result[i-1].getSortValue(resourceWeight))
			{
				var swap = result[i];
				result[i] = result[i-1];
				result[i-1] = swap;
			}
		}
		if(result.length>10) { result.pop(); }
	}

  return result;
}
