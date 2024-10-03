


class 慣性移動{
    constructor(慣性,物件id,定位方向,y軸錨點,y軸偏移,移動範圍倍率,現在位置,現在速度,每一影格前進等分,鬆弛度,減速因子,三段式動態,第一拐點,第二拐點,轉譯後目標點) {
    
        this.慣性=慣性;
        this.物件id=物件id;
        this.現在位置=現在位置;
        this.現在速度=現在速度;
        this.每一影格前進等分=每一影格前進等分;
        this.鬆弛度=鬆弛度;
        this.減速因子=減速因子;
        this.定位方向=定位方向;
        this.y軸錨點=y軸錨點;
        this.移動範圍倍率=移動範圍倍率;
        this.y軸偏移=y軸偏移;
        this.三段式動態=三段式動態;
        this.第一拐點=第一拐點;
        this.第二拐點=第二拐點;

        //以上兩數組 第一個數均代表拐點的x 第二個均為拐點的y
        this.轉譯後目標點=轉譯後目標點;

    }
}










function 新個體變速(主體){



    let 目標點 = window.scrollY;

    if(主體.三段式動態==true){
        const 百分化滾輪位子 = window.scrollY/滾輪總深度;
        if(百分化滾輪位子<主體.第一拐點[0]){
            主體.轉譯後目標點=百分化滾輪位子*主體.第一拐點[1]/主體.第一拐點[0];
        }

        //主體.第一拐點[1]/主體.第一拐點[0]為定值 可以考慮優化成頁面初始時只計算一次

        else if(百分化滾輪位子>主體.第二拐點[0]){
            主體.轉譯後目標點=1-((1-百分化滾輪位子)*((1-主體.第二拐點[1])/(1-主體.第二拐點[0])));
        }

        //((100-主體.第二拐點[1])/(100-主體.第二拐點[0]))也是定值 可優化

        else{
            //主體.轉譯後目標點=主體.第一拐點[1];
            //以上為假如中間線段為水平時可用

            主體.轉譯後目標點=(百分化滾輪位子-主體.第一拐點[0])*((主體.第二拐點[1]-主體.第一拐點[1])/(主體.第二拐點[0]-主體.第一拐點[0]))+主體.第一拐點[1];

        }

        目標點 = 主體.轉譯後目標點*=滾輪總深度;


    }




    let 理想速度 = (目標點-主體.現在位置)/主體.每一影格前進等分;
    


    let 理想每幀速度變化幅度 = (理想速度-主體.現在速度)/主體.鬆弛度;
    

    if(理想每幀速度變化幅度<0 && 主體.現在位置<目標點 || 理想每幀速度變化幅度>0 && 主體.現在位置>目標點 || 主體.現在位置>目標點 && 主體.現在速度 > 0 || 主體.現在位置<目標點 && 主體.現在速度 < 0){

        //正在靠近目標，而且減速中
        //或著正在遠離目標
        


        主體.現在速度*=主體.減速因子;
        //強制煞車


    }


    



    
    主體.現在速度+=理想每幀速度變化幅度;
    主體.現在位置+=主體.現在速度;


}




let 滾輪總深度 = document.getElementById("滾動監測器").offsetHeight;
window.onresize = () => {滾輪總深度 = document.getElementById("滾動監測器").offsetHeight;

//之後可以把這個變數刪掉 因為滾輪總深度的誤差已經被多增加的div消除 目前總是可控的(現為10000px)


document.getElementById("補足滾輪誤差用").style.height=`${document.documentElement.clientHeight}px`;
}

document.getElementById("補足滾輪誤差用").style.height=`${document.documentElement.clientHeight}px`;


function 個體重繪(主體){


    


    if(主體.慣性==true){
       
        if(主體.定位方向=="y"){
            document.getElementById(`${主體.物件id}`).style.top=`calc((${主體.y軸錨點} - ${主體.現在位置}px ) * ${主體.移動範圍倍率} + ${主體.y軸偏移})`;
        }
        else{
            document.getElementById(`${主體.物件id}`).style.left=`calc((${主體.y軸錨點} - ${主體.現在位置}px ) * ${主體.移動範圍倍率} + ${主體.y軸偏移})`;
        }
    }
    else{
        if(主體.定位方向=="y"){
            document.getElementById(`${主體.物件id}`).style.top=`calc((${主體.y軸錨點} - ${window.scrollY}px ) * ${主體.移動範圍倍率} + ${主體.y軸偏移})`;
        }
        else{
            document.getElementById(`${主體.物件id}`).style.left=`calc((${主體.y軸錨點} - ${window.scrollY}px ) * ${主體.移動範圍倍率} + ${主體.y軸偏移})`;
        }
    }



    document.getElementById("位子4").innerHTML=`${window.scrollY}`;
    document.getElementById("位子1").innerHTML=`${個體陣列[0].現在位置}`;


    /* 顯示高度= (y軸高度(定值)-現在位置)*係數(決定方向速度 如果為1則與背景同步)
    如果係數為 -(視窗高度(document.documentElement.clientHeight)/滾輪高度)(似乎為定值，不隨視窗大小變動而改變？) 則物件跟側邊滑輪同步*/
}



const 移動範圍為整個視窗大小的係數 = (document.documentElement.clientHeight/滾輪總深度)* -1;

let 個體陣列= [];
let 個體參數= [[true,"位子1","y","3000px","25vh",0.3,0,0,10,100,0.9,true,[0.1,0.295],[0.5,0.305],0],[true,"位子2","y","0px","50vh",移動範圍為整個視窗大小的係數,0,0,10,10,0.6],
[true,"位子3","x","0px","0px",移動範圍為整個視窗大小的係數,0,0,10,30,0.9],[false,"位子4","y","1000px","10vh",移動範圍為整個視窗大小的係數],
[true,"位子5","y","2000px","50vh",-0.3,0,0,10,10,0.9],[true,"位子6","y","2000px","50vh",-0.35,0,0,10,10,0.9],
[true,"位子7","y","2000px","50vh",-0.4,0,0,10,10,0.9],[true,"位子8","y","2000px","50vh",-0.45,0,0,10,10,0.9],
[true,"位子9","y","2000px","50vh",-0.5,0,0,10,10,0.9],[true,"位子10","y","2000px","50vh",-0.55,0,0,10,10,0.9],
[true,"位子11","y","2000px","0vh",-1,0,0,10,10,0.9,false,[0.1,0.18],[0.8,0.22],0],[true,"位子12","y","2000px","50vh",-1,0,0,10,10,0.9,true,[0.1,0.19],[0.3,0.21],0],
[true,"位子13","y","2000px","50vh",0.5,0,0,10,10,0.9],[true,"位子14","y","2000px","50vh",0.5,0,0,9,10,0.9],
[true,"位子15","y","2000px","50vh",0.5,0,0,8,10,0.9],[true,"位子16","y","2000px","50vh",0.5,0,0,7,10,0.9],
[true,"位子17","y","2000px","50vh",0.5,0,0,6,10,0.9],[true,"位子18","y","2000px","50vh",0.5,0,0,5,10,0.97],
[true,"位子19","y","2000px","50vh",0.5,0,0,4,50,0.9]];

//慣性,物件id,定位方向,y軸錨點(要加單位),y軸偏移(要加單位),移動範圍倍率,現在位置,加速程度,最高加速程度,現在速度,每一影格前進等分(速度,1~無限),鬆弛度(1~無限),減速因子(0~1),三段式動態,第一拐點,第二拐點,轉譯後目標點


function 初始化所有個體(){
    個體陣列 = 個體參數.map((個體)=>{
        
        return new 慣性移動(...個體);

    })
}




function 個體更新(){
    個體陣列.forEach(主體 => {
        新個體變速(主體);
        個體重繪(主體);
        }
    )
    requestAnimationFrame(個體更新, 1000 / 60);
}


初始化所有個體();

個體更新();




//以下用來啟動特定效果 當特定實體進入視窗內

const observer = new IntersectionObserver((主體) => {

    

        if (主體[0].isIntersecting) {
            主體[0].target.classList.toggle('變色');
        } 
        else {
            主體[0].target.classList.remove('變色')
        }

        console.table(主體);

    },
  
  
  {
    rootMargin: "-10%",
    threshold: 1.0,
  }
  );
  
  const div = document.getElementById("位子1");
  const div12 = document.getElementById("位子12");
  observer.observe(div);
  observer.observe(div12);

