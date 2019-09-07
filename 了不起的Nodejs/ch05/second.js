//文件搜索命令行工具
var fs=require("fs");
var stdin=process.stdin;
var stdout =process.stdout;
fs.readdir(__dirname,function (err,files) {
    if(!files.length){
        return console.log("    \033[31m 没有文件\033[31m \n");
    }
    console.log("选择你想查看的文件夹:\n");
    var stats=[];
    function file(i){
        var filename=files[i];
        fs.stat(__dirname+'/'+filename,function (err,stat) {
            stats[i]=stat;
            if(stat.isDirectory()){
                console.log("   "+i+"   \033[36m"+filename+"/\033[39m");
            }else{
                console.log("   "+i+"   \033[90m"+filename+"/\033[39m");
            }
            if(++i==files.length){
               read();
            }
            else{
                file(i);
            }
        });
    }
    file(0);
    function read(){
        console.log("");
        stdout.write("  \033[33m 输入你的选择：\033[39m");
        stdin.resume();
        stdin.setEncoding("utf8");
        stdin.on('data',option);
    }
    function option(data){
        var filename=files[Number(data)];
        if(!filename){
            stdout.write("  \033[31m重新输入你的选择：\033[39m");
        }else{
            stdin.pause();
            if(stats[Number(data)].isDirectory()){
                fs.readdir(__dirname+'/'+filename,function (err,files2) {
                    console.log("");
                    console.log("   ("+files2.length+"个文件)");
                    files2.forEach(function (file) {
                        console.log("   - "+file);

                    });
                });
                console.log("");
            }else{
                fs.readFile(__dirname+'/'+filename,'utf8',function (err,data) {
                    console.log('');
                    console.log("\033[90m"+data+"\033[39m");//data.replace(/(.*)/g,'   $1')
                });
            }

        }
    }
});