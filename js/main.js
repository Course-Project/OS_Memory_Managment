/**
 * 
 * @authors Tom Hu (webmaster@h1994st.com)
 * @date    2014-05-24 12:35:01
 * @version 1.0
 */

(function (window) {
    var document = window.document;

    // 获取“开始”按钮
    var startBtn = document.getElementById("startBtn");

    function Console(consoleID) {
        this.consoleMain = document.getElementById(consoleID);

        if (this.consoleMain.tagName.toUpperCase() != "TEXTAREA") {
            throw new Error("控制台输出窗口必须为TEXTAREA");
        };

        Console.prototype.log = function (string) {
            this.consoleMain.value += ("> " + string + "\n");
        };

        Console.prototype.error = function (string) {
            this.consoleMain.value += ("> !ERROR: " + string + "\n");
        };

        Console.prototype.clear = function () {
            this.consoleMain.value = "";
        };
    };

    // 初始化控制台
    var console = new Console("console");

    var numberOfTotalMemoryBlocks = parseInt(document.getElementById("numberOfTotalMemoryBlocks").textContent); // 4
    var numberOfTotalInstructions = parseInt(document.getElementById("numberOfTotalInstructions").textContent); // 320
    var numberOfInstructionsInEachPage = parseInt(document.getElementById("numberOfInstructionsInEachPage").textContent); // 10

    // 需要改变的标签元素
    var currentInstructionSpan = document.getElementById("currentInstruction");
    var numberOfMissingPagesSpan = document.getElementById("numberOfMissingPages");
    var pageFaultRateSpan = document.getElementById("pageFaultRate");

    // 内存
    var memory = new Array(numberOfTotalMemoryBlocks);
    // 记录指令是否被执行
    var instructions = new Array(numberOfTotalInstructions);
    // 记录执行的指令个数
    var insCount = 0;

    function isInstructionExecuted(number) {

    };

    function isInstructionAvailable(number) {
        for (var i = 0; i < memory.length; i++) {
            if (Math.floor(number / numberOfInstructionsInEachPage) === memory[i]) {
                // 已经存在，没有发生缺页
                // console.log("");
                return true;
            };
        };
        // 缺页
        console.log("发生缺页");
        return false;
    };

    function initMemory() {
        console.log("初始化内存块");
        var i = 0;
        for (var i = 0; i < memory.length; i++) {
            var page = Math.floor(Math.random() * (numberOfTotalInstructions / numberOfInstructionsInEachPage));
            var offset = Math.floor(Math.random() * numberOfInstructionsInEachPage);
            var instruct = page * numberOfInstructionsInEachPage + offset;

            // 将指令所在的页调入内存
            console.log("将指令" + instruct + "所在的页调入内存空白页面" + i);
            memory[i] = page;
        };
        console.log("初始化结束");
    };



    function FIFO() {
        console.log("使用FIFO算法");
        
    };

    function LRU() {
        console.log("使用LRU算法");
    };

    function chooseAlgrithm() {
        var ratio = document.querySelector("input:checked");
        if (ratio.value === "FIFO") {
            FIFO();
        } else if(ratio.value === "LRU") {
            LRU();
        } else {
            console.log("算法选择错误!!");
        };
    };

    function start() {
        // 禁用“开始”按钮
        startBtn.disabled = true;

        // 清空控制台输出
        console.clear();

        // 输出开始信息
        console.log("开始模拟")

        // 初始化内存
        initMemory();

        // Choose algrithm and start
        chooseAlgrithm();

        // 输出结束信息
        console.log("模拟结束");
        console.log("----------------");

        // 输出结果
        console.log("缺页率为：123/320");

        // 启用“开始”按钮
        startBtn.disabled = false;
    }

    // Add event listener for start btn
    startBtn.addEventListener('click', start);
})(window)


