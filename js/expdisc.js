var dollAccExp = new Array();
dollAccExp[0] = 0;
dollAccExp[1] = 0;
dollAccExp[2] = 100;
dollAccExp[3] = 300;
dollAccExp[4] = 600;
dollAccExp[5] = 1000;
dollAccExp[6] = 1500;
dollAccExp[7] = 2100;
dollAccExp[8] = 2800;
dollAccExp[9] = 3600;
dollAccExp[10] = 4500;
dollAccExp[11] = 5500;
dollAccExp[12] = 6600;
dollAccExp[13] = 7800;
dollAccExp[14] = 9100;
dollAccExp[15] = 10500;
dollAccExp[16] = 12000;
dollAccExp[17] = 13600;
dollAccExp[18] = 15300;
dollAccExp[19] = 17100;
dollAccExp[20] = 19000;
dollAccExp[21] = 21000;
dollAccExp[22] = 23100;
dollAccExp[23] = 25300;
dollAccExp[24] = 27600;
dollAccExp[25] = 30000;
dollAccExp[26] = 32500;
dollAccExp[27] = 35100;
dollAccExp[28] = 37900;
dollAccExp[29] = 41000;
dollAccExp[30] = 44400;
dollAccExp[31] = 48600;
dollAccExp[32] = 53200;
dollAccExp[33] = 58200;
dollAccExp[34] = 63600;
dollAccExp[35] = 69400;
dollAccExp[36] = 75700;
dollAccExp[37] = 82400;
dollAccExp[38] = 89600;
dollAccExp[39] = 97300;
dollAccExp[40] = 105500;
dollAccExp[41] = 114300;
dollAccExp[42] = 123600;
dollAccExp[43] = 133500;
dollAccExp[44] = 144000;
dollAccExp[45] = 155100;
dollAccExp[46] = 166900;
dollAccExp[47] = 179400;
dollAccExp[48] = 192500;
dollAccExp[49] = 206400;
dollAccExp[50] = 221000;
dollAccExp[51] = 236400;
dollAccExp[52] = 252500;
dollAccExp[53] = 269400;
dollAccExp[54] = 287100;
dollAccExp[55] = 305700;
dollAccExp[56] = 325200;
dollAccExp[57] = 345600;
dollAccExp[58] = 366900;
dollAccExp[59] = 389200;
dollAccExp[60] = 412500;
dollAccExp[61] = 436800;
dollAccExp[62] = 462100;
dollAccExp[63] = 488400;
dollAccExp[64] = 515800;
dollAccExp[65] = 544300;
dollAccExp[66] = 573900;
dollAccExp[67] = 604700;
dollAccExp[68] = 636700;
dollAccExp[69] = 669900;
dollAccExp[70] = 704300;
dollAccExp[71] = 749400;
dollAccExp[72] = 796200;
dollAccExp[73] = 844800;
dollAccExp[74] = 895200;
dollAccExp[75] = 947400;
dollAccExp[76] = 1001400;
dollAccExp[77] = 1057300;
dollAccExp[78] = 1115200;
dollAccExp[79] = 1175000;
dollAccExp[80] = 1236800;
dollAccExp[81] = 1300700;
dollAccExp[82] = 1366700;
dollAccExp[83] = 1434800;
dollAccExp[84] = 1505100;
dollAccExp[85] = 1577700;
dollAccExp[86] = 1652500;
dollAccExp[87] = 1729600;
dollAccExp[88] = 1809100;
dollAccExp[89] = 1891000;
dollAccExp[90] = 1975300;
dollAccExp[91] = 2087900;
dollAccExp[92] = 2204000;
dollAccExp[93] = 2323500;
dollAccExp[94] = 2446600;
dollAccExp[95] = 2573300;
dollAccExp[96] = 2703700;
dollAccExp[97] = 2837800;
dollAccExp[98] = 2975700;
dollAccExp[99] = 3117500;
dollAccExp[100] = 3263200;
dollAccExp[101] = 3363200;
dollAccExp[102] = 3483200;
dollAccExp[103] = 3623200;
dollAccExp[104] = 3783200;
dollAccExp[105] = 3963200;
dollAccExp[106] = 4163200;
dollAccExp[107] = 4383200;
dollAccExp[108] = 4623200;
dollAccExp[109] = 4903200;
dollAccExp[110] = 5263200;
dollAccExp[111] = 5743200;
dollAccExp[112] = 6383200;
dollAccExp[113] = 7283200;
dollAccExp[114] = 8483200;
dollAccExp[115] = 10083200;
dollAccExp[116] = 12283200;
dollAccExp[117] = 15283200;
dollAccExp[118] = 19283200;
dollAccExp[119] = 24283200;
dollAccExp[120] = 30283200;

document.getElementById("nowLv").addEventListener("keyup", calc);
document.getElementById("targetLv").addEventListener("keyup", calc);
document.getElementById("oath").addEventListener("change", calc);

function calc() {
	var nowLv = document.getElementById("nowLv").value;
	var targetLv = document.getElementById("targetLv").value;
	var oath = document.getElementById("oath").checked + 1;
	var report = 0;
	var temp = 0;
	var nowExp = 0;

	if(dollAccExp[nowLv+1] - dollAccExp[nowLv] > nowExp && nowExp >= 0 && targetLv > nowLv) {
		if(targetLv > 115) {
			temp = nowLv > 115 ? nowLv : 115;
			report += Math.ceil((dollAccExp[targetLv] - dollAccExp[temp]) / (3000 * oath));
			targetLv = 115;
		}
		if(targetLv > 110 && nowLv < 115) {
			temp = nowLv > 110 ? nowLv : 110;
			report += Math.ceil((dollAccExp[targetLv] - dollAccExp[temp]) / (3000 * oath));
			targetLv = 110;
		}
		if(targetLv > 100 && nowLv < 110) {
			temp = nowLv > 100 ? nowLv : 100;
			report += Math.ceil((dollAccExp[targetLv] - dollAccExp[temp]) / (3000 * oath));
			targetLv = 100;
		}
		if(targetLv <= 100 && nowLv < 100) {
			report += Math.ceil((dollAccExp[targetLv] - dollAccExp[nowLv]) / 3000);
		}

		document.getElementById("result").innerText = report;
	}
}
