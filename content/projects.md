---
layout: page
title: Projects
permalink: /projects/
ShowToc: false
---
## [FreeGamesonSteam](https://github.com/Nickwasused/FreeGamesonSteam)

This is a Script that is checking the Steam Store for Free Games 
after that it will redeem all Games using ArchiSteamFarm. The Script is written in Python3.

## [alt:V Image Downloader](https://github.com/Nickwasused/GTAV-Image-Downloader)

A Script to download all Ped, Vehicle, and Weapon Images from the [alt:V](https://altv.mp) Documentation. The Script is written in Python3.

## [alt:V Freeroam Server](altv://connect/https://altv-cdn.nickwasused.com)

A [alt:V](https://altv.mp) Server. The source code is not public.
{{< rawhtml >}}
<p>There are currently <span id="players_nick" style="display:inline;">0</span> players online.</p>
<script type="text/javascript">
    let player_counter_nick = document.getElementById('players_nick');
    fetch("https://api.altv.mp/server/4ef9967600251c6cb8e1a3289e6ac5ca")
    .then(async function (response_nick) {
        let json_response_nick = await response_nick.json();
        player_counter_nick.textContent = json_response_nick["info"]["players"];
    })
</script>
{{< /rawhtml >}}

## [LuckyV: Status & Stats](https://twitter.com/LuckyvStatus)

A Status Bot for the [alt:V](https://altv.mp) Roleplay Server [LuckyV](https://luckyv.de). The
Code is written in Python3.
{{< rawhtml >}}
<p>There are currently <span id="players_luckyv" style="display:inline;">0</span> players online on <a href="https://luckyv.de">LuckyV</a>.</p>
<script type="text/javascript">
    let player_counter_luckyv = document.getElementById('players_luckyv');
    fetch("https://api.altv.mp/server/bb7228a0d366fc575a5682a99359424f")
    .then(async function (response_luckyv) {
        let json_response_luckyv = await response_luckyv.json();
        player_counter_luckyv.textContent = json_response_luckyv["info"]["players"];
    })
</script>
{{< /rawhtml >}}