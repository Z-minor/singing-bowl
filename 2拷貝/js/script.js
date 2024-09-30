/*document.addEventListener("scroll", (event) => {
    document.getElementById("字").innerHTML=`${window.scrollY}+"or"+${現在位置}`;}
)*/


//目標速度

//當前速度

//當前加速度
let 現在位置=0;
let 加速程度=0;
let 最高加速程度=5;
let 現在速度=0;
//let 執行次數=0;
let 每一影格前進等分 = 10; 

var intervalID = setInterval(變速,20);

function 變速(){


    // (window.scrollY-現在位置)/100 = 理想速度
    if(Math.abs(((window.scrollY-現在位置)/每一影格前進等分)) - Math.abs(現在速度) > 加速程度){
        if(加速程度<=最高加速程度){
            加速程度+=0.005;
        }

        if(window.scrollY>現在位置){
            現在速度+=加速程度;
        }
        else{
            現在速度-=加速程度;
        }
    }

    if(Math.abs((window.scrollY-現在位置)/每一影格前進等分) < Math.abs(現在速度)){
        //現在速度=(window.scrollY-現在位置)/每一影格前進等分;
        現在速度*=0.9;
    }

    現在位置+=現在速度;


    document.getElementById("位子").style.top=`${(現在位置/(document.getElementById("滾動監測器").offsetHeight - document.documentElement.clientHeight))*130}vh`;
    document.getElementById("位子2").style.top=`${100-((現在位置/(document.getElementById("滾動監測器").offsetHeight - document.documentElement.clientHeight))*100)}vh`;
    document.getElementById("位子3").style.left=`${(現在位置/(document.getElementById("滾動監測器").offsetHeight - document.documentElement.clientHeight))*100}vh`;
    //控制位子
    document.getElementById("位子4").style.top=`${window.scrollY/(document.getElementById("滾動監測器").offsetHeight - document.documentElement.clientHeight)*100}vh`;


    //document.getElementById("字").innerHTML=`${window.scrollY}+"or"+${現在位置}`;




}


//理想速度 每一秒進行一半剩餘路程 所以每20毫秒大約就是1/2 / 50的路程

//現在速度與理想速度有差 每一影格的變速階梯差= 固定值


