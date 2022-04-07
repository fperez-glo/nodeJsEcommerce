// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts";
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createRouter } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const colors : any[]= [];

export const ColorRoute =() => {
  const router = createRouter();
  router.post("/",  async (req) => {
    const color = (await req.formData()).value("color");

    colors.push(color);
    // console.log("req",req.body)
   
    // req.respond("/color", colors)
    req.redirect("/");
  });



  router.get("/",  async (req) => {
    const color = (await req.formData()).value("color");

    colors.push(color);
    // console.log("req",req.body)
    await req.respond({
        status:201,
        body: ReactDOMServer.renderToString(
            <html>
                <head>
                    <meta charSet="utf-8"/>
                    <title>servest</title>
                </head>
                <body>
                    <form action="/color" method="post" >
                        <p>Ingrese un color:</p>
                        <input type="text" className="form-control" id="tt" name="color"/>
                        <button type="submit">Aceptar</button>
                    </form>
                    {colors.map(color => {
                        return <p key={`${color}-${Math.random()}`} style={{color: color}}>{color}</p>
                    })}
                </body>
            </html>
        )
    })
    // req.redirect("/")
  });
  return router;
}