var net=require('net');
var count=0;
var users={};
var server=net.createServer(function (conn) {
   console.log("\033[90m new connection \033[39m");
   conn.write(
       '\n> wlecome to \033[92mnode-chat\033[39m!'+
       '\n> '+count+' other people ara connected as this time'+
       '\n> please write your name and press enter:'
   );
   count++;
   conn.setEncoding("utf8");
   var nickName;
   conn.on('data',function (data) {
      console.log(data);
      data=data.replace('\r\n','');
      if(!nickName){//第一次登陆
          if(users[data]){
              conn.write("\033[93m nickName already in use.try again:\033[39m");
          }
          else{
              nickName=data;
              users[nickName]=conn;
          }
          // for(var i in users){
          //     users[i].write('\033[90m>'+nickName+' join the room\033[39m\n');
          // }
          broadcast('\033[90m>'+nickName+' join the room\033[39m\n');
      }
      else{
          // for(var i in users){
          //     if(i!=nickName){
          //         users[i].write("\033[96m>"+nickName+":\033[39m"+data+"\n");
          //     }
          // }
          broadcast("\033[96m>"+nickName+":\033[39m"+data+"\n",true);
      }
   });
    function broadcast(msg,exceptMyslef){
        for(var i in users){
            if(!exceptMyslef||i!=nickName){
                users[i].write(msg);
            }
        }
    }
   conn.on('close',function () {
       count--;
       delete  users[nickName];
       broadcast("\033[90m> "+nickName+" left the room \033[39m\n");
   });
});
server.listen(3000,function () {
    console.log("\033[96m server listen on *.3000 \033[39m")
});