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

class 慣性移動{
    constructor(慣性,物件id,定位方向,y軸錨點,y軸偏移,移動範圍倍率,現在位置,加速程度,最高加速程度,現在速度,每一影格前進等分,加加速度,減速因子) {
    
        this.慣性=慣性;
        this.物件id=物件id;
        this.現在位置=現在位置;
        this.加速程度=加速程度;
        this.最高加速程度=最高加速程度;
        this.現在速度=現在速度;
        this.每一影格前進等分=每一影格前進等分;
        this.加加速度=加加速度;
        this.減速因子=減速因子;
        this.定位方向=定位方向;
        this.y軸錨點=y軸錨點;
        this.移動範圍倍率=移動範圍倍率;
        this.y軸偏移=y軸偏移;

    }
}







/*function 變速(){


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




}*/


function 個體變速(主體){
    if(Math.abs(((window.scrollY-主體.現在位置)/主體.每一影格前進等分)) - Math.abs(主體.現在速度) > 主體.加速程度){
        if(主體.加速程度<=主體.最高加速程度){
            主體.加速程度+=主體.加加速度;
        }
        if(window.scrollY>主體.現在位置){
            主體.現在速度+=主體.加速程度;
        }
        else{
            主體.現在速度-=主體.加速程度;
        }
    }

    if(Math.abs((window.scrollY-主體.現在位置)/主體.每一影格前進等分) < Math.abs(主體.現在速度)){
        主體.現在速度*=主體.減速因子;
    }

    主體.現在位置+=主體.現在速度;


}


//計算滾輪滾到底的y軸高度有多深
let 滾輪總深度 = document.getElementById("滾動監測器").offsetHeight - document.documentElement.clientHeight;

window.onresize = () => {滾輪高度 = document.getElementById("滾動監測器").offsetHeight - document.documentElement.clientHeight;}


function 個體重繪(主體){


    /*if(主體.慣性==true){
       
        if(主體.定位方向=="y"){
            document.getElementById(`${主體.物件id}`).style.top=`${(主體.現在位置/滾輪總深度)*主體.移動範圍倍率}vh`;
        }
        else{
            document.getElementById(`${主體.物件id}`).style.left=`${(主體.現在位置/滾輪總深度)*主體.移動範圍倍率}vh`;
        }
    }
    else{
        if(主體.定位方向=="y"){
            document.getElementById(`${主體.物件id}`).style.top=`${window.scrollY/滾輪總深度*主體.移動範圍倍率}vh`;
        }
        else{
            document.getElementById(`${主體.物件id}`).style.left=`${window.scrollY/滾輪總深度*主體.移動範圍倍率}vh`;
        }
    }*/


    //以下為新版



    if(主體.慣性==true){
       
        if(主體.定位方向=="y"){
            document.getElementById(`${主體.物件id}`).style.top=`${(主體.y軸錨點-主體.現在位置)*主體.移動範圍倍率+主體.y軸偏移}px`;
        }
        else{
            document.getElementById(`${主體.物件id}`).style.left=`${(主體.y軸錨點-主體.現在位置)*主體.移動範圍倍率+主體.y軸偏移}px`;
        }
    }
    else{
        if(主體.定位方向=="y"){
            document.getElementById(`${主體.物件id}`).style.top=`${(主體.y軸錨點-window.scrollY)*主體.移動範圍倍率+主體.y軸偏移}px`;
        }
        else{
            document.getElementById(`${主體.物件id}`).style.left=`${(主體.y軸錨點-window.scrollY)*主體.移動範圍倍率+主體.y軸偏移}px`;
        }
    }


   



    /* 顯示高度= (y軸高度(定值)-現在位置)*係數(決定方向速度 如果為1則與背景同步)
    如果係數為 -(視窗高度(document.documentElement.clientHeight)/滾輪高度)(似乎為定值，不隨視窗大小變動而改變？) 則物件跟側邊滑輪同步*/
}

//理想速度 每一秒進行一半剩餘路程 所以每20毫秒大約就是1/2 / 50的路程

//現在速度與理想速度有差 每一影格的變速階梯差= 固定值

const 移動範圍為整個視窗大小的係數 = (document.documentElement.clientHeight/滾輪總深度)* -1;

let 個體陣列= [];
let 個體參數= [[true,"位子1","y",3000,0,0.3,document.documentElement.clientHeight/2,0,5,0,2,0.0005,0.8],[true,"位子2","y",0,0,移動範圍為整個視窗大小的係數,0,0,5,0,10,0.005,0.6],
[true,"位子3","x",0,0,移動範圍為整個視窗大小的係數,0,0,5,0,10,0.005,0.9],[false,"位子4","y",1000,0,移動範圍為整個視窗大小的係數],
[true,"位子5","y",2000,document.documentElement.clientHeight/2,-0.3,0,0,2,0,10,0.002,0.9],[true,"位子6","y",2000,document.documentElement.clientHeight/2,-0.35,0,0,2,0,10,0.002,0.9],
[true,"位子7","y",2000,document.documentElement.clientHeight/2,-0.4,0,0,2,0,10,0.002,0.9],[true,"位子8","y",2000,document.documentElement.clientHeight/2,-0.45,0,0,2,0,10,0.002,0.9],
[true,"位子9","y",2000,document.documentElement.clientHeight/2,-0.5,0,0,4,0,10,0.002,0.9],[true,"位子10","y",2000,document.documentElement.clientHeight/2,-0.55,0,0,4,0,10,0.002,0.9],
[true,"位子11","y",2000,document.documentElement.clientHeight/2,-0.6,0,0,4,0,10,0.002,0.9],[true,"位子12","y",2000,document.documentElement.clientHeight/2,-0.65,0,0,4,0,10,0.002,0.9],
[true,"位子13","y",2000,document.documentElement.clientHeight/2,0.5,0,0,4,0,10,0.001,0.9],[true,"位子14","y",2000,document.documentElement.clientHeight/2,0.5,0,0,4,0,10,0.0012,0.9],
[true,"位子15","y",2000,document.documentElement.clientHeight/2,0.5,0,0,4,0,10,0.0015,0.9],[true,"位子16","y",2000,document.documentElement.clientHeight/2,0.5,0,0,4,0,10,0.002,0.9],
[true,"位子17","y",2000,document.documentElement.clientHeight/2,0.5,0,0,4,0,10,0.003,0.9],[true,"位子18","y",2000,document.documentElement.clientHeight/2,0.5,0,0,4,0,10,0.005,0.9],
[true,"位子19","y",2000,document.documentElement.clientHeight/2,0.5,0,0,4,0,10,0.01,0.9]];

//慣性,物件id,定位方向,y軸錨點,y軸偏移,移動範圍倍率,現在位置,加速程度,最高加速程度,現在速度,每一影格前進等分,加加速度,減速因子


function 初始化所有個體(){
    個體陣列 = 個體參數.map((個體)=>{
        
        return new 慣性移動(...個體);

    })
}




function 個體更新(){
    個體陣列.forEach(主體 => {
        個體變速(主體);
        個體重繪(主體);
        }
    )
}


初始化所有個體();

//setInterval(變速,20);

setInterval(個體更新,15);


/* 顯示高度= (y軸高度(定值)-現在位置)*係數(決定方向速度 如果為1則與背景同步)
如果係數為 -(視窗高度(document.documentElement.clientHeight)/滾輪總深度)(似乎為定值，不隨視窗大小變動而改變？) 則物件跟側邊滑輪同步*/