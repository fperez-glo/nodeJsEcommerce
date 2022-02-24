


  export const print = (objeto) => {
    const msg = util.inspect(objeto, false, 12, true);
    console.log("msgg:", msg);
  };