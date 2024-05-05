---
title: "OV2 TomTom Adventures"
date: 2024-03-01
background: white
snippet: By chance, I have received an old version of the TomTom Start 52. 
tags: ["TomTom", "Ov2", "Maps"]
---
By chance, I have received an old version of the [TomTom](https://tomtom.com) Start 52. The device has no Internet connection by itself, only through the TomTom software "[TomTom MyDrive Connect](https://www.tomtom.com/en_us/navigation/mydrive-connect/)".

On first connect, the Map of Europe got updated to the newest Version, as TomTom Devices usually get lifelong Map updates, at least for the one included at the time of purchase. I knew that you can save your own **Points of Interest**'s, in short **POI**, as there were some saved already, but there is also the method of importing them, with **OV2** files. (I still don't know what **OV2** stands for.)

## POI (ov2) file format

A `ov2` file is a POI database, they contain multiple POIs. For that, the can have 4 record types:
- deleted records
- skipper records
- simple records
- extended records

We only take a look at skipper and simple records, but I have linked a document, that describes the others as well, below. [1]

A simple record is, as the name says, very simple. It consists of:
- a (little-endian) Byte for the Type. For a simple record, this is always a 2.
- 4 bytes that define the length of the whole record
- 4 bytes signed integer for the longitude
- 4 bytes signed integer for the latitude
- a "zero−terminated ASCII string specifying the name of the POI" [1, p.12]

Or in short: Coordinates and the Name, e.g. A Point in the USA with the Name of "McDonald's"

- The latitude/longitude needs to be divided by **100000**!

## adding some files

So I started adding some POI files from [POIbase](https://www.poibase.com) that contain current construction zones, Hospitals and some more. That is where I got suspicious: The Hospital POI file had a lot of Points! How was a very weak device capable of showing them **all** on a Map?

## Checking Performance

While searching about the file format, I stumbled about [https://gordthompson.github.io/ov2optimizer/](https://gordthompson.github.io/ov2optimizer/), especially the page about "How Indexing Helps". What I now knew was that there should be a reasonable amount of skipper records: I set my requirement to 1 skipper record per 20 simple records, as mentioned on the page multiple times.

One more great thing about the page is that there are tools available `ov2scan` and `ov2optimizer`. So I ran `ov2scan` on the Hospital file:
```shell
PS C:\Users\Nick\Desktop\in> ov2scan.exe .\Hospitals.ov2
deleted POI records (type 0): 0
skipper records (type 1): 80
regular POI records (type 2): 1020
extended POI records (type 3): 0
```

That's more than enough, great!

## Creating a `ov2` file

As a small project, I generate data of all [BP](https://bp.com) gas stations. That is because I usually go to a sub-brand of them, "Aral". While using their official website, I noticed that it was too packed, so I created [https://tankpreise.uk](https://tankpreise.uk).

The project uses `.json` and `sqlite3`, but it would be a great test to generate `ov2` files!

So let's say I want to use a list of all [BP](https://bp.com) gas stations worldwide and show them when I get near them: That is around **18,000** POIs. How will the device handle that?

A good thing is that I don't have to test that, as it has been done already. [2] The device needs to calculate the distance to all 18,000 Points! That can't be good.
And is even worse, if you show them on the Map, then the Device will do that for every "Screen Update" while driving.

### Introduce the skipper record.

As seen [above](#checking-performance): A skipper record can skip a certain part of the file when it is not in range.
Let's say I have 20 records in New Zealand. Then a skipper record defines the borders of all 20 POIs and the size to skip. So when I am in South Africa, the device only needs to check 2 locations: the border of the skipper record. If we are not near it [3] then we skip the defined size of the 20 records.

Here is an example:
```
decoded skipper record: 1 1050 17658722 -3833799 17507574 -4121712
decoded simple record: 2 82 176.58722 -39.94494 [NZ-None] BP 
decoded simple record: 2 81 175.38627 -40.17633 [NZ-None] BP Bulls 
decoded simple record: 2 88 175.65618 -40.95201 [NZ-None] BP 2go 
decoded simple record: 2 110 175.60367 -40.34684 [NZ-None] BP 
decoded simple record: 2 95 175.62228 -40.35152 [NZ-None] BP 2go 
decoded simple record: 2 95 175.59529 -40.36307 [NZ-None] BP 2go 
decoded simple record: 2 86 175.38549 -40.17701 [NZ-None] BP 
decoded simple record: 2 88 175.16715 -38.33799 [NZ-None] BP Te 
decoded simple record: 2 103 175.16699 -38.33807 [NZ-None] BP 2go 
decoded simple record: 2 100 175.07574 -41.12353 [NZ-None] BP 
decoded simple record: 2 101 175.45792 -41.21712 [NZ-None] BP 2go 
decoded skipper record: 1 967 17501094 -3678409 17484129 -4126259
```

**Update 14.03.2024** I am not so sure about the skipper record structure that I defined below. It is based on the official documentation, but when I used that in my scripts it was not working on the Start 52. But the structure defined on [[4]](https://gordthompson.github.io/ov2optimizer/ov2FileFormat.html) is working!

The structure of this skipper record is as follows `decoded skipper record: 1 1050 17658722 -3833799 17507574 -4121712`
- `1`: type = skipper record
- `1050`: If you are not near me then skip **1050** bytes including this record
- `17658722`: Longitude of the west edge
- `-3833799`: Latitude of the south edge
- `17507574`: Longitude of the east edge
- `-4121712`: Latitude of the north edge

The structure of this simple record is as follows `decoded simple record: 2 82 176.58722 -39.94494 [NZ-None] BP`
- `2`: type = simple record
- `82`: total length of this record
- `176.58722`: Longitude
- `-39.94494`: Latitude
- `[NZ-None]` BP: shortened POI name (this can be any string)

Now let's check if the given size is correct! First we add the size of each simple record together:
```
82 + 81 + 88 + 110 + 95 + 95 + 86 + 88 + 103 + 100 + 101 = 1029
```
Then we add the **21** Bytes of the skipper record:
```
1029 + 21 = 1050
```
And in fact, **1050** is the size the skipper record defines to skip!

### Map example

![Map example](./map.avif "")
(Some points appear to be outside, when in fact they are not.)

In the map example are Blue points that represent gas stations. The black boxes around them are the defined borders of the skipper records. I have a maximum of 20 POIs in one box. The device would have to do **10** latitude/longitude comparisons.

Here is another one:
![Map example](./map2.avif)

You can see the black borders again, the line should be straight but is bent, this is just a display issue!

# Using the generated file on the device

To add a `ov2` file to the device, I need to import it [here](https://plan.tomtom.com/de/), Then it will magically transfer through "TomTom MyDrive Connect" onto the device. This happens really fast!


# sources and notes

[1] https://archive.org/details/ttnavsdk3_manual_3.0_193  
[2] https://github.com/gordthompson/ov2optimizer, https://gordthompson.github.io/ov2optimizer/  
[3] I actually do not know how this exactly works!  
[4] https://gordthompson.github.io/ov2optimizer/ov2FileFormat.html  

You can find the generated `ov2` files [here](https://github.com/bp-stations/station-data/tree/gh-pages/ov2).


### tags
#tomtom #ov2