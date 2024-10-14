let 滾輪總深度 = document.getElementById("滾動監測器").offsetHeight;

let 移動範圍為整個視窗大小的係數 = (document.documentElement.clientHeight/滾輪總深度)* -1;

let 移動範圍為整個視窗大小的係數x = 移動範圍為整個視窗大小的係數 * document.documentElement.clientWidth  / document.documentElement.clientHeight;
;

window.onresize = () => {滾輪總深度 = document.getElementById("滾動監測器").offsetHeight;

//之後可以把這個變數刪掉 因為滾輪總深度的誤差已經被多增加的div消除 目前總是可控的(現為10000px)


document.getElementById("補足滾輪誤差用").style.height=`${document.documentElement.clientHeight}px`;

移動範圍為整個視窗大小的係數 = (document.documentElement.clientHeight/滾輪總深度)* -1;

}

document.getElementById("補足滾輪誤差用").style.height=`${document.documentElement.clientHeight}px`;




class 慣性移動實體{
    constructor(data) {
    
        /*this.慣性=data.慣性;
        this.物件id=data.物件id;
        this.現在位置=data.現在位置;
        this.現在速度=data.現在速度;
        this.每一影格前進等分=data.每一影格前進等分;
        this.鬆弛度=data.鬆弛度;
        this.減速因子=data.減速因子;
        this.定位方向=data.定位方向;
        this.y軸錨點=data.y軸錨點;
        this.移動範圍倍率=data.移動範圍倍率;
        this.y軸偏移=data.y軸偏移;
        this.三段式動態=data.三段式動態;
        this.第一拐點=data.第一拐點;
        this.第二拐點=data.第二拐點;
        this.拐點單位=data.拐點單位;*/

        Object.assign(this, data);
        this.計算斜率();
        this.錨點套用();
        this.移動範圍為整個父元素高度();

        


        //以上兩數組 第一個數均代表拐點的x 第二個均為拐點的y

        
        //this.轉譯後目標點=轉譯後目標點;


        //這個可以刪掉 但要改一下有用到的地方

    }
    計算斜率() {
        if (!this.三段式動態) return;

        const { 第一拐點, 第二拐點, 拐點單位 } = this;

        const 計算單段斜率 = (x1, y1, x2, y2) => (y2 - y1) / (x2 - x1);

        if (拐點單位 === "相對") {
            this.斜率1 = 計算單段斜率(0, 0, 第一拐點[0], 第一拐點[1]);
            this.斜率2 = 計算單段斜率(第一拐點[0], 第一拐點[1], 第二拐點[0], 第二拐點[1]);
            this.斜率3 = 計算單段斜率(第二拐點[0], 第二拐點[1], 1, 1);
        } else {
            this.斜率1 = 計算單段斜率(0, 0, 第一拐點[0], 第一拐點[1]);
            this.斜率2 = 計算單段斜率(第一拐點[0], 第一拐點[1], 第二拐點[0], 第二拐點[1]);
            this.斜率3 = 計算單段斜率(第二拐點[0], 第二拐點[1], 滾輪總深度, 滾輪總深度);
        }
    }

    錨點套用(){
        this.現在位置 -= parseInt(this.y軸錨點);
    }



    移動範圍為整個父元素高度(){


        if (this.移動範圍倍率[0]=="父元素"){
            this.移動範圍倍率 = (document.getElementById(this.物件id).parentNode.offsetHeight-document.getElementById(this.物件id).offsetHeight)*this.移動範圍倍率[1]*-1/滾輪總深度;
        }

    }




}




//目前是用百分比來算的

//用絕對座標的話 則初始化時轉換為百分比（？）
//或是百分比轉換為絕對座標

//如果滾輪總深度可變 則必須用百分比形式來定位


//不要用百分比來定位 因為很難擴展

//換句話說 滾輪總深度不可以隨著視窗大小而變 也就是不可以使用vh單位







function 新個體變速(主體){

    let 當前滾輪深度 = window.scrollY;
        if(當前滾輪深度<0){
            當前滾輪深度=0;
        }

    let 目標點 = 當前滾輪深度;



    //重寫 目的是以絕對單位來計算轉譯後的目標點

    //為了兼容用百分比紀錄的拐點，初始化的時候要把百分比形式改成絕對單位(選用)

    if(主體.三段式動態==true){


        //絕對時

        if(主體.拐點單位=="相對"){

            const 百分化滾輪位子 = 當前滾輪深度/滾輪總深度;

            if(百分化滾輪位子<主體.第一拐點[0]){
                主體.轉譯後目標點=百分化滾輪位子*主體.斜率1;
            }
    

    
            else if(百分化滾輪位子>主體.第二拐點[0]){
                主體.轉譯後目標點=1-((1-百分化滾輪位子)*主體.斜率3);
            }
    

    
            else{
                //主體.轉譯後目標點=主體.第一拐點[1];
                //以上為假如中間線段為水平時可用
    
                主體.轉譯後目標點=(百分化滾輪位子-主體.第一拐點[0])*主體.斜率2+主體.第一拐點[1];
    
            }

            主體.轉譯後目標點*=滾輪總深度;
    
        }
        else{

            if(當前滾輪深度<主體.第一拐點[0]){
                主體.轉譯後目標點=當前滾輪深度*主體.斜率1;
            }
    

    
            else if(當前滾輪深度>主體.第二拐點[0]){
                主體.轉譯後目標點=滾輪總深度-((滾輪總深度-當前滾輪深度)*主體.斜率3);
            }
    

    
            else{
    
                主體.轉譯後目標點=(當前滾輪深度-主體.第一拐點[0])*主體.斜率2+主體.第一拐點[1];
    
            }
        }

        

        目標點 = 主體.轉譯後目標點;



        




    }

    



    //錨點與比例調整的東西都改成寫在這裡，也就是提早到真實位子反應之前。

    目標點 -= parseInt(主體.y軸錨點);

    let 係數 = (主體.移動範圍倍率 == "整個視窗") ? 移動範圍為整個視窗大小的係數 : 主體.移動範圍倍率;
    if(主體.定位方向=="x"){
        係數 = 移動範圍為整個視窗大小的係數x;
    }


    目標點 *= 係數;

    /*if(主體.物件id=="圖片背景"){
        console.log(document.getElementById(`${主體.物件id}`).offsetHeight);
    }*/

    



    if(主體.移動範圍倍率 == "整個視窗"){

        if(主體.定位方向=="y"){

            
            目標點 += document.getElementById(`${主體.物件id}`).offsetHeight * 當前滾輪深度 / 滾輪總深度;

            
        }else{
            目標點 += document.getElementById(`${主體.物件id}`).offsetWidth * 當前滾輪深度 / 滾輪總深度;
        }


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







function 個體重繪(主體){


    let 當前滾輪深度 = window.scrollY;
        if(當前滾輪深度<0){
            當前滾輪深度=0; 
        }

        
        if(主體.慣性==true){
       
            if(主體.定位方向=="y"){
                document.getElementById(`${主體.物件id}`).style.top=`calc(( 0px - ${主體.現在位置}px ) + ${主體.y軸偏移} )`;
            }
            else{
                document.getElementById(`${主體.物件id}`).style.left=`calc(( 0px - ${主體.現在位置}px ) + ${主體.y軸偏移} )`;
                //console.log(document.getElementById("圖片背景").offsetHeight}px * ${當前滾輪深度/滾輪總深度);
            }
        }

        else{
            if(!主體.移動範圍倍率){
                主體.移動範圍倍率 = 1;
            }
            if(主體.定位方向=="y"){
                document.getElementById(`${主體.物件id}`).style.top=`calc((${主體.y軸錨點} - ${當前滾輪深度}px )*${主體.移動範圍倍率} + ${主體.y軸偏移})`;
            }
            else{
                document.getElementById(`${主體.物件id}`).style.left=`calc((${主體.y軸錨點} - ${當前滾輪深度}px )*${主體.移動範圍倍率} + ${主體.y軸偏移} )`;
            }
        }

 

    


    //document.getElementById("位子4").innerHTML=`${window.scrollY}`;
    //document.getElementById("位子1").innerHTML=`${個體陣列[0].現在位置}`;


    /* 顯示高度= (y軸高度(定值)-現在位置)*係數(決定方向速度 如果為1則與背景同步)
    如果係數為 -(視窗高度(document.documentElement.clientHeight)/滾輪高度)(似乎為定值，不隨視窗大小變動而改變？) 則物件跟側邊滑輪同步*/
}





let 個體陣列= [];


//慣性,物件id,定位方向,y軸錨點(要加單位),y軸偏移(要加單位),移動範圍倍率,現在位置,加速程度,最高加速程度,現在速度,每一影格前進等分(速度,1~無限),鬆弛度(1~無限),減速因子(0~1),三段式動態,第一拐點,第二拐點,轉譯後目標點

//慣性:,物件id:,定位方向:,y軸錨點:,y軸偏移:,移動範圍倍率:,現在位置:,現在速度:,每一影格前進等分:,鬆弛度:,減速因子:,三段式動態:,第一拐點:,第二拐點:,轉譯後目標點:


//物件化的寫法 讓順序變自由 讓修改變更容易

let 個體參數新=[{慣性:true,物件id:"位子1",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.3,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:100,減速因子:0.9,三段式動態:true,第一拐點:[0,0],第二拐點:[980,196],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子2",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.31,現在位置:0,現在速度:0,每一影格前進等分:17,鬆弛度:100,減速因子:0.94,三段式動態:true,第一拐點:[0,0],第二拐點:[990,198],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子3",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.28,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:110,減速因子:0.9,三段式動態:true,第一拐點:[0,0],第二拐點:[1000,200],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子4",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.29,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:110,減速因子:0.9,三段式動態:true,第一拐點:[0,0],第二拐點:[1040,208],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子5",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.29,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:100,減速因子:0.91,三段式動態:true,第一拐點:[0,0],第二拐點:[1060,212],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子6",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.28,現在位置:0,現在速度:0,每一影格前進等分:11,鬆弛度:120,減速因子:0.92,三段式動態:true,第一拐點:[0,0],第二拐點:[1080,216],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子7",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.27,現在位置:0,現在速度:0,每一影格前進等分:12,鬆弛度:140,減速因子:0.93,三段式動態:true,第一拐點:[0,0],第二拐點:[1100,220],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子8",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.3,現在位置:0,現在速度:0,每一影格前進等分:13,鬆弛度:70,減速因子:0.9,三段式動態:true,第一拐點:[0,0],第二拐點:[1120,224],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子9",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.31,現在位置:0,現在速度:0,每一影格前進等分:17,鬆弛度:160,減速因子:0.9,三段式動態:true,第一拐點:[0,0],第二拐點:[1140,228],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子10",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.3,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:130,減速因子:0.9,三段式動態:true,第一拐點:[0,0],第二拐點:[1160,232],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子11",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.3,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:140,減速因子:0.9,三段式動態:true,第一拐點:[0,0],第二拐點:[1180,236],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子12",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.28,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:150,減速因子:0.94,三段式動態:true,第一拐點:[0,0],第二拐點:[1200,240],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子13",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.15,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:180,減速因子:0.9,三段式動態:true,第一拐點:[0,0],第二拐點:[1200,200],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"位子14",定位方向:"y",y軸錨點:"0px",y軸偏移:"26vh",移動範圍倍率:0.3,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:80,減速因子:0.99,三段式動態:true,第一拐點:[0,0],第二拐點:[950,200],轉譯後目標點:0,拐點單位:"絕對"},

{慣性:true,物件id:"圖片背景",定位方向:"y",y軸錨點:"0px",y軸偏移:"0vh",移動範圍倍率:"整個視窗",現在位置:0,現在速度:0,每一影格前進等分:5,鬆弛度:2,減速因子:0.3},
{慣性:true,物件id:"波1",定位方向:"y",y軸錨點:"200px",y軸偏移:"50vh",移動範圍倍率:0.05,現在位置:0,現在速度:0,每一影格前進等分:20,鬆弛度:100,減速因子:0.999},
{慣性:true,物件id:"黑背景",定位方向:"y",y軸錨點:"4000px",y軸偏移:"50vh",移動範圍倍率:1,現在位置:0,現在速度:0,每一影格前進等分:5,鬆弛度:2,減速因子:0.5,三段式動態:true,第一拐點:[4000,4000],第二拐點:[7000,4200],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"黑背景內",定位方向:"y",y軸錨點:"4000px",y軸偏移:"0vh",移動範圍倍率:0.1,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:100,減速因子:0.9},
{慣性:true,物件id:"缽背景",定位方向:"y",y軸錨點:"4500px",y軸偏移:"50vh",移動範圍倍率:1,現在位置:0,現在速度:0,每一影格前進等分:5,鬆弛度:2,減速因子:0.5,三段式動態:true,第一拐點:[4500,4500],第二拐點:[7500,4700],轉譯後目標點:0,拐點單位:"絕對"},
{慣性:true,物件id:"缽背景內",定位方向:"y",y軸錨點:"4500px",y軸偏移:"50vh",移動範圍倍率:0.05,現在位置:0,現在速度:0,每一影格前進等分:10,鬆弛度:100,減速因子:0.9}];







function 初始化所有個體(){

    個體陣列 = 個體參數新.map((個體)=>{
        
        return new 慣性移動實體(個體);

    })
    
}




function 個體更新(){
    個體陣列.forEach(主體 => {
        新個體變速(主體);
        個體重繪(主體);
        }
    )
    //console.log(document.getElementById("圖片背景").offsetHeight * window.scrollY/滾輪總深度);
    requestAnimationFrame(個體更新, 1000 / 60);
}


初始化所有個體();

個體更新();




//以下用來啟動特定效果 當特定實體進入視窗內

const observer = 創造監視實體()






function 創造監視實體(){

    

    return new IntersectionObserver((主體) => {

    
    主體.forEach((主體)=>{

        if (主體.isIntersecting) {
            主體.target.classList.add('顯現');
        } 
        else {
            主體.target.classList.remove('顯現')
        }

    })

    
    
        //console.table(主體);
    
    },
    
    
    {
    rootMargin: "-20%" ,
    threshold: [0.8,0.9]
    }
    );


}
  const divlist = document.querySelectorAll(".logo");


 divlist.forEach((主體)=>{observer.observe(主體)});





 
 const 嚴格檢測 = new IntersectionObserver((主體) => {

    
    主體.forEach((主體)=>{

        if (主體.isIntersecting) {
            主體.target.children[0].classList.add('背景改色');

            
        } 
        else {
            主體.target.children[0].classList.remove('背景改色')
        }
        //console.log(主體.target.children[0]);

    })

    
    
        //console.table(主體);
    
    },
    
    
    {
    rootMargin: "0%" ,
    threshold: [0.8,0.9,1]
    }
    );


    const 檢測清單 = document.querySelectorAll(".嚴格定位");

    檢測清單.forEach((主體)=>{嚴格檢測.observe(主體)});


    const 敲缽 = document.getElementById("缽背景內");
    const bo = document.getElementById("bo");
   

    敲缽.addEventListener("transitionstart", (e) => {

        //console.log(`${e.propertyName}+${e.target.id}`);
    


        if(敲缽.classList.contains('背景改色')){
            if(e.currentTarget==e.target){
                敲缽.addEventListener("click",缽被點擊);
            }
        
            

        }
    });



    function 缽被點擊(e){
        console.log("click event!");
        缽搖();
        //window.scrollTo(0,8000);
        敲缽.removeEventListener("click",缽被點擊);
    }


    function 缽搖(){
        bo.classList.add('震動');

        敲缽.addEventListener("transitionend",(e) => {


            if(e.currentTarget==e.target){
                if(bo.classList.contains('震動')){
                    bo.classList.remove('震動');
                }
            }


        })




    }







