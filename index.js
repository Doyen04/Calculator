// Created by D Doyen

function date() {
    var head = document.getElementsByTagName("header")[0]
    var d = new Date()
    var secs = d.getSeconds()
    var min = d.getMinutes()
    var hour = d.getHours()
    head.innerHTML = hour + ":" + min + ":" + secs
}
setInterval(date, 1000)

var starter = false
var ans
function equal() {
    var letterview = document.getElementById("letterview")
    var hideview = document.getElementById("hideview")
    var answer = document.getElementById("answer")
    var store = document.getElementById("store")
    if (starter) {
        for (var i = 0; i < hideview.value.split("(").length - hideview.value.split(")").length; i++) {
            hideview.value += ")";
        }

        if (hideview.value) {
            try {
                ans = eval(hideview.value
                    .replace(/(\d+\.?\d*)\!/g, "factorial($1)")
                    .replace(/(\(?[^(]*\)?)\^(\(?.*\)?)/, "Math.pow($1, $2)")
                    .replace(/(\d+\.?\d*)e(\d+)[\s\*\+\-\/]?/i, "$1*Math.pow(10,$2)")
                    .replace(/[\*\/\+\-]?(\d+)\u207B\u00B9/i, "Math.pow($1,-1)")
                );
            }
            catch (e) {
                letterview.style.textAlign = "center"
                letterview.value = 'Syntax Error!';
                ans = ""
                setTimeout(cleared, 1000)
            }
        }
        if (ans == undefined) {
            letterview.style.textAlign = "center"
            letterview.value = "Syntax Error"
            setTimeout(cleared, 1000)
        }
        else if (ans == Infinity) {
            letterview.style.textAlign = "center"
            letterview.value = "Math Error"
            setTimeout(cleared, 1000)
        } else {
            var aser = Math.floor(ans * 1000000) / 1000000
            if (aser == 0) {
                aser = ""
                answer.innerHTML = aser
            } else {
                answer.innerHTML = aser
            }
            store.innerHTML = ans
        }
    }
}
function factorial(shirious) {
    if (Number.isInteger(shirious)) {
        if (shirious < 2) return 1;
        return shirious * factorial(shirious - 1);
    }
}
function answ() {
    var letterview = document.getElementById("letterview")
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    if (starter) {
        if (answer.innerHTML == "" && letterview.value != "" && ans != undefined) {
            letterview.value += "Ans"
            answer.innerHTML = ""
            hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
                "*" + ans : ans;
        }

        if (ans == undefined) {
            answer.innerHTML = ""

        }
        if (answer.innerHTML != "" && letterview.value != "") {
            cleared()
            letterview.value = "Ans"
            hideview.value = ans
        }
    }
}
function numbtn(num) {
    var answer = document.getElementById("answer")
    var letterview = document.getElementById("letterview")
    var hideview = document.getElementById("hideview")
    if (starter) {
        hideview.value += (/[s)IE\u03C0]/.test(letterview.value.slice(-1))) ?
            "*" + num : num;
        // alert(letterview.value.slice(-1))
        letterview.value += num

        if (answer.innerHTML != "" && letterview.value != "") {
            cleared()
            letterview.value += num
            hideview.value += num
        }

    }
}

function symbol(sym) {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    if (starter) {
        if (letterview.value != "" && answer.innerHTML == "" && hideview.value.slice(-1) != "*" && hideview.value.slice(-1) != "-" && hideview.value.slice(-1) != "+" && hideview.value.slice(-1) != "/") {
            letterview.value += sym
            hideview.value += sym
        }

        if (answer.innerHTML != "") {
            letterview.value = "Ans" + sym
            hideview.value = ans + sym
            answer.innerHTML = ""
        }

    }
}

function bracket(sym) {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    if (starter) {
        if (letterview.value != "" && answer.innerHTML == "") {
            if (sym == "(" && hideview.value.slice(-1) != "(") {
                letterview.value += sym
                hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
                    "*" + sym : sym;
            }

            if (sym == ")" && hideview.value.slice(-1) != ")") {
                letterview.value += sym
                hideview.value += sym
            }
        }
        if (sym == "(" && answer.innerHTML != "") {
            cleared()
            letterview.value += "(" + ans
            hideview.value += "(" + ans
        }

    }
}

function sct(num) {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    if (starter) {
        if (answer.innerHTML == "") {
            letterview.value += num
            hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
                " * Math." + num + "(Math.PI/180)*" : "Math." + num + "(Math.PI/180)*"
        } else {
            cleared()
            letterview.value = "Ans*" + num
            hideview.value = ans + "* " + "Math." + num + "(Math.PI/180)*"
        }
    }
}

function log(num) {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    if (starter) {
        if (answer.innerHTML == "" && num == "In(") {
            letterview.value += num
            hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
                " * Math.log(" : "Math.log("
        } else if (answer.innerHTML != "" && num == "In(") {
            cleared()
            letterview.value = "Ans*" + num
            hideview.value = ans + "* " + "Math.log("
        }
        if (answer.innerHTML == "" && num == "log(") {
            letterview.value += num
            hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
                " * Math.log10(" : "Math.log10("
        } else if (answer.innerHTML != "" && num == "log(") {
            cleared()
            letterview.value = "Ans*" + num
            hideview.value = ans + "* " + "Math.log10("
        }
    }
}

var numx = ""
var numy = ""
function powtw(raise) {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    if (starter && letterview.value.slice(-1) != "²" && letterview.value.slice(-1) != "³") {
        letterview.value += raise
        var valX = hideview.value.lastIndexOf("*")
        var valM = hideview.value.lastIndexOf("-")
        var valP = hideview.value.lastIndexOf("+")
        var valD = hideview.value.lastIndexOf("/")
        if (valX != -1 && valX > valM && valX > valP && valX > valD) {
            if (raise == "²") {
                numx = hideview.value.slice(valX + 1)
                hideview.value += "*" + numx
            }
            else {
                numy = hideview.value.slice(valX + 1)
                hideview.value += "*" + numy + "*" + numy
            }
        } else if (valM != -1 && valM > valX && valM > valP && valM > valD) {
            if (raise == "²") {
                numx = hideview.value.slice(valM + 1)
                hideview.value += "*" + numx
            }
            else {
                numy = hideview.value.slice(valM + 1)
                hideview.value += "*" + numy + "*" + numy
            }
        } else if (valP != -1 && valP > valX && valP > valM && valP > valD) {
            if (raise == "²") {
                numx = hideview.value.slice(valP + 1)
                hideview.value += "*" + numx
            }
            else {
                numy = hideview.value.slice(valP + 1)
                hideview.value += "*" + numy + "*" + numy
            }
        } else if (valD != -1 && valD > valX && valD > valM && valD > valP) {
            if (raise == "²") {
                numx = hideview.value.slice(valD + 1)
                hideview.value += "*" + numx
            }
            else {
                numy = hideview.value.slice(valD + 1)
                hideview.value += "*" + numy + "*" + numy
            }
        } else {
            if (raise == "²") {
                numx = hideview.value.slice(0)
                hideview.value += "*" + numx
            }
            else {
                numy = hideview.value.slice(0)
                hideview.value += "*" + numy + "*" + numy
            }
        }

    }
}
function stdfrm(num) {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    if (starter && letterview.value != "") {
        if (num == "e") {
            letterview.value += num
            hideview.value += num
        }
        else {
            letterview.value += num
            hideview.value += num
        }
    }
}
function sqrt(num) {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    letterview.value += num;
    hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
        " * Math.sqrt(" : "Math.sqrt(";
}
function piE(num) {
    if (starter) {
        if (num == "pi") {
            letterview.value += "\u03C0";
            hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
                " * Math.PI" : "Math.PI";
        } else {
            letterview.value += "E";
            hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
                " * Math.E" : "Math.E";
        }
    }
}
function trigo(num) {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    letterview.value += num + "\u207B\u00B9("
    hideview.value += (/[\d)IE]/.test(hideview.value.slice(-1))) ?
        " * 180 / Math.PI * Math.a" + num + "(" : "180 / Math.PI * Math.a" + num + "(";
}
function inverse() {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    letterview.value += "\u207B\u00B9"
    hideview.value += "\u207B\u00B9"
}
function del() {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    if (letterview.value != "" && answer.innerHTML != "") {
        cleared()
    }
    if (letterview.value.slice(-3) == "Ans") {
        hideview.value = (/[\d)IEs\u03C0]/.test(letterview.value.slice(-4, -3))) ?
            hideview.value.slice(0, -(store.innerHTML.length + 1)) : hideview.value.slice(0, -(store.innerHTML.length));
        letterview.value = letterview.value.slice(0, -3);//alert("ans")
    }
    else if (hideview.value.slice(-2) == ")*") {//sin(
        hideview.value = (/[\d)IE\u03C0s]/.test(letterview.value.slice(-5, -4))) ?
            hideview.value.slice(0, -26) : hideview.value.slice(0, -23);

        letterview.value = letterview.value.slice(0, -4);//alert("sin")  
    }
    else if (hideview.value.slice(-2) == "t(") {//sqrt
        hideview.value = (/[\d)IEs\u03C0]/.test(letterview.value.slice(-2, -1))) ?
            hideview.value.slice(0, -13) : hideview.value.slice(0, -10);

        letterview.value = letterview.value.slice(0, -1);//alert("sq")  
    }
    else if (letterview.value.slice(-1) == "²") {
        var len = numx.length
        hideview.value = hideview.value.slice(0, -(len + 1))

        letterview.value = letterview.value.slice(0, -1);//alert("rais2")  
    } else if (letterview.value.slice(-1) == "³") {
        var lena = numy.length
        hideview.value = hideview.value.slice(0, -(lena + lena + 2))

        letterview.value = letterview.value.slice(0, -1);
        //alert("rais3")
    }
    else if (letterview.value.slice(-2) == "g(") {//log(
        hideview.value = (/[\d)IEs\u03C0]/.test(letterview.value.slice(-5, -4))) ?
            hideview.value.slice(0, -14) : hideview.value.slice(0, -11);

        letterview.value = letterview.value.slice(0, -4);//alert("log")  
    }
    else if (letterview.value.slice(-3) == "In(") {
        hideview.value = (/[\d)IEs\u03C0]/.test(letterview.value.slice(-4, -3))) ?
            hideview.value.slice(0, -12) : hideview.value.slice(0, -9);

        letterview.value = letterview.value.slice(0, -3);//alert("in)") 
    }
    else if (letterview.value.slice(-1) == "√") {
        hideview.value = (/[\d)IEs\u03C0]/.test(letterview.value.slice(-2, -1))) ?
            hideview.value.slice(0, -13) : hideview.value.slice(0, -10);

        letterview.value = letterview.value.slice(0, -1);//alert("sqrt")
    }
    else if (hideview.value.slice(-2) == "s(" || hideview.value.slice(-2) == "n(") {
        hideview.value = (/[\d)IEs\u03C0]/.test(letterview.value.slice(-7, -6))) ?
            hideview.value.slice(0, -29) : hideview.value.slice(0, -26);

        letterview.value = letterview.value.slice(0, -6);//alert("asct")
    }
    else if (hideview.value.slice(-2) == "PI") {
        hideview.value = (/[\d)IEs\u03C0]/.test(letterview.value.slice(-2, -1))) ?
            hideview.value.slice(0, -10) : hideview.value.slice(0, -7);

        letterview.value = letterview.value.slice(0, -1);//alert("pie")
    }
    else if (hideview.value.slice(-2) == ".E") {
        hideview.value = (/[\d)IE\u03C0s]/.test(letterview.value.slice(-2, -1))) ?
            hideview.value.slice(0, -9) : hideview.value.slice(0, -6);

        letterview.value = letterview.value.slice(0, -1);//alert("E")
    }
    else if (letterview.value.slice(-1) == "(") {
        hideview.value = (/[\d)I\u03C0Es]/.test(letterview.value.slice(-2, -1))) ?
            hideview.value.slice(0, -2) : hideview.value.slice(0, -1);

        letterview.value = letterview.value.slice(0, -1);//alert("bra")
    }
    else {
        hideview.value = (/[)IE\u03C0s]/.test(letterview.value.slice(-2, -1))) ?
            hideview.value.slice(0, -2) : hideview.value.slice(0, -1);
        letterview.value = letterview.value.slice(0, -1);//alert("else")
        //*66   
    }
}
function start() {
    var answer = document.getElementById("answer")
    var hideview = document.getElementById("hideview")
    var letterview = document.getElementById("letterview")
    letterview.value = "CASIO"
    letterview.style.display = "flex"
    letterview.style.justifyContent = "center"
    letterview.style.textAlign = "center"
    letterview.style.fontSize = "40px"
    letterview.style.color = "grey"
}
function turnon() {
    var letterview = document.getElementById("letterview")
    var icon = document.getElementById("icon")
    if (starter == false) {
        start()
        setTimeout(function clear() {
            letterview.style.display = "block"
            letterview.style.fontSize = "16px"
            letterview.style.textAlign = "left"
            icon.innerHTML = "math"
            letterview.value = ""
            starter = true
        }, 1000)
    }

}
var off = false
function shift() {
    var button = document.getElementsByTagName("button")
    if (starter) {
        off = !off
        if (off) {
            icon.innerHTML += "<i>sh</i>"
            button[18].innerHTML = "sin<sup>-1</sup>"
            button[18].setAttribute("onclick", 'trigo("sin")')
            button[19].innerHTML = "cos<sup>-1</sup>"
            button[19].setAttribute("onclick", 'trigo("cos")')
            button[20].innerHTML = "tan<sup>-1</sup>"
            button[20].setAttribute("onclick", 'trigo("tan")')
        } else {
            icon.innerHTML = "math"
            button[18].innerHTML = "sin("
            button[18].setAttribute("onclick", 'sct("sin(")')
            button[19].innerHTML = "cos("
            button[19].setAttribute("onclick", 'sct("cos(")')
            button[20].innerHTML = "tan("
            button[20].setAttribute("onclick", 'sct("tan(")')
        }

    }
}
function cleared() {
    var answer = document.getElementById("answer")
    var letterview = document.getElementById("letterview")
    letterview.style.textAlign = "left"
    letterview.value = hideview.value = answer.innerHTML = ""
}
function turnoff() {
    cleared()
    if (off) {
        start()
        icon.innerHTML = ""
        setTimeout(function cleara() {
            letterview.style.display = "block"
            letterview.style.fontSize = "16px"
            letterview.style.textAlign = "left"
            letterview.value = ""
            starter = false
            on = false
        }, 1000)
    }
}
window.onload = function () {
    var points = ["300,140",
        "300,100",
        "150,0",
        "0,100",
        "0,200",
        "150,300",
        "300,200",
        "300,160",
        "280,180",
        "280,196",
        "150,280",
        "20,196",
        "20,110",
        "150,20",
        "280,110",
        "280,160",
        "300,140"]
    var points2 = [
        "196,70",
        "150,40",
        "40,116",
        "150,180",
        "240,120",
        "240,186",
        "150,240",
        "60,176",
        "60,152",
        "40,140",
        "40,184",
        "150,260",
        "260,192",
        "260,116",
        "236,98",
        "150,158",
        "80,116",
        "150,66",
        "184,86",
        "196,70"
    ]

    var svg = document.getElementById("svg")
    var lines = document.getElementById("lines")
    var lines2 = document.getElementById("lines2")
    var i = -1
    var j = -1
    var list = []
    var list2 = []
    var atwork = false
    function draw() {
        if (i < 16) {
            i++
            list.push(points[i])
            lines.setAttribute("points", list)

        }
        if (i == 16) {
            lines.style.fill = "blue"
            clearInterval(clear)
            if (atwork == false) {
                setInterval(draw2, 100)
                atwork = true
            }
        }

    }
    var clear = setInterval(draw, 100)
    function draw2() {
        if (j < 19) {
            j++
            list2.push(points2[j])
            lines2.setAttribute("points", list2)

        }
        if (j == 19) {
            lines2.style.fill = "lightblue"
        }
        var art = document.getElementById("art")
        var main = document.getElementsByTagName("main")
        setTimeout(function hide() {
            art.style.display = "none"
            main[0].style.display = "block"
        }, 3000)
    }

}
