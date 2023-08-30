//? DOMASNA
//? - Преземање на податоци од RickN'Morty API-то и локално кеширање на податоците

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

//inicijalizirame prazen objekt narecen "cache" koj kje cuva keshirani podatoci 
let cache = {}

//"getData" e asinhrona funkcija koja se povikuva na rutata "/api/v1/rickandmorty/character/:id"
//ne` povrzuva so url-to za prezemanje podatoci od API-tо RickN'Morty
exports.getData = async (req, res) => {
  let url = `https://rickandmortyapi.com/api/character/${req.params.id}`;
//prvo proveruva dali ima keshirani podatoci za dadeno ID. Ako keshiranite podatoci postojat i ne se zastareni, localCache se setira da bide null, odnosno da gi izbrishe podatocite zacuvani od prethodno
  if( cache[req.params.id] &&
      cache[req.params.id].cacheTime !== null &&
      cache[req.params.id].cacheTime + 60 * 1000 < new Date().getTime()
  ) {
      cache[req.params.id].localCache = null;
  }

  //ako nemame keshirani podatoci za dadeno ID ili ako keshiranite podatoci se zastareni, odnosno localCache=null, togas se refetchirame so API-to odnosno preku funkcijata prezemame podatoci
  if (!cache[req.params.id] || cache[req.params.id].localCache === null) {
    let data = await fetch(url);
    cache[req.params.id] = { 
      localCache: await data.json(),
      cacheTime: new Date().getTime(),
    };
    //po prezemanjeto, json-podatocite se skladiraat vo objektot localCache zaedno so vremeto cacheTime
  }
    //potoa funkcijata isprakja "localCache" od keshiraniot objekt kako response do klientot
    return res.send(cache);
}

//so ova se prezemaat podatoci od API-to RickNMorty, se pravi lokalno keshiranje na podatocite i se garantira deka keshiranite podatoci se koristat samo ako ne se zastareni