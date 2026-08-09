import {redis,out} from "./_lib.js";
export default async function(req,res){
 if(req.method!=="POST")return out(res,405,{error:"POST only"});
 try{
  const b=req.body||{},key=String(b.key||"").trim().toUpperCase(),device=String(b.deviceId||"").trim();
  if(!key||!device)return out(res,400,{valid:false,reason:"missing_fields"});
  const x=await redis.get("gz:"+key);
  if(!x)return out(res,200,{valid:false,reason:"not_found"});
  if(x.status!=="active")return out(res,200,{valid:false,reason:x.status});
  if(Date.now()>=new Date(x.expiresAt).getTime()){x.status="expired";await redis.set("gz:"+key,x);return out(res,200,{valid:false,reason:"expired"})}
  x.devices=x.devices||[];
  if(!x.devices.includes(device)){if(x.devices.length>=x.deviceLimit)return out(res,200,{valid:false,reason:"device_limit"});x.devices.push(device);await redis.set("gz:"+key,x)}
  return out(res,200,{valid:true,expiresAt:x.expiresAt,deviceLimit:x.deviceLimit})
 }catch(e){console.error(e);return out(res,500,{valid:false,reason:"server_error"})}
}
