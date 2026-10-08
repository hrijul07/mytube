import dns from "node:dns";

console.log("Default DNS servers:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.hvknt4c.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);