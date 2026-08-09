import { Redis } from "@upstash/redis";
export const redis=Redis.fromEnv();
export function ok(req){const a=req.headers.authorization||"";return a==="Bearer "+process.env.ADMIN_TOKEN}
export function out(res,s,d){res.status(s).setHeader("Content-Type","application/json");res.end(JSON.stringify(d))}
export function newKey(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="GZ";for(let i=0;i<4;i++){s+="-";for(let j=0;j<4;j++)s+=c[Math.floor(Math.random()*c.length)]}return s}
