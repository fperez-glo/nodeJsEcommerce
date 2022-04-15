import fs from "fs";


  export const print = (objeto) => {
    const msg = util.inspect(objeto, false, 12, true);
    //console.log("msgg:", msg);
  };


  export const avatarSearch = (userId) => {
    fs.readFile(`../views/public/resources/${userId}_avatar`, (error, data)=> {
      if (error){
        console.log(error);
        return
      }

      console.log("data:",data)
    })
  };