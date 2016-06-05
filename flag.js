﻿function Flag(name, vote, x, y, w, h) {
    this.name = name;
    this.vote = vote;
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
}

function VoteCoin(flag, coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.vote = flag.vote;
    this.state = flag.name;
    this.width = flag.width;
    this.height = flag.height;
    this.flagx = flag.x;
    this.flagy = flag.y;
}

var FLAG_LIST = [];
function createFlags() {
    var flags = SPRITESHEET_TXT.split('|');
    for (var i = 0; i  < flags.length; i++) {
        var attr = flags[i].split(',');
        FLAG_LIST.push(new Flag(attr[0], attr[5], attr[1], attr[2], attr[3], attr[4]));
    }
}

function createVoteCoin(gameEngine) {
    var i = FLAG_LIST.length;
    if (i > 0) {
        var j = Math.round(Math.random() * 100) % i;
        if (j == i) {
            j = i - 1;
        }
        var flag = FLAG_LIST.splice(j, 1)[0];
        return new VoteCoin(flag, getRandom(gameEngine));
    }
    return null;
}

var SPRITESHEET_TXT = "AK,0,0,384,256,28|AL,394,0,384,256,50|AR,0,266,384,256,58|AZ,0,532,384,256,40|CA,394,266,384,256,172|CO,394,532,384,256,37|CT,788,0,384,256,28|DE,788,266,384,256,16|FL,1182,0,384,256,99|GA,788,532,384,256,76|HI,1182,266,384,256,19|IA,1576,0,384,256,30|ID,1182,532,384,256,32|IL,1576,266,384,256,69|IN,1576,532,384,256,57|KS,0,798,384,256,40|KY,0,1064,384,256,46|LA,394,798,384,256,46|MA,0,1330,384,256,42|MD,394,1064,384,256,38|ME,788,798,384,256,23|MI,394,1330,384,256,59|MN,788,1064,384,256,38|MO,1182,798,384,256,52|MS,788,1330,384,256,40|MT,1182,1064,384,256,27|NC,1576,798,384,256,72|ND,1182,1330,384,256,28|NE,1576,1064,384,256,36|NH,1576,1330,384,256,23|NJ,1970,0,384,256,51|NM,1970,266,384,256,24|NV,2364,0,384,256,30|NY,1970,532,384,256,95|OH,2364,266,384,256,66|OK,2758,0,384,256,43|OR,1970,798,384,256,28|PA,2364,532,384,256,71|RI,2758,266,384,256,19|SC,1970,1064,384,256,50|SD,3152,0,384,256,29|TN,2364,798,384,256,58|TX,2758,532,384,256,155|UT,1970,1330,384,256,40|VA,3152,266,384,256,49|VT,2364,1064,384,256,16|WA,2758,798,384,256,44|WI,3152,532,384,256,42|WV,2364,1330,384,256,34|WY,2758,1064,384,256,29"