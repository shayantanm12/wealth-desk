// Usage: STATICRYPT_PASSWORD=... node tools/build.mjs /path/to/data.json
// Builds the view-only page from data.json, encrypts it, writes ./index.html.
// data.json = {holdings:[...], reports:{morning,afternoon,weekly}, profile:{target}, updatedAt}
// The plaintext page is written only to a temp folder and never committed.
import fs from "node:fs"; import os from "node:os"; import path from "node:path"; import {execFileSync} from "node:child_process";
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),"..");
const dataPath=process.argv[2]; if(!dataPath||!process.env.STATICRYPT_PASSWORD){console.error("Need data.json path and STATICRYPT_PASSWORD");process.exit(1);}
const data=JSON.parse(fs.readFileSync(dataPath,"utf8"));
const json=JSON.stringify(data).replace(/</g,"\\u003c");
const html=fs.readFileSync(path.join(root,"tools/template.html"),"utf8").replace("/*__DATA__*/{}",json);
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"wd-")); const plain=path.join(tmp,"index.html"); fs.writeFileSync(plain,html);
execFileSync("npx",["--yes","staticrypt@3",plain,"-d",".","-c",".staticrypt.json","--remember","30","--short",
 "--template-title","Wealth Desk","--template-instructions","Enter your Wealth Desk password.","--template-button","Open",
 "--template-color-primary","#0d5c52","--template-color-secondary","#f3f4ef","--template-error","Wrong password. Try again."],{stdio:"inherit",cwd:root});
fs.rmSync(tmp,{recursive:true,force:true}); console.log("Built",path.join(root,"index.html"));
