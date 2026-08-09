import {redis,ok,out,newKey} from "./_lib.js";
export default async function(req,res){
 if(!ok(req))return out(res,401,{error:"Unauthorized"});
 try{
  if(req.method==="GET"){const keys=await redis.smembers("gz:keys");const a=[];for(const k of keys){const x=await redis.get("gz:"+k);if(x)a.push(x)}return out(res,200,{licenses:a})}
  if(req.method==="POST"){const b=req.body||{},key=(b.key||newKey()).toUpperCase(),days=Math.max(1,Number(b.days||30)),x={key,status:"active",createdAt:new Date().toISOString(),expiresAt:new Date(Date.now()+days*86400000).toISOString(),deviceLimit:Math.max(1,Number(b.deviceLimit||1)),devices:[]};await redis.set("gz:"+key,x);await redis.sadd("gz:keys",key);return out(res,201,x)}
  if(req.method==="PATCH"){const b=req.body||{},x=await redis.get("gz:"+b.key);if(!x)return out(res,404,{error:"Not found"});if(b.status)x.status=b.status;await redis.set("gz:"+b.key,x);return out(res,200,x)}
  if(req.method==="DELETE"){const k=req.query?.key;if(!k)return out(res,400,{error:"key required"});await redis.del("gz:"+k);await redis.srem("gz:keys",k);return out(res,200,{ok:true})}
  return out(res,405,{error:"Method not allowed"})
 }catch(e){console.error(e);return out(res,500,{error:"Server error"})}
}
