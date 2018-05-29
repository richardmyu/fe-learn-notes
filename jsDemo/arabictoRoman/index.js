/*
功能：将任意一个小于10000的阿拉伯数字转换为罗马数字
*/

//将任意阿拉伯数值转换为按位排序的数组（数组内每一项为阿拉伯数字的每一位的字符串表示）
//再将数字转化为对应的罗马字符
//此处将用统一的字符表示来代替阿拉伯数字
function toStringRoman(num) {
    var str = num.toString();
    str = str.split("");
    for (var i = 0; i <= str.length; i++) {
        if (str[i] === "1") {
            str[i] = str[i].replace("1", "I");
        } else if (str[i] === "2") {
            str[i] = str[i].replace("2", "II");
        } else if (str[i] === "3") {
            str[i] = str[i].replace("3", "III");
        } else if (str[i] === "4") {
            str[i] = str[i].replace("4", "IV");
        } else if (str[i] === "5") {
            str[i] = str[i].replace("5", "V");
        } else if (str[i] === "6") {
            str[i] = str[i].replace("6", "VI");
        } else if (str[i] === "7") {
            str[i] = str[i].replace("7", "VII");
        } else if (str[i] === "8") {
            str[i] = str[i].replace("8", "VIII");
        } else if (str[i] === "9") {
            //鉴于9会涉及下一层次的字符，为了避免后面转换字符冲突，故用特定字符统一表示
            str[i] = str[i].replace("9", "RO");
        } else if (str[i] === "0") {
            //0在罗马数字中没有对应的符号表示，故指定字符来占位
            str[i] = str[i].replace("0", "Zore");
        }
    }
    return str;
}

//根据位的不同，替换成对应的高位字符
function generateRoman(str) {
    if (str.length === 4) {
        str[0] = str[0] ? str[0].replace(/I/g, "M").replace("V", "_V").replace("RO", "M_X") : str[0];
        str[1] = str[1] ? str[1].replace(/I/g, "C").replace("V", "D").replace("RO", "CM") : str[1];
        str[2] = str[2] ? str[2].replace(/I/g, "X").replace("V", "L").replace("RO", "XC") : str[2];
        str[3] = str[3] ? str[3].replace("RO", "IX") : str[3];
        return str = "" + str[0] + str[1] + str[2] + str[3];
    } else if (str.length === 3) {
        str[0] = str[0] ? str[0].replace(/I/g, "C").replace("V", "D").replace("RO", "CM") : str[0];
        str[1] = str[1] ? str[1].replace(/I/g, "X").replace("V", "L").replace("RO", "XC") : str[1];
        str[2] = str[2] ? str[2].replace("RO", "IX") : str[2];
        return str = "" + str[0] + str[1] + str[2];
    } else if (str.length === 2) {
        str[0] = str[0] ? str[0].replace(/I/g, "X").replace("V", "L").replace("RO", "XC") : str[0];
        str[1] = str[1] ? str[1].replace("RO", "IX") : str[1];
        return str = "" + str[0] + str[1];
    } else if (str.length === 1) {
        str[0] = str[0] ? str[0].replace("RO", "IX") : str[0];
        return str = "" + str[0];
    }
}

function toRoman(num) {
    if (num >= 10000) {
        return "error:输入的数超出范围";
    } else {
        //将占位的0标识符去掉
        return generateRoman(toStringRoman(num)).replace("Zore", "");
    }
}

console.log(toRoman(19)); //XIX
console.log(toRoman(20)); //XX
console.log(toRoman(45)); //XLV
console.log(toRoman(908)); //CMVIII
console.log(toRoman(1980)); //MCMLXXX
console.log(toRoman(5980)); //_VCMLXXX